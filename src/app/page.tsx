"use client";

import React, { useEffect, useState } from "react";
import { FooterHome } from "@/components/footerHome";
import { TopBarHome } from "@/components/topBarHome";
import TopbarLogado from "@/components/topBarLogado";
import especialidadeService from "@/services/especialidadeService";

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [especialidades, setEspecialidades] = useState<Array<any>>([]);

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

  useEffect(() => {
    async function loadEspecialidades() {
      try {
        const resp = await especialidadeService.getAll();
        setEspecialidades(resp.data || []);
      } catch (e) {
        console.error('Erro ao carregar especialidades', e);
      }
    }
    loadEspecialidades();
  }, []);

  return (
    <div className="bg-[#2CB8A4] text-white font-sans min-h-screen flex flex-col">
      {isLogged === null ? null : isLogged ? <TopbarLogado /> : <TopBarHome />}

      {/* Main area */}
      <section className="text-center py-16 px-6 flex-grow">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Agende a consulta do seu melhor amigo
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Temos profissionais para atender qualquer um dos seus pets
        </p>

        {/* Search bar */}
        <div className="bg-[#1F8F81] p-6 rounded-xl max-w-4xl mx-auto shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="p-3 rounded w-full text-[#195245] bg-white"
              id="especialidade-input"
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
              placeholder="cidade ou região"
              className="p-3 rounded w-full text-[#195245] bg-white"
              id="cidade-input"
            />
            <button
              className="bg-[#046C5E] px-6 py-3 rounded text-white hover:bg-[#03584d]"
              onClick={() => {
                const especialidade = (document.getElementById('especialidade-input') as HTMLSelectElement)?.value || '';
                const cidade = (document.getElementById('cidade-input') as HTMLInputElement)?.value || '';
                const params = new URLSearchParams();
                if (especialidade) params.append('especialidade', especialidade);
                if (cidade) params.append('cidade', cidade);
                window.location.href = `/busca${params.toString() ? '?' + params.toString() : ''}`;
              }}
            >
              Pesquisar
            </button>
          </div>
        </div>
        
      </section>

      <FooterHome />
    </div>
  );
}
