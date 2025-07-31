export function ordenarPorNome(array) {
  return array.sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
  );
}
