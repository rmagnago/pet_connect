import { TopbarRegister } from "@/components/topBarRegister";

export default function RegisterAccount() {
    return (
      <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
       <TopbarRegister />
  
        {/* Conteúdo */}
        <main className="flex flex-col items-center justify-center mt-16 px-4">
          <h2 className="text-lg font-medium mb-8">Crie uma conta gratuita</h2>
          <div className="bg-white rounded-lg shadow-md p-10 flex flex-col sm:flex-row gap-8">
            {/* Card Tutor */}
            <div className="bg-[#E6F6F5] p-6 rounded-md w-64 text-center">
              <h3 className="text-xl font-semibold mb-4">Tutor</h3>
              <p className="text-sm">
                Compartilhar informações básicas com o médico antes da consulta.
              </p>
            </div>
  
            {/* Card Médico Veterinário */}
            <div className="bg-[#E6F6F5] p-6 rounded-md w-64 text-center">
              <h3 className="text-xl font-semibold mb-4">Médico Veterinario</h3>
              <p className="text-sm">
                Faça com que os tutores o conheçam, confiem em si e marquem a consulta consigo.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  