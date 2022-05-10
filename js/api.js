const BASE_API = 'https://pokeapi.co/api/v2/'
export async function getPokemon(id) {
  try {
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    const data = await response.json()
    return { data: data, isError: false }
  } catch (error) {
    return {
      data: null,
      isError: true,
    }
  }
  //TODO: error handling
}

export async function getSpecies(id) {
  const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
  const data = await response.json()
  //TODO: error handling
  return data
}
