'use strict';

const API_KEY = {
  MTB_PROJECT: '200545097-098accbb03aa805fddcb8415d5803d14',
  GOOGLE_GEOCODE: 'AIzaSyB4j12Gul8sh8ItARkjtNbbwgFV2pARjv8'
}

/*function checkResponse(res) {
  if(res.ok) {
    return res.json();
  } throw new Error(res.statusText);
}*/

/*function renderQuiz () {
  $('.submit').html(generateStartPage());
}*/

//Make Request to GitHub API
function getTrails(res) {
  console.log(res);
  const lat = res.results[0].geometry.location.lat;
  const long = res.results[0].geometry.location.lng;
  const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&key=${API_KEY.MTB_PROJECT}`;
  fetch(trailURL)
    .then(response => response.json())
    .then(resj => displayResults(resj))
    .catch(error => alert(`Something went wrong. ${error.message}`)
    );
}

//Render Repos to the DOM
function displayResults(res) {
  let trails = res.trails;
  console.log(res);
  $('#results-list').empty();
  let results = '';
  for (let i=0; i<trails.length; i++) {
    results += `<li><h3>${trails[i].name}</h3>
    <p>${trails[i].summary}</p>
    </li>`;
  }
  $(".results").replaceWith(`<section class='results'><ul class='results-list'>${results}</ul></results>`);
  $('.results').removeClass('hidden');
}

function getLat(inputSearch) {
  console.log('2');
  const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearch}&key=${API_KEY.GOOGLE_GEOCODE}`;  
  console.log(geoURL);    
  fetch(geoURL)
    .then(response => response.json())
    .then(resj => getTrails(resj))
    .catch(error => console.log(error.message));
}

function watchForm() {
  $('form').submit(e => {
    e.preventDefault();
    let inputSearch = $('#user-input').val();
    $('.results').empty();
    getLat(inputSearch);
    console.log(inputSearch);
  });
}

$(function() {
  console.log('App loaded. Waiting for submit.');
  watchForm();
});