import { TopbarRegister } from "@/components/topBarRegister";
import React from "react";

export default function Busca() {
    return (
      <div className="min-h-screen bg-[#C5E5E3] text-teal-900">
      <TopbarRegister />
  
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
          {/* Lista de veterinários */}
          <div className="flex-1 space-y-6">
            {[1, 2].map((vet, index) => (
              <div key={index} className="bg-white rounded-md p-6 flex gap-6 items-start shadow-md">
                <img src={`/vet${index + 1}.jpg`} alt="Vet" className="w-24 h-24 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-teal-800">
                    {index === 0 ? "Dr. Sileu Carvalho" : "Dr. Adalberto Miranda"}
                  </h3>
                  <p className="text-sm text-teal-700">Cardiologia</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span>{index === 0 ? "32 Avaliações" : "5 Avaliações"}</span>
                  </div>
                  <p className="text-sm mt-2"><strong>CRMV:</strong> {index === 0 ? "ES 341234" : "ES 53242"}</p>
                  <p className="text-sm"><strong>Endereço:</strong> {index === 0 ? "Rua Capitão José Maria 34" : "Rua Roberval Alves 4"}, Colatina</p>
                  <p className="text-sm"><strong>Valor da consulta:</strong> R$ {index === 0 ? "220,00" : "90,00"}</p>
                </div>
                {/* Tabela de horários */}
                <div className="min-w-[200px] text-sm text-center">
                  <div className="font-semibold mb-2 grid grid-cols-4 gap-2">
                    <span>Hoje</span><span>Amanhã</span><span>10/03</span><span>11/03</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {["10:00", "12:00", "13:00", "15:00", "18:00"].map((hour, i) => (
                      <React.Fragment key={i}>
                        <span>{hour}</span>
                        <span>{hour}</span>
                        <span>{hour}</span>
                        <span>{hour}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Mapa */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-gray-300 w-full h-[500px] rounded-md">
              {/* Substituir com um mapa real como React Leaflet, Google Maps, etc. */}
              <p className="text-center pt-48 text-gray-600">Mapa interativo aqui</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  