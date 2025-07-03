import { TopbarRegister } from "@/components/topBarRegister";

export default function RegisterTutor() {
  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopbarRegister />

      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8">Cadastro de Tutor</h2>

        <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-4xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Digite seu e-mail"
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
