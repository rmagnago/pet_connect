export function TopBarHome() {
    return (
        <header className="bg-red-50 text-[#046C5E] flex justify-between items-center px-6 py-4 shadow" >
            <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Logo PetConnect" className="w-16 h-16" />
                <h1 className="text-xl font-bold text-[#195245]">PetConnect</h1>
            </div>
            <nav className="flex gap-4 text-sm items-center">
                <a href="/register/tutor" className="hover:underline">Criar perfil</a>
                <a href="/login" className="hover:underline">Entrar</a>
                <a href="/register/medico" className="bg-[#046C5E] text-white px-4 py-2 rounded-full hover:bg-[#03584d]">Trabalhe conosco</a>
            </nav>
        </header >
    );
}