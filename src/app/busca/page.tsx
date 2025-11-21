'use client';

import TopbarLogadoBusca from "@/components/topBarLogadoBusca";
import { TopbarRegister } from "@/components/topBarRegister";
import React, { useEffect, useRef, useState } from "react";
import medicoService from '@/services/medicoService';

export default function Busca() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [markers, setMarkers] = useState<Array<any>>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([ -20.1697, -40.6004 ]); // default Colatina-ish
  const [loadingMarkers, setLoadingMarkers] = useState(false);
  const mapRef = useRef<any>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const markersLayerRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  
    useEffect(() => {
      try {
        const raw = localStorage.getItem("user");
        if (raw) {
          const user = JSON.parse(raw);
          if (user) {
            setIsLogged(true);
            return;
          }
        }
      } catch (e) {
        console.error("Erro ao verificar usuário no localStorage", e);
      }
      setIsLogged(false);
    }, []);

    // Carrega Leaflet dinamicamente no cliente e ajusta ícones
    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const L = await import('leaflet');
          if (!mounted) return;
          leafletRef.current = L;
          // ajustar ícone padrão
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        } catch (e) {
          console.error('Erro carregando leaflet dinamicamente', e);
        }
      })();
      return () => { mounted = false; };
    }, []);

    // Função simples de geocoding usando Nominatim (OpenStreetMap)
    async function geocodeAddress(address: string) {
      if (!address) return null;
      try {
        const cache = JSON.parse(localStorage.getItem('geoCache') || '{}');
        if (cache[address]) return cache[address];

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          cache[address] = { lat, lon };
          localStorage.setItem('geoCache', JSON.stringify(cache));
          return { lat, lon };
        }
      } catch (e) {
        console.error('Erro geocodificando endereço', e);
      }
      return null;
    }

    // Busca médicos do backend, geocodifica endereços e cria marcadores
    useEffect(() => {
      let mounted = true;
      async function loadMedicos() {
        setLoadingMarkers(true);
        try {
          const resp = await medicoService.getAll();
          const medicos = (resp.data || []) as any[];
          const results: Array<any> = [];

          for (const m of medicos) {
            const endereco = (m && ((m.endereco) || (m.address))) || '';
            const nome = (m && (m.nome || m.name)) || 'Médico';
            const especialidade = (m && (m.especialidade?.nome || m.especialidade || m.especialidadeId)) || '';
            const geoc = await geocodeAddress(endereco ? `${endereco}` : 'Colatina, ES');
            if (geoc) {
              results.push({
                id: m.id,
                nome,
                especialidade,
                endereco,
                position: [geoc.lat, geoc.lon] as [number, number],
              });
            }
          }

          if (mounted) {
            setMarkers(results);
            if (results.length > 0) {
              setMapCenter(results[0].position);
            }
          }
        } catch (e) {
          console.error('Erro ao carregar médicos', e);
        } finally {
          setLoadingMarkers(false);
        }
      }
      loadMedicos();
      return () => { mounted = false; };
    }, []);

    // Inicializa o mapa Leaflet diretamente (apenas depois do carregamento dinamico do leaflet)
    useEffect(() => {
      if (!mapDivRef.current) return;
      if (!leafletRef.current) return; // ainda não carregado
      if (mapRef.current) return; // já inicializado

      const L = leafletRef.current;
      mapRef.current = L.map(mapDivRef.current).setView(mapCenter, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
          markersLayerRef.current = null;
        }
      };
    }, [leafletRef.current, mapDivRef.current]);

    // Atualiza marcadores quando mudam
    useEffect(() => {
      if (!mapRef.current || !markersLayerRef.current || !leafletRef.current) return;
      const L = leafletRef.current;
      markersLayerRef.current.clearLayers();
      for (const m of markers) {
        const mk = L.marker(m.position as any);
        mk.bindPopup(`<strong>${m.nome}</strong><div>${m.especialidade}</div><div style="font-size:12px;margin-top:6px;">${m.endereco}</div>`);
        mk.addTo(markersLayerRef.current);
      }
      if (markers.length > 0) {
        const first = markers[0].position as [number, number];
        mapRef.current.setView(first, 13);
      }
    }, [markers, leafletRef.current]);

    // Centraliza mapa quando mapCenter mudar
    useEffect(() => {
      if (mapRef.current && mapCenter) {
        mapRef.current.setView(mapCenter, mapRef.current.getZoom() || 13);
      }
    }, [mapCenter]);
    return (
      <div className="min-h-screen bg-[#C5E5E3] text-teal-900">
      {isLogged === null ? null : isLogged ? <TopbarLogadoBusca /> : <TopbarRegister />}

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 justify-center px-4 py-8 bg-[#E1F0EF]">
          <select className="p-3 rounded-md bg-white border min-w-[200px]">
            <option>Cardiologia</option>
          </select>
          <select className="p-3 rounded-md bg-white border min-w-[200px]">
            <option>Colatina, ES</option>
          </select>
          <button className="p-3 rounded-md bg-white border">
            🔍
          </button>
        </div>

        {/* Resultados e mapa */}
        <div className="flex flex-col lg:flex-row gap-6 px-6 pb-10">
          {/* Lista de médicos */}
          <div className="flex-1 space-y-6">
            {markers.length === 0 && !loadingMarkers ? (
              <div className="p-6 bg-white rounded-md shadow">Nenhum médico com localização encontrada.</div>
            ) : (
              markers.map((m, idx) => (
                <div key={m.id || idx} className="bg-white rounded-md p-6 flex gap-6 items-start shadow-md">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-teal-800">{m.nome}</h3>
                    <p className="text-sm text-teal-700">{m.especialidade}</p>
                    <p className="text-sm mt-2"><strong>Endereço:</strong> {m.endereco}</p>
                  </div>
                  <div className="min-w-[200px] text-sm text-center">
                    <button className="p-2 bg-teal-600 text-white rounded" onClick={() => setMapCenter(m.position)}>
                      Ver no mapa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mapa */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white w-full h-[500px] rounded-md overflow-hidden">
              <div ref={mapDivRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  