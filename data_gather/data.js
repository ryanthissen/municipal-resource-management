let url = 'https://data.cityofberkeley.info/resource/fe5b-yv79.json'

let animalShelter = [];
let hhcs = [];
let libraries = [];
let prw = [];
let planning = [];
let publicSafety = [];
let pw = [];
let other = [];

let animalWater = 0;
let animalEnergy = 0;
let hhcsWater = 0;
let hhcsEnergy = 0;
let librariesWater = 0;
let librariesEnergy = 0;
let prwWater = 0;
let prwEnergy = 0;
let planningWater = 0;
let planningEnergy = 0;
let publicsafetyWater = 0;
let publicsafetyEnergy = 0;
let pwWater = 0;
let pwEnergy = 0;
let otherWater = 0;
let otherEnergy = 0;

fetch(url)
  .then(function(pObj) {
    return pObj.json();
  })
  .then(function(jsonObj) {
    for (i = 0; i < jsonObj.length; i++) {
      if (jsonObj[i].department === "Animal Shelter") {
        animalShelter.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "HHCS") {
        hhcs.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "Libraries") {
        libraries.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "PRW") {
        prw.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "Planning") {
        planning.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "Public Safety") {
        publicSafety.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "PW") {
        pw.push(jsonObj[i]);
      }
      if (jsonObj[i].department === "Other") {
        other.push(jsonObj[i]);
      }
    }
  })
  .then(function() {
    for (i = 0; i < animalShelter.length; i++) {
      animalWater += (animalShelter[i].annual_water_gallons * 1);
      animalEnergy += (animalShelter[i].annual_energy_kwheq * 1);
    }

    for (i = 0; i < hhcs.length; i++) {
      if (hhcs[i].annual_water_gallons){
        hhcsWater += (hhcs[i].annual_water_gallons * 1);
      } if (hhcs[i].annual_energy_kwheq) {
        hhcsEnergy += (hhcs[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < libraries.length; i++) {
      if (libraries[i].annual_water_gallons){
        librariesWater += (libraries[i].annual_water_gallons * 1);
      } if (libraries[i].annual_energy_kwheq) {
        librariesEnergy += (libraries[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < prw.length; i++) {
      if (prw[i].annual_water_gallons){
        prwWater += (prw[i].annual_water_gallons * 1);
      } if (prw[i].annual_energy_kwheq) {
        prwEnergy += (prw[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < planning.length; i++) {
      if (planning[i].annual_water_gallons){
        planningWater += (planning[i].annual_water_gallons * 1);
      } if (planning[i].annual_energy_kwheq) {
        planningEnergy += (planning[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < publicSafety.length; i++) {
      if (publicSafety[i].annual_water_gallons){
        publicsafetyWater += (publicSafety[i].annual_water_gallons * 1);
      } if (publicSafety[i].annual_energy_kwheq) {
        publicsafetyEnergy += (publicSafety[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < pw.length; i++) {
      if (pw[i].annual_water_gallons){
        pwWater += (pw[i].annual_water_gallons * 1);
      } if (pw[i].annual_energy_kwheq) {
        pwEnergy += (pw[i].annual_energy_kwheq * 1);
      }
    }

    for (i = 0; i < other.length; i++) {
      if (other[i].annual_water_gallons){
        otherWater += (other[i].annual_water_gallons * 1);
      } if (other[i].annual_energy_kwheq) {
        otherEnergy += (other[i].annual_energy_kwheq * 1);
      }
    }
  })
  .then(function() {
    console.log("animal Water: " + animalWater);
    console.log("animal Energy: " + animalEnergy);

    console.log("HHCS Water: " + hhcsWater);
    console.log("HHCS Energy: " + hhcsEnergy);

    console.log("libraries Water: " + librariesWater);
    console.log("libraries Energy: " + librariesEnergy);

    console.log("prw Water: " + prwWater);
    console.log("prw Energy: " + prwEnergy);

    console.log("planning Water: " + planningWater);
    console.log("planning Energy: " + planningEnergy);

    console.log("public safety Water: " + publicsafetyWater);
    console.log("public safety Energy: " + publicsafetyEnergy);

    console.log("pw Water: " + pwWater);
    console.log("pw Energy: " + pwEnergy);

    console.log("other Water: " + otherWater);
    console.log("other Energy: " + otherEnergy);
  })
