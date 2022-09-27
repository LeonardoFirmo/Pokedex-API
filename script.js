const pokemonImage = document.querySelector('.pokemonImg')
const pokemonEscolha = document.querySelector('.form')
const paragraphPokemon = document.querySelector('.pokemon_name')
const numberPokemon = document.querySelector('.pokemon_number')
const buttons = document.querySelector('.buttons')


buttons.addEventListener('click',mudaPokemon)

function mudaPokemon(event){
    const botaoClicado = event.target.innerHTML
    
    if(botaoClicado.includes('Prev') && numberPokemon.innerHTML >1 ){
        let changePokemon = --numberPokemon.innerHTML
        getDados(changePokemon)
    
    }else if(botaoClicado.includes('Next')){
        let changePokemon = ++numberPokemon.innerHTML
        getDados(changePokemon)
    }
   
}


const getPokemonUser = pokemonEscolha.addEventListener('submit',event =>{
    event.preventDefault()
    const pokemon = event.target.input.value
    let currentPokemon = pokemon.toLowerCase()

    getDados(currentPokemon)

    pokemonEscolha.reset()

})



async function getDados (pokemonAtual){
 await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonAtual}`)
    .then(response => response.json())
    .then(pokemon =>{
        const namePoke = pokemon.name
        const numberPoke= pokemon.id
        const gifPokemon = pokemon.sprites.versions['generation-v']['black-white']['animated']['front_default']
        const imgPoke = pokemon.sprites.front_default

        dadosPokemon(numberPoke,namePoke,gifPokemon,imgPoke)
        
    }).catch( (error) =>{
        numberPokemon.innerHTML=''
        paragraphPokemon.innerHTML= `Não existe`
        console.log('Houve um erro:' + error);
    })
}

function dadosPokemon(number,name,gif,img){
    addNameNumberPoke(number,name)
    addIMG(gif,img)

}


function addNameNumberPoke(number,name){
    if(number < 899){
        numberPokemon.innerHTML= number
        paragraphPokemon.innerHTML= name
    }else{
        numberPokemon.innerHTML=''
        paragraphPokemon.innerHTML= `Não existe`
    }
   


}


function addIMG(pokemonGif,pokemonIMG){
  
    if(pokemonGif !== null){
        pokemonImage.setAttribute('src',pokemonGif)
    }else{
        pokemonImage.setAttribute('src',pokemonIMG)
    }
    
    
}



