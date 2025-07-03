import { TopbarRegister } from "@/components/topBarRegister";
import Link from "next/link";

export default function RegisterAccount() {
  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopbarRegister />

      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8">Crie uma conta gratuitamente</h2>

        {/* Main card */}
        <div className="bg-white rounded-lg shadow-md p-10 flex flex-col sm:flex-row gap-8">

          {/* Card Tutor */}
          <Link href="/register/tutor" className="block">
            <div className="bg-[#E6F6F5] p-6 rounded-md w-64 text-center hover:bg-[#D1F0EE] transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Tutor</h3>
              <p className="text-sm">
                Cadastre seu animal de estimação e agende uma consulta.
              </p>
            </div>
          </Link>

          {/* Card Médico Veterinário */}
          <Link href="/register/medico" className="block">
            <div className="bg-[#E6F6F5] p-6 rounded-md w-64 text-center hover:bg-[#D1F0EE] transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">Médico Veterinario</h3>
              <p className="text-sm">
                Faça com que os tutores o conheçam, confiem em si e marquem a consulta consigo.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
