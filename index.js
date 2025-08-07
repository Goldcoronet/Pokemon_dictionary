let currentid = 1;

const nameInput = document.getElementById("name");
const infoText= document.getElementById("desc-box");
const pokeimg = document.getElementById("poke-sprite");

async function pokesearch(inputval = null) {
    try {
        const name = inputval !== null ? inputval.toString().toLowerCase() : nameInput.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) throw new Error("Not found");

        const data = await response.json();
        const sprite = data.sprites.front_default;

        //To fetch Description
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const speciesData = await speciesRes.json();
        const info = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');

        const des = info ? info.flavor_text.replace(/\f/g, ' ') : 'No description available.';
        infoText.textContent=des;

        currentid = data.id;

        pokeimg.src = sprite;
        pokeimg.style.display = "block";

        nameInput.disabled = false;
        nameInput.value = "";
        
    } catch (error) {
        pokeimg.style.display = "none";
        pokeimg.src = "Pokemon-Pokeball-PNG-HD-Image.png";//just cuzzzz
        infoText.textContent = 'No description available.';
        console.error(error);
        nameInput.disabled = false;
    }
}

function nextpoke() {
    pokesearch(currentid + 1);
}

function prevpoke() {
    if (currentid !== 1) pokesearch(currentid - 1);
}

document.getElementById("poke-form").addEventListener("submit", function (e) {
    e.preventDefault();
    pokesearch();
});

document.addEventListener("keydown", (event) => {

    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;

    if (event.key === "ArrowRight") {
        nextpoke();
    } else if (event.key === "ArrowLeft") {
        prevpoke();
    }
});

