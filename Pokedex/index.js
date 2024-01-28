const pokemonNumber = document.getElementById("pokeNumber");
const pokemonName = document.getElementById("pokeName");
const input = document.getElementById("pokeSearch");
const pokeImg = document.querySelector(".pokeImg");
const form = document.getElementById("form");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  console.log(pokemon);
  const data = await fetchPokemon(pokemon);

  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  if (data) {
    pokeImg.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokeImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokeImg.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value);
  input.value = "";
});

prevBtn.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

nextBtn.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);