"use client";

import React from "react";
import TopbarLogin from "@/components/topBarLogin";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement)?.value?.trim() ?? '';
    const senha = (form.querySelector('#senha') as HTMLInputElement)?.value ?? '';

    if (!email || !senha) {
      alert('Preencha e-mail e senha.');
      return;
    }

    try {
      const resp = await authService.login({ email, senha });
      // salva dados básicos no localStorage (token não implementado)
      if (resp && resp.data) {
        localStorage.setItem('user', JSON.stringify(resp.data));
        alert('Login realizado com sucesso.');
        router.push('/busca');
      } else {
        alert('Resposta inesperada do servidor.');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Login error', error.response.status, error.response.data);
        alert(`Erro ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('Login error', error);
        alert('Erro de rede. Verifique o servidor.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#C5E5E3] flex flex-col">
      <TopbarLogin />

      <div className="flex flex-1 justify-center items-center px-4 py-12">
        <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-teal-800 mb-6 text-center">Entrar na sua conta</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-teal-800 mb-1">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@email.com"
                className="w-full p-3 border rounded-md focus:ring-2 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-teal-800 mb-1">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="********"
                className="w-full p-3 border rounded-md focus:ring-2 placeholder:text-gray-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white font-semibold py-3 rounded-md hover:bg-teal-800 transition"
            >
              Entrar
            </button>
          </form>
          <p className="text-center text-sm text-teal-700 mt-4">
            <a href="/forgotPassword" className="underline font-medium">Esqueci minha senha</a>
          </p>
        </div>
      </div>
    </div>
  );
}
  