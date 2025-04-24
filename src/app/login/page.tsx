export default function Login() {
    return (
      <div className="min-h-screen bg-[#C5E5E3] flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-teal-700 text-white flex justify-between items-center px-8 py-6">
          <h1 className="text-3xl font-bold">PetConnect</h1>
          <div>
            <span className="text-sm mr-2">Ainda não tem uma conta?</span>
            <a href="/register" className="font-semibold underline hover:text-gray-100">Criar conta</a>
          </div>
        </header>
  
        {/* Formulário de login */}
        <main className="flex flex-1 justify-center items-center px-4 py-12">
          <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-teal-800 mb-6 text-center">Entrar na sua conta</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-teal-800 mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="seuemail@email.com"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-teal-800 mb-1">Senha</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              Esqueceu sua senha? <a href="#" className="underline font-medium">Recuperar</a>
            </p>
          </div>
        </main>
      </div>
    );
  }
  