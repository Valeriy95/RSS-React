import { IPeople } from '../types/types';

export async function getPerson(
  text: string,
  item: number,
  lim: number,
): Promise<IPeople | undefined> {
  const response: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${text}?limit=${lim}&offset=${item}`,
  );

  if (response.ok) {
    const json: IPeople = await response.json();
    return json;
  } else if (response.status === 404) {
    return undefined;
  } else {
    throw new Error(`Error ${response.status}`);
  }
}
