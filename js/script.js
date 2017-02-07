$(document).ready(function() {
    $('select').material_select();
    $('.parallax').parallax();
})
// function myMap() {
//   let mapCanvas = document.getElementsByClassName('map')[0];
//   let mapOptions = {
//     center: new google.maps.LatLng(37.871233, -122.267303),
//     zoom: 13
//   };
//   let map = new google.maps.Map(mapCanvas, mapOptions)
// }
let objArr = [];
let urlGenerator = document.getElementsByClassName('url-form')[0];
let flexContainer = document.getElementById('flex-container');


urlGenerator.addEventListener('submit', function(event) {
  event.preventDefault();
  const url = `https://data.cityofberkeley.info/resource/fe5b-yv79.json?$where=${document.getElementById('select-resource').value} > 0&department=${document.getElementById('select-dept').value}`;
  // console.log(document.getElementById('select-dept').value);
  // console.log(document.getElementById('select-resource').value);
  // console.log(url);
  fetch(url)
    .then(function(pObj) {
      return pObj.json();
    })
    .then(function(jsonObj) {
      for (let i = 0; i < jsonObj.length; i++) {
        let newObj = {}
          newObj.site_name = jsonObj[i].site;
          newObj.department = jsonObj[i].department;
          newObj.end_use = jsonObj[i].end_use;
          newObj.address = jsonObj[i].location_1_address;
          newObj.city = jsonObj[i].location_1_city;
          newObj.state = jsonObj[i].location_1_state;
          newObj.year = jsonObj[i].year;
          newObj.kwh = jsonObj[i].annual_energy_kwheq;
          newObj.gallons = jsonObj[i].annual_water_gallons;
          newObj.various_location = "";
          if (jsonObj[i].location_1) {
            newObj.latitude = jsonObj[i].location_1.coordinates[0];
            newObj.longitude = jsonObj[i].location_1.coordinates[1];
          } else {
            newObj.various_location = "Various, throughout city.";
          }
        objArr.push(newObj);
      }
      console.log(objArr);
    })
    .then(function(objArr) {

    })
})
