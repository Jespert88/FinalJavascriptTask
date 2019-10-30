import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

 
  constructor(private http: HttpClient) { }

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
  pokemonID = 59;
  url = 'https://pokeapi.co/api/v2/pokemon/';
  gotData = null;


  getJSONData() {
    return this.http.get(this.url + this.pokemonID).subscribe( data => {
      this.gotData = data;
      console.log(this.gotData);

      console.log(this.gotData.moves[0].move.name);
    })
  }

  ngOnInit() {
    this.getJSONData();
  }

}
