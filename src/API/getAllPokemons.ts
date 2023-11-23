import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAllPokemons, Pokemon } from './types/apiTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<
    IAllPokemons | Pokemon,
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
