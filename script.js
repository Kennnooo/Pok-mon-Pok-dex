const popularPokemon = ["pikachu", "charizard", "bulbasaur", "gengar", "lucario"];

// Fetch Random Pokémon
async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();

    document.getElementById("random-pokemon-container").innerHTML = `
        <div class="pokemon-card">
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name.toUpperCase()}</h3>
            <p>Type: ${data.types.map(type => type.type.name).join(", ")}</p>
            <p>Abilities: ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
        </div>
    `;
}

// Fetch Popular Pokémon
async function fetchPopularPokemon() {
    const container = document.getElementById("popular-pokemon-container");
    container.innerHTML = "";

    for (let name of popularPokemon) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${name}">
            <h3>${name.toUpperCase()}</h3>
            <p>Type: ${data.types.map(type => type.type.name).join(", ")}</p>
        `;
        container.appendChild(card);
    }
}

// Search Pokémon
async function searchPokemon() {
    const query = document.getElementById("search-input").value.toLowerCase();
    if (!query) return;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    
    if (!response.ok) {
        document.getElementById("search-result").innerHTML = "<p>Pokémon not found!</p>";
        return;
    }

    const data = await response.json();
    document.getElementById("search-result").innerHTML = `
        <div class="pokemon-card">
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h3>${data.name.toUpperCase()}</h3>
            <p>Type: ${data.types.map(type => type.type.name).join(", ")}</p>
            <p>Abilities: ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
            <p>Stats: ${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ")}</p>
        </div>
    `;
}

// Fetch data on page load
fetchRandomPokemon();
fetchPopularPokemon();
