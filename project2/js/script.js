"use strict";

window.onload = getStoredData;
let pokemonName = "";
let wrongPokemonName = [];

let intCurrentScore = 0;
let intBestScore = 0;

let wrongCases = ["pika", "kogy", "bob", "flippy"];

let storedIntBest = localStorage.getItem("intBestScore");

document.addEventListener('DOMContentLoaded', getPokemon());

function getStoredData()
{
    if (storedIntBest)
    {
        console.log(storedIntBest);
        intBestScore = storedIntBest;
        document.querySelector("#left-text").innerHTML = "Best Score: " + intBestScore;
    }
}

function getPokemon()
{
    let randomValue = Math.floor(Math.random() * 700);

    wrongPokemonName = [];

    const urls = [];

    //Pushes the right button
    urls.push(`https://pokeapi.co/api/v2/pokemon/${randomValue}`);

    for (let i = 0; i < 3; i++)
    {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 700)}`);
    }
    //const SERVICE_URL = `https://pokeapi.co/api/v2/pokemon/${randomValue}`;

    //let url = SERVICE_URL;

    getData(urls);
}

function getData(urls)
{
    let tempIncrement = 1;
    while (tempIncrement <= 3)
    {
        let xhr = new XMLHttpRequest();

	    xhr.onload = dataLoadedIncorrectly;

	    xhr.onerror = dataError;

	    xhr.open("GET", urls[tempIncrement]);
        tempIncrement++;
	    xhr.send();
    }

    let xhr = new XMLHttpRequest();

	xhr.onload = dataLoadedCorrectly;

	xhr.onerror = dataError;

	xhr.open("GET", urls[0]);
	xhr.send();
}

function dataLoadedCorrectly(e)
{
	let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    pokemonName = obj.name;
    
    document.querySelector("#center-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.id}.png`;

    console.log(wrongPokemonName);
    
    assignButtons();

    console.log("CompletedCorrectly");
}

function dataLoadedIncorrectly(e)
{
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    wrongPokemonName.push(obj.name);
    
    console.log("Completed");
}

function dataError()
{
    console.log("oops");
}

function assignButtons()
{
    // Your JavaScript code here
    var buttons = document.querySelectorAll('button');

    let randomValue = Math.floor(Math.random() * buttons.length);

    let incrementedWrong = 0;
    
    for (let i = 0; i < buttons.length; i++) 
    {
        if (i == randomValue)
        {
            buttons[i].removeEventListener('click', wrongButton);
            buttons[i].addEventListener('click', rightButton);
            buttons[i].textContent = pokemonName;

        }
        else
        {
            buttons[i].removeEventListener('click', rightButton);
            buttons[i].addEventListener('click', wrongButton);
            buttons[i].textContent = wrongPokemonName[incrementedWrong] != undefined ? wrongPokemonName[incrementedWrong] : wrongCases[i];
            incrementedWrong++;
        }
    }
}

function wrongButton()
{
    if (intCurrentScore > intBestScore)
    {
        intBestScore = intCurrentScore;
        
        localStorage.setItem("intBestScore", intBestScore);
        document.querySelector("#left-text").innerHTML = "Best Score: " + intBestScore;
    }
    intCurrentScore = 0;
    document.querySelector("#right-text").innerHTML = "Current Score: " + intCurrentScore;
    getPokemon();
}

function rightButton()
{
    intCurrentScore++;
    document.querySelector("#right-text").innerHTML = "Current Score: " + intCurrentScore;
    getPokemon();
}