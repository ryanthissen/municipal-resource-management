$(document).ready(function() {
    $('select').material_select();
    $('.parallax').parallax();
})

function myMap() {
  let mapCanvas = document.getElementsByClassName('map')[0];
  let mapOptions = {
    center: new google.maps.LatLng(37.871233, -122.267303),
    zoom: 13
  };
  let map = new google.maps.Map(mapCanvas, mapOptions)
}

let urlGenerator = document.getElementsByClassName('url-form')[0];
urlGenerator.addEventListener('submit', function(event) {
  event.preventDefault();
  let url = `https://data.cityofberkeley.info/resource/fe5b-yv79.json?$where=${document.getElementById('select-resource').value} > 0&department=${document.getElementById('select-dept').value}`;
  console.log(document.getElementById('select-dept').value);
  console.log(document.getElementById('select-resource').value);
  console.log(url);
  // let department = document.getElementsByClassName('active')[0].textContent;
  // let resource = document.getElementsByClassName('active')[1].textContent;
  // console.log(department);
  // console.log(resource);
})
