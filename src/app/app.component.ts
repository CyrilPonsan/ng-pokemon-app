import { Component, OnInit } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected!: Pokemon | any;

  ngOnInit(): void {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId: string) {
    const pokemon: Pokemon | any = this.pokemonList.find(
      (pokemon) => pokemon.id === +pokemonId
    );
    if (pokemon) {
      console.log(`Vous avez demandé le pokémon : ${pokemon.name}`);
      this.pokemonSelected = pokemon;
    }
    console.log(`Vous avez demandé un pokémon qui n'existe pas.`);
  }
}
