window.onload = getPokemon();

let displayTerm = "";

function getPokemon()
{
    let randomValue = Math.floor(Math.random() * 700);
    const SERVICE_URL = `https://pokeapi.co/api/v2/pokemon-form/${randomValue}`

    let url = SERVICE_URL;

    getData(url);
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
}

function dataError()
{

}