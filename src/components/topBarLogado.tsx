"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TopbarLogado() {
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
    <header className="bg-red-50 text-[#046C5E] flex justify-between items-center px-6 py-4 shadow">
      <div className="flex items-center gap-3">
        <img src="/icon.png" alt="Logo PetConnect" className="w-16 h-16" />
        <h1 className="text-xl font-bold text-[#195245]">PetConnect</h1>
      </div>
      <nav className="flex gap-4 text-sm items-center">
        <a className="hover:underline">{nome ? `Olá, ${nome}` : "Olá, Usuário"}</a>
        <a
          href="/profile"
          className="bg-[#046C5E] text-white px-4 py-2 rounded-full hover:bg-[#03584d]"
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
