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
    let pokemonID = 59;
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let gotData = null;
    let pokeImgUrl = "./assets/pokeball.png";
  
    /* let pokemonImg = '<img src={{gotData.sprites.front_default}} class="img-fluid" class="card-img-top"><br>'; */
    /* let pokemonName = this.gotData.name; */

    

    var pokeBallIcon = leaflet.icon({
      iconUrl: pokeImgUrl, 
      /* shadowUrl: 'leaf-shadow.png',  */   /* This is a shadow image that creates a shadow effect for the icon. */
    
      iconSize:     [50, 50], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor */
    });


    /* Setting up the leaflet map and the icon on the map. */
    var mymap = leaflet.map('mapID').setView([59.329324, 18.068581], 13);
  
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoib2FrbGFuZGVyIiwiYSI6ImNrMjFpZzQ2MzE5bXkzbW12Z3d0YmE4MHUifQ.seUiXfpT77ZJjCL4Isu-iw'
    }).addTo(mymap);

    /* Test icon for sweden. */
    /* leaflet.marker([59.329324, 18.068581], {icon: pokeBallIcon}).addTo(mymap).bindPopup("SWEDEN!!"); */

    




    return this.http.get(url + pokemonID).subscribe( data => {
      gotData = data;
      /* console.log(gotData); */

      let pokemonIMG = gotData.sprites.front_default;

      /* When i got the pokemon data i put it inside the leaflet popup function. */
      leaflet.marker([51.495, -0.083], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
        '<img src=' + pokemonIMG + ' class="img-fluid" />' + '<br>' + gotData.name + '<br>' 
      );
      
    })

  };




  ngOnInit() {
    this.getMap();
  }





}
