"use client";

import { FooterHome } from "@/components/footerHome";
import { TopBarHome } from "@/components/topBarHome";

export default function Home() {
  return (
    <div className="bg-[#2CB8A4] text-white font-sans min-h-screen flex flex-col">
      <TopBarHome />

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
            <input
              type="text"
              placeholder="especialidade, doença ou nome"
              className="p-3 rounded w-full text-[#195245] bg-white"
            />
            <input
              type="text"
              placeholder="cidade ou região"
              className="p-3 rounded w-full text-[#195245] bg-white"
            />
            <button
              className="bg-[#046C5E] px-6 py-3 rounded text-white hover:bg-[#03584d]"
              onClick={() => window.location.href = "/busca"}
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
