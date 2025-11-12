"use client";

import { TopbarRegister } from "@/components/topBarRegister";
import { useState } from "react";

export default function RegisterPet() {
  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    peso: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopbarRegister />

      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8">Cadastre seu Pet</h2>

        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium mb-2"
                >
                  Nome do Pet
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite o nome do seu pet"
                />
              </div>

              <div>
                <label
                  htmlFor="especie"
                  className="block text-sm font-medium mb-2"
                >
                  Espécie
                </label>
                <input
                  type="text"
                  id="especie"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ex: Cachorro, Gato, etc."
                />
              </div>

              <div>
                <label
                  htmlFor="raca"
                  className="block text-sm font-medium mb-2"
                >
                  Raça
                </label>
                <input
                  type="text"
                  id="raca"
                  name="raca"
                  value={formData.raca}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite a raça do seu pet"
                />
              </div>

              <div>
                <label
                  htmlFor="idade"
                  className="block text-sm font-medium mb-2"
                >
                  Idade (anos)
                </label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite a idade do seu pet"
                />
              </div>

              <div>
                <label
                  htmlFor="peso"
                  className="block text-sm font-medium mb-2"
                >
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite o peso do seu pet"
                />
              </div>
            </div>

            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                className=" bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors md:col-span-2 w-2/5 mt-4"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}