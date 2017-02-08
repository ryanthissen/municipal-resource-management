$(document).ready(function() {
  $('select').material_select();
  $('.parallax').parallax();
  $('.scrollspy').scrollSpy();
});
let objArr = [];
let jsonForm = document.getElementById('url-form');
let flexContainer = document.getElementById('flex-container');
let collapsible = document.getElementsByClassName('collapsible')[0];
let searchedResource = [];

jsonForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const url = `https://data.cityofberkeley.info/resource/fe5b-yv79.json?$where=${document.getElementById('select-resource').value} > 0&department=${document.getElementById('select-dept').value}`;
  searchedResource.push(document.getElementById('select-resource').value);
  fetch(url)
    .then(function(pObj) {
      return pObj.json();
    })
    .then(function(jsonObj) {
      for (let i = 0; i < jsonObj.length; i++) {
        if (searchedResource[0] === "annual_elec_kwh") {
          let newObj = {};
            // console.log(jsonObj[i]);
            newObj.site_name = jsonObj[i].site;
            newObj.department = jsonObj[i].department;
            newObj.end_use = jsonObj[i].end_use;
            newObj.address = jsonObj[i].location_1_address;
            newObj.city = jsonObj[i].location_1_city;
            newObj.state = jsonObj[i].location_1_state;
            newObj.year = jsonObj[i].year;
            newObj.kwh = jsonObj[i].annual_energy_kwheq;
            newObj.various_location = "";
            if (jsonObj[i].location_1) {
              newObj.latitude = jsonObj[i].location_1.coordinates[1];
              newObj.longitude = jsonObj[i].location_1.coordinates[0];
            } else {
              newObj.various_location = "Various, throughout city.";
            }
            objArr.push(newObj);
        } else {
          let newObj = {};
            newObj.site_name = jsonObj[i].site;
            newObj.cost = jsonObj[i].annual_cost;
            newObj.department = jsonObj[i].department;
            newObj.end_use = jsonObj[i].end_use;
            newObj.address = jsonObj[i].location_1_address;
            newObj.city = jsonObj[i].location_1_city;
            newObj.state = jsonObj[i].location_1_state;
            newObj.year = jsonObj[i].year;
            newObj.gallons = jsonObj[i].annual_water_gallons;
            newObj.various_location = "";
            if (jsonObj[i].location_1) {
              newObj.latitude = jsonObj[i].location_1.coordinates[1];
              newObj.longitude = jsonObj[i].location_1.coordinates[0];
            } else {
              newObj.various_location = "Various, throughout city.";
            }
        objArr.push(newObj);
        }
      }
      return objArr;
    })
    .then(function(objArr) {
      if (objArr[0].gallons){
        var sortedObjArr = objArr.slice(0);
        sortedObjArr.sort(function(a,b) {
          return b.gallons - a.gallons;
        });
        return sortedObjArr;
      }
      else {
        var sortedObjArr = objArr.slice(0);
        sortedObjArr.sort(function(a,b) {
          return b.kwh - a.kwh;
        });
        // console.log(sortedObjArr);
        return sortedObjArr;
      }
    })
    .then(function(sortedObjArr) {
      for (i = 0; i < sortedObjArr.length; i++) {
        let br = document.createElement("br")
        let newLi = document.createElement("li");
        let newHead = document.createElement("div");
        newHead.setAttribute("class", "collapsible-header")
        let newBody = document.createElement("div");
        newBody.setAttribute("class", "collapsible-body")
        let headContent = document.createTextNode(sortedObjArr[i].site_name)

        if (sortedObjArr[0].kwh) {
          let bodyContent1 = document.createTextNode('Address:  ' + sortedObjArr[i].address);
          let bodyContent2 = document.createTextNode('Energy Usage:  ' + (sortedObjArr[i].kwh * 1).toLocaleString() + ' kwh');
          let bodyContent3 = document.createTextNode('Year of use:  ' + sortedObjArr[i].year);
          if (sortedObjArr[i].latitude) {
            newHead.setAttribute('data-latitude', sortedObjArr[i].latitude);
            newHead.setAttribute('data-longitude', sortedObjArr[i].longitude);
          }
          newHead.appendChild(headContent);
          newBody.appendChild(bodyContent1);
          newBody.appendChild(document.createElement("br"));
          newBody.appendChild(bodyContent2);
          newBody.appendChild(document.createElement("br"));
          newBody.appendChild(bodyContent3);
          newLi.appendChild(newHead);
          newLi.appendChild(newBody);
          collapsible.appendChild(newLi);
        }
        else {
          let bodyContent1 = document.createTextNode('Address:  ' + sortedObjArr[i].address);
          let bodyContent2 = document.createTextNode('Water Usage:  ' + (sortedObjArr[i].gallons * 1).toLocaleString() + ' gallons');
          let bodyContent3 = document.createTextNode('Annual Cost of Water:  $' + (sortedObjArr[i].cost *1).toLocaleString());
          let bodyContent4 = document.createTextNode('Year of use:  ' + sortedObjArr[i].year);
          if (sortedObjArr[i].latitude) {
            newHead.setAttribute('data-latitude', sortedObjArr[i].latitude);
            newHead.setAttribute('data-longitude', sortedObjArr[i].longitude);
          }
          newHead.appendChild(headContent);
          newBody.appendChild(bodyContent1);
          newBody.appendChild(document.createElement("br"));
          newBody.appendChild(bodyContent2);
          newBody.appendChild(document.createElement("br"));
          newBody.appendChild(bodyContent3);
          newBody.appendChild(document.createElement("br"));
          newBody.appendChild(bodyContent4);
          newLi.appendChild(newHead);
          newLi.appendChild(newBody);
          collapsible.appendChild(newLi);
        }
      }
  });
});

function initMap() {
  let berkeley = {lat: 37.8708555, lng: -122.2681712};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: berkeley
  });
  $('.collapsible').collapsible({
      accordion: false,
      onOpen: function(el) { zoomMarker(map); }, // Callback for Collapsible open
      // onClose: function(el) { alert('Closed'); } // Callback for Collapsible close
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  map.setZoom(14);
}


function zoomMarker(map) {
  let facility = document.getElementsByClassName('active')[3]
  let latitude = (facility.attributes[1].nodeValue * 1);
  let longitude = (facility.attributes[2].nodeValue * 1);
  let facilityLocation = {lat: latitude, lng: longitude};
  console.log(facilityLocation);
  placeMarkerAndPanTo(facilityLocation, map);
}
