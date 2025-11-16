"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TopbarRegister } from "@/components/topBarRegister";
import tutorService from "@/services/tutorService";

export default function RegisterTutor() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const nome =
      (form.querySelector("#nome") as HTMLInputElement)?.value?.trim() ?? "";
    const email =
      (form.querySelector("#email") as HTMLInputElement)?.value?.trim() ?? "";
    const cpf =
      (form.querySelector("#cpf") as HTMLInputElement)?.value?.trim() ?? "";
    const senha =
      (form.querySelector("#senha") as HTMLInputElement)?.value ?? "";
    const confirmSenha =
      (form.querySelector("#confirmSenha") as HTMLInputElement)?.value ?? "";
    const telefone =
      (form.querySelector("#telefone") as HTMLInputElement)?.value?.trim() ??
      "";
    const endereco =
      (form.querySelector("#endereco") as HTMLInputElement)?.value?.trim() ??
      "";

    // Validações mínimas
    if (!nome || !email || !cpf || !senha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const payload = {
      nome,
      email,
      senha,
      telefone,
      endereco,
      dtCriacao: new Date().toISOString().slice(0, 10),
      cpf,
    };

    try {
      await tutorService.create(payload as any);
      alert("Tutor cadastrado com sucesso.");
      form.reset();
      router.push("/login");
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Erro ao cadastrar tutor - response:",
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
          "Erro ao cadastrar tutor - request sem resposta:",
          error.request
        );
        alert(
          "Nenhuma resposta do servidor. Verifique se o backend está rodando e a URL está correta."
        );
      } else {
        console.error("Erro ao cadastrar tutor:", error.message);
        alert("Erro: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopbarRegister />

      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8">Cadastro de Tutor</h2>

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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Digite seu endereço"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Digite seu CPF"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  id="senha"
                  type="password"
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
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
