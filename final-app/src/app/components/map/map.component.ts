import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import leaflet from 'leaflet';
import { getRandomString } from 'selenium-webdriver/safari';
import { merge } from 'rxjs';

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
      iconAnchor:   [5, 30], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor */
    });


    /* Setting up the leaflet map and the icon on the map. */
    var mymap = leaflet.map('mapID').setView([56.8787183, 14.8094385], 13);
  
    leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoib2FrbGFuZGVyIiwiYSI6ImNrMjFpZzQ2MzE5bXkzbW12Z3d0YmE4MHUifQ.seUiXfpT77ZJjCL4Isu-iw'
    }).addTo(mymap);




    /* 
      Here i got help, so the problem was that everything was running at the same time and the browser got confused
      where to display the data and didn't run the last function. So this solution was to put every get method in a toPromise with ".then".

      And when i have the data i put that data inside the leaflet marker.
    */

      this.http.get(url + pokemonID).toPromise()
      .then( (data) => {
        gotData = data;
        let pokemonImg = gotData.sprites.front_default;
        pokemonArray.push(gotData);

        /* Växjö */
        leaflet.marker([56.878718, 14.809439], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
          '<img src=' + pokemonImg + ' class="img-fluid" />' + "<br>" +
          gotData.name
        )
      })
      .then( () => {
          let HaunterID = 93;
        this.http.get(url + HaunterID).toPromise()
        .then( (data) => {
          gotData = data;
          let pokemonImg = gotData.sprites.front_default;
          pokemonArray.push(gotData);

          /* London */
          leaflet.marker([51.5073219, 0.1276474], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
            '<img src=' + pokemonImg + ' class="img-fluid" />' + "<br>" +
            gotData.name
          )
        }) 
      })
      .then(() => {
        let CharizardID = 6;
        this.http.get(url + CharizardID).toPromise()
        .then( (data) => {
          gotData = data;
          let pokemonImg = gotData.sprites.front_default;
          pokemonArray.push(gotData);
 
          /* Norway */
         leaflet.marker([59.91333, 10.73897], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
            '<img src=' + pokemonImg + ' class="img-fluid" />' + "<br>" +
            gotData.name
          )
        })
      }) 
     .then(() => {
        let MankeyID = 56;
        this.http.get(url + MankeyID).toPromise()
        .then( (data) => {
          gotData = data;
          let pokemonImg = gotData.sprites.front_default;
          pokemonArray.push(gotData); 
  
          /* Finland */
          leaflet.marker([60.16741, 24.942577], {icon: pokeBallIcon}).addTo(mymap).bindPopup(
            '<img src=' + pokemonImg + ' class="img-fluid" />' + "<br>" +
            gotData.name
          )
        })
      }) 

      .then( () => {
        console.log(pokemonArray);
      })
      
 }


  ngOnInit() {
    this.getMap();
  }
};
