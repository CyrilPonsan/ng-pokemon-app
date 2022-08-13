import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
  styleUrls: [],
})
export class ListPokemonComponent implements OnInit {
  pokemonList!: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
