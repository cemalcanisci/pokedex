import axios from 'axios';

export const getPokemons = (page) => async (dispatch) => {
  try {
    const limit = 20;
    const offset = limit * (page - 1);
    const pokemons = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    dispatch({ type: 'GET_POKEMONS', payload: pokemons });
  } catch (error) {
    dispatch({ type: 'GET_ERROR', payload: 'Something Wrong..' });
  }
};
export const getPokemon = (pokemonId) => async (dispatch) => {
  try {
    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );
    dispatch({ type: 'GET_POKEMON', payload: pokemon });
  } catch (error) {
    dispatch({ type: 'GET_ERROR', payload: 'Something Wrong..' });
  }
};
export const getSearchedPokemons = (type, key) => async (dispatch) => {
  if (key === '') {
    dispatch({ type: 'GET_ERROR', payload: 'Please write name which pokemon you want search!!' });
  } else if (type === 'pokemons') {
    try {
      const pokemons = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0',
      );
      dispatch({ type: 'GET_SEARCHED_POKEMONS', payload: { pokemons, key, type } });
    } catch (error) {
      dispatch({ type: 'GET_ERROR', payload: 'Something Wrong..' });
    }
  } else {
    dispatch({ type: 'GET_SEARCHED_POKEMONS', payload: { key, type } });
  }
};
export const catchPokemon = (pokemon) => (dispatch) => {
  dispatch({ type: 'CATCH_POKEMON', payload: pokemon });
};
export const releasePokemon = (name) => (dispatch) => {
  dispatch({ type: 'RELEASE_POKEMON', payload: name });
};
