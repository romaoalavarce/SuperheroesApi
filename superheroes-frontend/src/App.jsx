
import { useEffect, useState } from "react";
import { getHeroes, createHero } from "./services/api";

function App() {
    const [heroes, setHeroes] = useState([]);
    const [name, setName] = useState("");
    const [universe, setUniverse] = useState("");
    const [power, setPower] = useState("");
    const [message, setMessage] = useState("");

    async function loadHeroes() {
        try {
            const data = await getHeroes();
            setHeroes(data);
        } catch (error) {
            console.error(error);
            setMessage("Erro ao carregar heróis.");
        }
    }

    useEffect(() => {
        loadHeroes();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        try {
            await createHero({ name, universe, power });

            setName("");
            setUniverse("");
            setPower("");
            setMessage("Herói cadastrado!");

            await loadHeroes();
        } catch (error) {
            console.error(error);
            setMessage("Erro ao cadastrar herói.");
        }
    }

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    Superheroes<span className="text-red-600">.</span>
                </h1>

                <p className="text-gray-500 mb-8">
                    Cadastro de personagens
                </p>

                <section className="bg-[#181818] p-5 rounded-lg mb-10">
                    <h2 className="text-xl font-semibold mb-5">
                        Novo herói
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-[#252525] p-3 rounded outline-none focus:ring-1 focus:ring-red-600"
                        />

                        <input
                            type="text"
                            placeholder="Universo"
                            value={universe}
                            onChange={(e) => setUniverse(e.target.value)}
                            required
                            className="w-full bg-[#252525] p-3 rounded outline-none focus:ring-1 focus:ring-red-600"
                        />

                        <input
                            type="text"
                            placeholder="Poder"
                            value={power}
                            onChange={(e) => setPower(e.target.value)}
                            required
                            className="w-full bg-[#252525] p-3 rounded outline-none focus:ring-1 focus:ring-red-600"
                        />

                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded font-semibold transition"
                        >
                            Cadastrar
                        </button>

                    </form>

                    {message && (
                        <p className="text-sm text-gray-300 mt-3">
                            {message}
                        </p>
                    )}
                </section>

                <section>
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold">
                            Heróis cadastrados
                        </h2>

                        <span className="text-gray-500 text-sm">
                            {heroes.length} heróis
                        </span>
                    </div>

                    {heroes.length === 0 ? (
                        <p className="text-gray-500">
                            Nenhum herói cadastrado.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {heroes.map((hero) => (
                                <article
                                    key={hero.id}
                                    className="bg-[#181818] p-5 rounded-lg border border-[#303030]"
                                >
                                    <p className="text-red-500 text-sm mb-2">
                                        {hero.universe}
                                    </p>

                                    <h3 className="text-xl font-bold mb-3">
                                        {hero.name}
                                    </h3>

                                    <p className="text-gray-400 text-sm">
                                        Poder: {hero.power}
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

export default App;
