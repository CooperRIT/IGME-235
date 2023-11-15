window.onload = getPokemon();

let displayTerm = "";

function getPokemon()
{
    let randomValue = Math.floor(Math.random() * 700);
    const SERVICE_URL = `https://pokeapi.co/api/v2/pokemon-form/${randomValue}`
    //const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomValue}.png`

    let url = SERVICE_URL;
    //let spriteURL = SPRITE_URL;

    getData(url);
    //getData(spriteURL);
}

function getData(url)
{
	let xhr = new XMLHttpRequest();

	xhr.onload = dataLoaded;

	xhr.onerror = dataError;

	xhr.open("GET", url);
	xhr.send();
}

function dataLoaded(e)
{
	let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    document.querySelector("#pokemon").innerHTML = obj.name;
    //document.querySelector("#center-image").src = obj;
}

function dataError()
{

}