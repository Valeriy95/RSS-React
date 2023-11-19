import { IPeople, Pokemon } from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<
      IPeople,
      { text: string; item: number; lim: number }
    >({
      query: ({ text, item, lim }) =>
        `pokemon/${text}?limit=${lim}&offset=${item}`,
    }),
    getPokemon: builder.query<Pokemon, string>({
      query: (url) => `pokemon/${url}`,
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonQuery } = api;
