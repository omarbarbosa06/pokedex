import { getPokemon, getSpecies } from './api.js'

const $image = document.querySelector('#image')
export function setImage(image) {
  $image.src = image
}

const $description = document.querySelector('#description')
function setDescription(description) {
  $description.textContent = description
}

const $screen = document.querySelector('#screen')
function loader(isLoading = false) {
  const img = isLoading ? 'url(./images/loader.gif)' : ''
  $screen.style.backgroundImage = img
}
const $search = document.querySelector('#input')

const $light = document.querySelector('#light')
function speech(text) {
  console.log('here')
  let utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en'
  speechSynthesis.speak(utterance)
  $light.classList.add('is-animated')

  utterance.addEventListener('end', () => {
    $light.classList.remove('is-animated')
  })
}

export async function findPokemon(id) {
  const { data: pokemon, isError } = await getPokemon(id)
  if (isError) {
    setImage('../images/pokeball.svg')
    loader(false)
    $search.value = 'NOT FOUND'
    $description.textContent =
      "Sorry, we don't have that pokemon, try with a different one"
  }
  const species = await getSpecies(id)
  const description = species.flavor_text_entries.find((flavor) => {
    return flavor.language.name === 'en'
  })
  const sprites = [pokemon.sprites.front_default]
  for (const item in pokemon.sprites) {
    if (
      item !== 'front-default' &&
      item !== 'other' &&
      item !== 'versions' &&
      pokemon.sprites[item]
    ) {
      sprites.push(pokemon.sprites[item])
    }
  }
  console.log(sprites)
  return {
    description: description.flavor_text,
    sprites,
    id: pokemon.id,
    name: pokemon.name,
  }
}

export async function setPokemon(id) {
  //loader
  loader(true)
  const pokemon = await findPokemon(id)
  //turn off loader
  loader(false)
  setImage(pokemon.sprites[0])
  setDescription(pokemon.description)
  speechSynthesis.cancel()
  speech(`${pokemon.name}. ${pokemon.description}`)
  return pokemon
}
