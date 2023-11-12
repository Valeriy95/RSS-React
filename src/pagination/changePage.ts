import { IPeople } from '../types/types';

export async function changePage(text: string, page: number): Promise<IPeople> {
  const response: Response = await fetch(
    `https://swapi.dev/api/people/?search=${text}&page=${page}`,
  );

  if (response.ok) {
    const data: IPeople = await response.json();
    return data;
  } else {
    throw new Error(`Error ${response.status}`);
  }
}
