$(document).ready(function() {
    $('select').material_select();
    $('.parallax').parallax();
  });
let objArr = [];
let jsonForm = document.getElementById('url-form');
let flexContainer = document.getElementById('flex-container');
let searchedResource = [];

jsonForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const url = `https://data.cityofberkeley.info/resource/fe5b-yv79.json?$where=${document.getElementById('select-resource').value} > 0&department=${document.getElementById('select-dept').value}`;
  console.log(url);
  searchedResource.push(document.getElementById('select-resource').value);
  fetch(url)
    .then(function(pObj) {
      return pObj.json();
    })
    .then(function(jsonObj) {
      for (let i = 0; i < jsonObj.length; i++) {
        if (searchedResource[0] === "annual_elec_kwh") {
          let newObj = {};
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
              newObj.latitude = jsonObj[i].location_1.coordinates[0];
              newObj.longitude = jsonObj[i].location_1.coordinates[1];
            } else {
              newObj.various_location = "Various, throughout city.";
            }
            objArr.push(newObj);
        } else {
          let newObj = {};
            newObj.site_name = jsonObj[i].site;
            newObj.department = jsonObj[i].department;
            newObj.end_use = jsonObj[i].end_use;
            newObj.address = jsonObj[i].location_1_address;
            newObj.city = jsonObj[i].location_1_city;
            newObj.state = jsonObj[i].location_1_state;
            newObj.year = jsonObj[i].year;
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
      }
      return objArr;
    })
    .then(function(objArr) {
      if (objArr[0].gallons){
        var sortedObjArr = objArr.slice(0);
        sortedObjArr.sort(function(a,b) {
          return a.gallons - b.gallons;
        });
        return sortedObjArr;
      }
      else {
        var sortedObjArr = objArr.slice(0);
        sortedObjArr.sort(function(a,b) {
          return a.kwh - b.kwh;
        });
        return sortedObjArr;
      }
    })
    .then(function(sortedObjArr)
    
})
