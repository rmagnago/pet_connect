'use client';

import TopbarLogadoBusca from "@/components/topBarLogadoBusca";
import { TopbarRegister } from "@/components/topBarRegister";
import React, { useEffect, useRef, useState } from "react";
import medicoService from '@/services/medicoService';
import especialidadeService from '@/services/especialidadeService';
import agendamentoService from '@/services/agendamentoService';

export default function Busca() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<'MEDICO' | 'TUTOR' | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  // médicos carregados (sem marcadores)
  const [medicosList, setMedicosList] = useState<Array<any>>([]);
  // marcadores adicionados sob demanda
  const [markers, setMarkers] = useState<Array<any>>([]);
  // card selecionado (para destacar visualmente)
  const [selectedMedicoId, setSelectedMedicoId] = useState<number | string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-19.5320, -40.6240]); // Colatina, ES
  const [loadingMarkers, setLoadingMarkers] = useState(false);
  const [especialidades, setEspecialidades] = useState<Array<any>>([]);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState<string>('');
  const [filtroCidade, setFiltroCidade] = useState<string>('');
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
            setUserRole(user.role ?? null);
            setUserId(user.id ?? null);
            return;
          }
        }
      } catch (e) {
        console.error("Erro ao verificar usuário no localStorage", e);
      }
      setIsLogged(false);
    }, []);

    // Carrega parâmetros de URL
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const especialidade = params.get('especialidade');
        const cidade = params.get('cidade');
        
        if (especialidade) setFiltroEspecialidade(especialidade);
        if (cidade) setFiltroCidade(cidade);
      }
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

    // Carrega especialidades
    useEffect(() => {
      let mounted = true;
      async function loadEspecialidades() {
        try {
          const resp = await especialidadeService.getAll();
          if (mounted) {
            setEspecialidades(resp.data || []);
          }
        } catch (e) {
          console.error('Erro ao carregar especialidades', e);
        }
      }
      loadEspecialidades();
      return () => { mounted = false; };
    }, []);

    // Geocoding usando Nominatim (OpenStreetMap) com cache
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

    // Busca médicos do backend com filtros
    async function buscarMedicos() {
      let mounted = true;
      setLoadingMarkers(true);
      try {
        let resp;
        const especId = filtroEspecialidade ? parseInt(filtroEspecialidade) : undefined;
        const cidade = filtroCidade?.trim() || undefined;
        
        console.log('Filtros aplicados:', { especialidadeId: especId, cidade });
        
        if (especId || cidade) {
          // Usa filtros
          resp = await medicoService.buscarComFiltros(especId, cidade);
        } else {
          // Carrega todos
          resp = await medicoService.getAll();
        }
        
        console.log('Resposta do backend:', resp);
        
        if (mounted) {
          const medicos = resp?.data;
          setMedicosList(Array.isArray(medicos) ? medicos : []);
        }
      } catch (e) {
        console.error('Erro ao buscar médicos', e);
        if (mounted) {
          setMedicosList([]);
        }
      } finally {
        setLoadingMarkers(false);
      }
    }

    // Carrega médicos inicialmente
    useEffect(() => {
      buscarMedicos();
    }, []);

    // Inicializa o mapa Leaflet diretamente (apenas depois do carregamento dinamico do leaflet)
    useEffect(() => {
      if (!mapDivRef.current) return;
      if (!leafletRef.current) return; // ainda não carregado
      if (mapRef.current) return; // já inicializado

      const L = leafletRef.current;
      // garante CSS do Leaflet
      if (typeof window !== 'undefined') {
        const id = 'leaflet-css';
        if (!document.getElementById(id)) {
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
      }
      mapRef.current = L.map(mapDivRef.current).setView(mapCenter, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      // corrige layout ao montar o mapa
      setTimeout(() => { try { mapRef.current?.invalidateSize(); } catch {} }, 0);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
          markersLayerRef.current = null;
        }
      };
    }, [leafletRef.current, mapDivRef.current]);

    // Atualiza marcadores quando mudam e ajusta bounds para caber todos
    useEffect(() => {
      if (!mapRef.current || !markersLayerRef.current || !leafletRef.current) return;
      const L = leafletRef.current;
      markersLayerRef.current.clearLayers();
      // Exibe apenas um pin (o último selecionado)
      if (markers.length > 0) {
        const m = markers[markers.length - 1];
        const mk = L.marker(m.position as any);
        mk.bindPopup(`<strong>${m.nome}</strong><div>${m.especialidade ?? ''}</div><div style=\"font-size:12px;margin-top:6px;\">${m.endereco ?? ''}</div>`);
        mk.addTo(markersLayerRef.current);
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
          <select 
            className="p-3 rounded-md bg-white border min-w-[200px]"
            value={filtroEspecialidade}
            onChange={(e) => setFiltroEspecialidade(e.target.value)}
          >
            <option value="">Todas as especialidades</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nome}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Cidade ou região"
            className="p-3 rounded-md bg-white border min-w-[200px]"
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          />
          <button 
            className="p-3 rounded-md bg-white border hover:bg-gray-100"
            onClick={buscarMedicos}
          >
            🔍
          </button>
        </div>

        {/* Resultados e mapa */}
        <div className="flex flex-col lg:flex-row gap-6 px-6 pb-10">
          {/* Lista de médicos (scroll independente) */}
          <div className="flex-1">
            <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            {medicosList.length === 0 && !loadingMarkers ? (
              <div className="p-6 bg-white rounded-md shadow">Nenhum médico encontrado.</div>
            ) : (
              medicosList.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={`bg-white rounded-md p-6 flex gap-6 items-start shadow-md border transition-colors ${
                    (m.id ?? idx) === selectedMedicoId
                      ? 'border-teal-600 ring-2 ring-teal-300 bg-teal-50'
                      : 'border-transparent hover:border-teal-200'
                  }`}
                  aria-selected={(m.id ?? idx) === selectedMedicoId}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-teal-800">{m.nome || 'Médico'}</h3>
                    <p className="text-sm text-teal-700">{m.especialidade?.nome || 'Especialidade não informada'}</p>
                    <p className="text-sm text-teal-700 font-bold">Nota: {m.nota ?? ''}</p>
                    <p className="text-sm mt-2"><strong>Endereço:</strong> {m.endereco || ''}</p>
                    {m.cidade && <p className="text-sm"><strong>Cidade:</strong> {m.cidade}</p>}
                  </div>
                  <div className="min-w-[220px] text-sm text-center flex flex-col gap-2">
                    <button
                      className="p-2 bg-teal-600 text-white rounded"
                      onClick={async () => {
                        // ao clicar, cria marcador (usando coords do backend ou geocoding)
                        let lat = (m.latitude ?? m.lat ?? null);
                        let lon = (m.longitude ?? m.lon ?? null);
                        if (!(typeof lat === 'number' && typeof lon === 'number')) {
                          const geo = await geocodeAddress(m.endereco ? `${m.endereco}` : 'Colatina, ES');
                          if (geo) { lat = geo.lat; lon = geo.lon; }
                        }
                        if (typeof lat === 'number' && typeof lon === 'number') {
                          const newMarker = {
                            id: m.id,
                            nome: m.nome || 'Médico',
                            especialidade: m.especialidade?.nome || m.especialidade || '',
                            endereco: m.endereco || '',
                            position: [lat, lon] as [number, number],
                          };
                          // substitui o pin anterior por um novo
                          setMarkers([newMarker]);
                          setMapCenter([lat, lon]);
                          setSelectedMedicoId(m.id ?? idx);
                        }
                      }}
                    >
                      Ver no mapa
                    </button>
                    {isLogged && userRole === 'TUTOR' && (
                      <button
                        className="p-2 bg-teal-700 text-white rounded"
                        onClick={async () => {
                          if (!userId) return;
                          try {
                            await agendamentoService.solicitar({
                              status: false,
                              medico: { id: m.id },
                              tutor: { id: userId },
                              pet: null,
                            });
                            alert('Solicitação de consulta enviada para o médico.');
                          } catch (e: any) {
                            console.error('Erro ao solicitar consulta', e);
                            alert('Falha ao solicitar consulta.');
                          }
                        }}
                      >
                        Marcar consulta
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
            </div>
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
  