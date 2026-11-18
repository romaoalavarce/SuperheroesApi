
const API_URL = "http://localhost:3000/heroes";

export async function getHeroes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar heróis");
    }

    return response.json();
}

export async function createHero(hero) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hero)
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar herói");
    }

    return response.json();
}
