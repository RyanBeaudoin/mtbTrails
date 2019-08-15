'use strict';

const API_KEY = {
  MTB_PROJECT: '200545097-098accbb03aa805fddcb8415d5803d14',
  GOOGLE_GEOCODE: 'AIzaSyB4j12Gul8sh8ItARkjtNbbwgFV2pARjv8',
  YOUTUBE:
  'AIzaSyDjWNOQEuzjtZAxzO_1e_PQjsGH8kThPOk'
}

function getTrails(res) {
  console.log(res);

  const lat = res.results[0].geometry.location.lat;
  const long = res.results[0]
  .geometry.location.lng;
  console.log(lat);
  
  const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&key=${API_KEY.MTB_PROJECT}`;
  fetch(trailURL)
    .then(response => response.json())
    .then(resj => displayResults(resj))
    .then(resj => getTrailName(resj))
    .catch(error => alert(`Something went wrong. ${error.message}`)
    );
}

function getTrailName(res) {
  console.log(res);

  const name = [];
  for (let i = 0; i < res.trails.length; i++){
    name[i] = res.trails[i]['name'].replace(/\s/g, "-").toLowerCase();
  }
  const nameArray = Object.values(name);
  console.log(nameArray);

  /*let nameArrayLength = nameArray.length;
  console.log(nameArrayLength);
  let videoURL='';
  for (let i=0; i<nameArray; i++) {
    videoURL+=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${nameArray[i]}&key=${API_KEY.YOUTUBE}`;
  }*/
  for (let j=0; j<name.length; j++) {
  const videoURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${name[j]}&key=${API_KEY.YOUTUBE}`;
  console.log(videoURL);
  fetch(videoURL)
    .then(response => response.json())
    .then(resj => displayVideo(resj, j))
    .catch(error => alert(`Something went wrong. ${error.message}`)
    )};
}

//Render Repos to the DOM
function displayResults(res) {
  let trails = res.trails;
  console.log(res);
  console.log(trails);
  $('#results-list').empty();
  let results = '';
  for (let i=0; i<trails.length; i++) {
    results += `<li id=id${i}>
    <h3 class="trailName">${trails[i].name}</h3>
    <img src="${trails[i].imgSqSmall}">
    <h5>Location:</h5>
    <p>${trails[i].location}</p>
    <h5>Overview:</h5>
    <p>${trails[i].summary}</p>
    <h5>Rating:</h5>
    <p>${trails[i].stars}</p>
    <h5>Length:</h5>
    <p>${trails[i].length}</p>
    <h5>Conditions:</h5>
    <p>${trails[i].conditionStatus}</p>
    <h5>Coordinates:</h5>
    <p>${trails[i].longitude}, ${trails[i].latitude}</p>
    </li>
    <section class="youtube-video">
    </section>`;
  }
  $(".results").replaceWith(`<section class='results'><ul class='results-list'>${results}</ul></results>`);
  $('.results').removeClass('hidden');
  return res;
}

/*let formatName='';
  for (let i=0; i<nameArray.length; i++) {
    formatName += 
  }*/

function displayVideo(res, j) {
  let trailName = res.items;
  console.log(res);
  let video = '';
  for (let i=0; i<trailName.length; i++) {
    video += `<iframe src="https://www.youtube.com/embed/${res.items[i].id.videoId}"></iframe>`;
  }
  console.log(video);
  $(`#id${j}`).append(`<section class='youtube-video'>${video}</section>`);
    return res;
}

function getLat(inputSearch) {
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
  watchForm();``
});