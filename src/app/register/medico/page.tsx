"use client";

import React from "react";
import { TopbarRegister } from "@/components/topBarRegister";
import medicoService from "@/services/medicoService";

export default function RegisterMedico() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const nome =
      (form.querySelector("#nome") as HTMLInputElement)?.value?.trim() ?? "";
    const email =
      (form.querySelector("#email") as HTMLInputElement)?.value?.trim() ?? "";
    const crmv =
      (form.querySelector("#crmv") as HTMLInputElement)?.value?.trim() ?? "";
    const senha =
      (form.querySelector("#senha") as HTMLInputElement)?.value ?? "";
    const telefone =
      (form.querySelector("#telefone") as HTMLInputElement)?.value?.trim() ??
      "";
    const endereco =
      (form.querySelector("#endereco") as HTMLInputElement)?.value?.trim() ??
      "";
    const confirmSenha =
      (form.querySelector("#confirmSenha") as HTMLInputElement)?.value ?? "";

    // Validações mínimas
    if (!nome || !email || !crmv || !senha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Monta payload conforme o modelo Java: Usuario + Medico.
    // Observações: o backend espera 'crmv' (não 'crm') e campos obrigatórios de Usuario
    // como telefone, endereco e dtCriacao (será preenchido se não enviado, mas telefone/endereco são NOT NULL).
    const payload = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      dtCriacao: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      crmv: crmv,
      // especialidade: { id: 0 } // opcional por enquanto; backend aceita null em especialidade
    };

    try {
      await medicoService.create(payload as any);
      alert("Médico cadastrado com sucesso.");
      form.reset();
    } catch (error: any) {
      // Log detalhado para identificar a causa (400/500/validation/db/etc)
      if (error.response) {
        console.error(
          "Erro ao cadastrar médico - response:",
          error.response.status,
          error.response.data
        );
        alert(
          `Erro ${error.response.status}: ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        console.error(
          "Erro ao cadastrar médico - request sem resposta:",
          error.request
        );
        alert(
          "Nenhuma resposta do servidor. Verifique se o backend está rodando e a URL está correta."
        );
      } else {
        console.error("Erro ao cadastrar médico:", error.message);
        alert("Erro: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopbarRegister />

      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8">
          Cadastro de Médico Veterinário
        </h2>

        <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="(99) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Endereço
                </label>
                <input
                  id="endereco"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite seu endereço"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CRMV</label>
                <input
                  id="crmv"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite seu CRMV"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  id="senha"
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Crie uma senha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Repita a senha
                </label>
                <input
                  id="confirmSenha"
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Confirme sua senha"
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
