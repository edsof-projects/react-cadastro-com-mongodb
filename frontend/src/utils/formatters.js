export function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pegarPrimeiroNome(nomeCompleto) {
  if (!nomeCompleto) return '';
  return nomeCompleto.split(' ')[0];
}
