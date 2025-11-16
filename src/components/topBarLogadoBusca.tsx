"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TopbarLogadoBusca() {
  const [nome, setNome] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw);
        if (user && typeof user.nome === "string") {
          setNome(user.nome);
          return;
        }
      }
    } catch (e) {
      console.error("Erro ao ler usuário do localStorage", e);
    }
    setNome(null);
  }, []);

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Erro ao limpar localStorage durante logout", err);
    }
    router.push("/");
    window.location.reload();
  };

  return (
    <header className="bg-teal-700 text-white flex justify-between items-center px-8 py-6">
      <h1 className="text-3xl font-bold">
        <a href="/">PetConnect</a>
      </h1>
      <nav className="flex gap-4 text-sm items-center">
        <a className="hover:underline">
          {nome ? `Olá, ${nome}` : "Olá, Usuário"}
        </a>
        <a
          href="/profile"
          className="bg-white text-[#046C5E] px-4 py-2 rounded-full hover:bg-[#cfcfcf]"
        >
          Editar perfil
        </a>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-[#c00707] text-white px-4 py-2 rounded-full hover:bg-[#830404]"
        >
          Sair
        </button>
      </nav>
    </header>
  );
}
