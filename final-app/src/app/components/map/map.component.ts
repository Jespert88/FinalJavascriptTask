import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import leaflet from 'leaflet';
import { getRandomString } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private http: HttpClient) { }

  getMap() {
    /* Getting the pokemon object from the pokemon api. */
    /* Pokemon id's */
    /* 
    Haunter = 93 
    Hitmonlee = 106;
    Charizard = 6;
    Ninetales = 38;
    Mankey = 56;
    Tauros = 128;
    Eevee = 133;
    furret = 162;
    Mightyena = 262;
    Arcanine = 59;
    */

  
    /* Global class varibles. */
    let pokemonArray = [];
    let pokemonID = 59;
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let gotData = null;
    let pokeImgUrl = "./assets/pokeball.png";
    let pokemonIMG = "";
    

    

    var pokeBallIcon = leaflet.icon({
      iconUrl: pokeImgUrl, 
      /* shadowUrl: 'leaf-shadow.png',  */   /* This is a shadow image that creates a shadow effect for the icon. */
    
      iconSize:     [30, 30], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor */
    });


    /* Setting up the leaflet map and the icon on the map. */
    var mymap = leaflet.map('mapID').setView([56.8787183, 14.8094385], 13);
  
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoib2FrbGFuZGVyIiwiYSI6ImNrMjFpZzQ2MzE5bXkzbW12Z3d0YmE4MHUifQ.seUiXfpT77ZJjCL4Isu-iw'
    }).addTo(mymap);


    /* Here are all the cities with all the markers. */

    /* Växjö is the start location. */
    /* 56.8787183, 14.8094385 */

    /* London. */
    /* leaflet.marker([51.5073219, -0.1276474], {icon: pokeBallIcon}).addTo(mymap).bindPopup("London"); */

    return this.http.get(url + pokemonID).subscribe( data => {
      gotData = data; 
      /* console.log(gotData); */
      
      /* Get the pokemon image. */
      let pokemonIMG = gotData.sprites.front_default; 
    
      /* When i got the pokemon data i put it inside the leaflet popup function. */
    
      /* Växjö */
       leaflet.marker([56.8787183, 14.8094385], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
        '<img src=' + pokemonIMG + ' class="img-fluid" />' + 
        '<br>' + 
        "<h1>" + gotData.name + "</h1>" +
        '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 1:" +  gotData.abilities[0].ability.name + "</h3>" + '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 2:" +  gotData.abilities[1].ability.name + "</h3>" + '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 3:" +  gotData.abilities[2].ability.name + "</h3>" + '<br>'
      ); 
    
      /* London */
      leaflet.marker([51.5073219, -0.1276474], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
        '<img src=' + pokemonIMG + ' class="img-fluid" />' + 
        '<br>' + 
        "<h1>" + gotData.name + "</h1>" +
        '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 1:" +  gotData.abilities[0].ability.name + "</h3>" + '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 2:" +  gotData.abilities[1].ability.name + "</h3>" + '<br>' +
        "<h3 classname='abilityTitle'>" + "Ability 3:" +  gotData.abilities[2].ability.name + "</h3>" + '<br>'
      );
     
    })
    


  };


  ngOnInit() {
    this.getMap();
  }


}
/* SAVE THIS CODE!!! */

/* let bulbasaurID = 1;
    this.http.get(url + bulbasaurID).subscribe( data => {
      gotData = data;
      pokemonArray.push(gotData);
      console.log("balbasaur");
    })

    let arcanineID = 59;
    this.http.get(url + arcanineID).subscribe( data => {
      gotData = data;
      pokemonArray.push(gotData);
      console.log("Archanie");
    })

    let MankeyID = 56;
    this.http.get(url + MankeyID).subscribe( data => {
      gotData = data;
      pokemonArray.push(gotData);
      console.log("Mankey");
    }) 
*/


/* let pokemonImg = '<img src={{gotData.sprites.front_default}} class="img-fluid" class="card-img-top"><br>'; */
    /* let pokemonName = this.gotData.name; */