import { IPeople } from '../types/types';

export async function getPerson(text: string): Promise<IPeople | undefined> {
  const response: Response = await fetch(
    `https://swapi.dev/api/people/?search=${text}`,
  );

  if (response.ok) {
    const json: IPeople = await response.json();
    return json;
  } else {
    throw new Error(`Error ${response.status}`);
  }
}
