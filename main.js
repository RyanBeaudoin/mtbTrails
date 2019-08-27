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

  for (let j=0; j<name.length; j++) {
  const videoURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${name[j]}&key=${API_KEY.YOUTUBE}`;
  console.log(videoURL);
  fetch(videoURL)
    .then(response => response.json())
    .then(resj => displayVideo(resj, j))
    .then(resj => watchVidClick(resj, j))
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
    <img src="${trails[i].imgSqSmall}" class="trailImg">
    <h5>Location:</h5>
    <p>${trails[i].location}</p>
    <h5>Overview:</h5>
    <p>${trails[i].summary}</p>
    <div class ="rating-num">
      <p>${trails[i].stars}</p>
    </div>
    <h5 class="rating-label">Rating</h5>
    <div class="rem-res-cont">
      <h5>Length:</h5>
      <p>${trails[i].length} miles</p>
      <h5>Conditions:</h5>
      <p>${trails[i].conditionStatus}</p>
      <h5>Coordinates:</h5>
      <p>${trails[i].longitude}, ${trails[i].latitude}</p>
    </div>
    <img src='imgs/play-icon.jpeg' id='play-icon'>
    </li>`;
  }
  $(".results").replaceWith(`<section class='results'><ul class='results-list'>${results}</ul></results>`);
  $('.results').removeClass('hidden');
  return res;
}

function displayVideo(res, j) {
  let trailName = res.items;
  console.log(res);
  let video = '';
  for (let i=0; i<trailName.length; i++) {
    video += `<img class='youtube-video' src='${res.items[i].snippet.thumbnails.default.url}'>`;
  }
  console.log(video);
  $(`#id${j}`).append(`${video}</section>`);
    return res;
}

function watchVidClick (res, j) {
  let trailName = res.items;
  let vidUrl = '';
  for (let i = 0; i < trailName.length; i++) {
    vidUrl += `https://www.youtube.com/watch?v=${res.items[i].id.videoId}`;
    $('.youtube-video, #play-icon').click(function(){
      window.open(vidUrl, '_blank');
    });
  };
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
    $('#search-form').hide();
    $('html').addClass('hide-bg');
    $('#nav-info').hide();
    $('#nav-bar').show();
    $('#nav-title').addClass('change-color');
    $('#nav-logo').addClass('change-logo');
    // $('#nav-form').addClass('change-format');
    $('#nav-user-input').addClass('change-format');
    $('#nav-arrow-submit').addClass('change-format');
    $('.results').empty();
    getLat(inputSearch);
    console.log(inputSearch);
  });
}

$(function() {
  console.log('App loaded. Waiting for submit.');
  watchForm();``
});