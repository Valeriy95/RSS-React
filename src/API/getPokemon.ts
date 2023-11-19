import { Pokemon } from '../types/types';

export async function getPokemon(url: string): Promise<Pokemon | undefined> {
  const response: Response = await fetch(`${url}`);

  if (response.ok) {
    const json: Pokemon = await response.json();
    console.log(json);
    return json;
  } else if (response.status === 404) {
    return undefined;
  } else {
    throw new Error(`Error ${response.status}`);
  }
}
