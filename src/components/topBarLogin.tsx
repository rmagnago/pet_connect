export default function TopbarLogin() {
    return (
        <div>
            <header className="bg-teal-700 text-white flex justify-between items-center px-8 py-6">
                <h1 className="text-3xl font-bold">
                    <a href="/">PetConnect</a>
                </h1>
                <div>
                    <span className="text-sm mr-2">Ainda não tem uma conta?</span>
                    <a href="/register/tutor" className="font-semibold underline hover:text-gray-100">Criar conta</a>
                </div>
            </header>
        </div>
    );
}