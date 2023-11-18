import { IPeople, Pokemon } from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export async function getPerson(
//   text: string,
//   item: number,
//   lim: number,
// ): Promise<IPeople | undefined> {
//   const response: Response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${text}?limit=${lim}&offset=${item}`,
//   );

//   if (response.ok) {
//     const json: IPeople = await response.json();
//     return json;
//   } else if (response.status === 404) {
//     return undefined;
//   } else {
//     throw new Error(`Error ${response.status}`);
//   }
// }


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPerson: builder.query<IPeople, { text: string; item: number; lim: number }>({
      query: ({ text, item, lim }) => `pokemon/${text}?limit=${lim}&offset=${item}`,
    }),
    getPokemon: builder.query<Pokemon, string>({
      query: (url) => `pokemon/${url}`,
    }),
  }),
});

// export const { useGetPersonQuery } = api;
export const { useGetPersonQuery, useGetPokemonQuery } = api;