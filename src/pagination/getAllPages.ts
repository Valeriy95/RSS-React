export function getAllPages(elements: number): number[] {
  const allPages = Math.ceil(elements / 10);
  const arrayAllPages = [];
  for (let i = 1; i <= allPages; i++) {
    arrayAllPages.push(i);
  }
  return arrayAllPages;
}
