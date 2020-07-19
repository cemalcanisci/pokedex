const initialState = {
  pokemons: [],
  pokedex: [],
  searchedPokemons: [],
  pokemon: {},
  error: '',
  limit: 20,
  total: 0,
  pokedexTotal: 0,
  searchedTotal: 0,
};

export default function pokemonsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_POKEMONS': {
      const pokemons = [action.payload.data.results][0];
      const pokedex = [...state.pokedex];
      const checkPokemons = (name) => {
        for (let i = 0; i < pokemons.length; i += 1) {
          if (pokemons[i].name === name) { pokemons[i].catched = true; }
        }
      };
      if (pokedex.length) {
        for (let i = 0; i < pokedex.length; i += 1) {
          checkPokemons(pokedex[i].name);
        }
      }
      return {
        ...state,
        pokemons,
        total: action.payload.data.count,
      }; }
    case 'GET_POKEMON': {
      const pokemon = action.payload.data;
      const pokedex = [...state.pokedex];
      if (pokedex.length) {
        pokedex.forEach((poke) => {
          if (poke.name === pokemon.name) { pokemon.catched = true; }
        });
      }
      return {
        ...state,
        pokemon,
      }; }
    case 'CATCH_POKEMON':
    {
      const pokemons = [...state.pokemons];
      const pokedex = [...state.pokedex];
      const newPokemon = action.payload;
      newPokemon.catched = true;
      pokemons.forEach((poke) => {
        if (poke.name === newPokemon.name) { poke.catched = true; }
      });
      let found = false;
      for (let i = 0; i < pokedex.length; i += 1) {
        if (pokedex[i].name === newPokemon.name) {
          found = true;
          break;
        }
      }
      if (!found) {
        pokedex.push(newPokemon);
      }
      return {
        ...state,
        pokedex: [...pokedex],
        pokedexTotal: pokedex.length,
      }; }
    case 'GET_SEARCHED_POKEMONS':
    {
      let pokemons = [];
      const pokedex = [...state.pokedex];

      if (action.payload.type === 'pokemons') {
        pokemons = [action.payload.pokemons.data.results][0]
          .filter((pokemon) => pokemon.name.includes(action.payload.key.toLowerCase()));
      } else {
        pokemons = [...state.pokedex]
          .filter((pokemon) => pokemon.name.includes(action.payload.key.toLowerCase()));
      }
      const checkPokemons = (name) => {
        for (let i = 0; i < pokemons.length; i += 1) {
          if (pokemons[i].name === name) { pokemons[i].catched = true; }
        }
      };
      if (pokedex.length) {
        for (let i = 0; i < pokedex.length; i += 1) {
          checkPokemons(pokedex[i].name);
        }
      }
      return {
        ...state,
        searchedPokemons: [...pokemons],
        searchedTotal: pokemons.length,

      }; }
    case 'RELEASE_POKEMON':
    {
      const pokedex = [...state.pokedex];
      const pokemons = [...state.pokemons];
      const { pokemon } = state;
      if (pokemon.name) {
        if (pokemon.name === action.payload) pokemon.catched = false;
      }
      const searchedPokemons = [...state.searchedPokemons];
      pokemons.forEach((poke) => {
        if (poke.name === action.payload) { poke.catched = false; }
      });
      if (searchedPokemons.length) {
        searchedPokemons.forEach((poke) => {
          if (poke.name === action.payload) { poke.catched = false; }
        });
      }
      const releasedPokemonIndex = (pokemon) => pokemon.name === action.payload;
      pokedex.splice(pokedex.findIndex(releasedPokemonIndex), 1);
      return {
        ...state,
        pokedex: [...pokedex],
        pokedexTotal: pokedex.length,
        pokemon,
      }; }
    case 'GET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
}
