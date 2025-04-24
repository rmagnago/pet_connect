"use client";

export default function Home() {
  return (
    <main className="bg-[#2CB8A4] text-white font-sans min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-red-50 text-[#046C5E] flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Logo PetConnect" className="w-16 h-16" />
          <h1 className="text-xl font-bold text-[#195245]">PetConnect</h1>
        </div>
        <nav className="flex gap-4 text-sm items-center">
          <a href="/register" className="hover:underline">
            Criar perfil
          </a>
          <a href="/login" className="hover:underline">
            Entrar
          </a>
          <a
            href="#"
            className="bg-[#046C5E] text-white px-4 py-2 rounded-full hover:bg-[#03584d]"
          >
            Trabalhe conosco
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 flex-grow">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Agende a consulta do seu melhor amigo
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Temos profissionais para atender qualquer um dos seus pets
        </p>

        <div className="bg-[#1F8F81] p-6 rounded-xl max-w-4xl mx-auto shadow-lg">
          
          {/* Barra de busca */}
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

      {/* Footer */}
      <footer className="bg-[#D9F3EE] text-[#046C5E] py-4 text-sm text-center px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          <span>Pequenos Animais</span>
          <span>Grandes Animais</span>
          <span>Animais Silvestres</span>
          <span>Dermatologia</span>
          <span>Cardiologia</span>
          <span>Oftalmologia</span>
          <span>Neurologia</span>
          <span>Medicina Preventiva</span>
          <span>Patologia</span>
          <span className="underline">Mais</span>
        </div>
      </footer>
    </main>
  );
}
