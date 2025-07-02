export function TopbarRegister() {
    return (
        <div>
            <header className="bg-teal-700 text-white flex justify-between items-center px-8 py-6">
                <h1 className="text-3xl font-bold">
                    <a href="/">PetConnect</a>
                </h1>
                <div>
                    <span className="text-sm mr-2">Já tem uma conta?</span>
                    <a href="/login" className="font-semibold underline hover:text-gray-100">Entrar</a>
                </div>
            </header>
        </div>
    );
}