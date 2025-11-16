export function TopBarVazio() {
    return (
        <header className="bg-red-50 text-[#046C5E] flex justify-between items-center px-6 py-4 shadow" >
            <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Logo PetConnect" className="w-16 h-16" />
                <h1 className="text-xl font-bold text-[#195245]">PetConnect</h1>
            </div>
            <nav className="flex gap-4 text-sm items-center"> 
            </nav>
        </header >
    );
}