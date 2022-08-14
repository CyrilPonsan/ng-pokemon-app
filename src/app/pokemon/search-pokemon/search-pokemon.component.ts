import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
  styles: [],
})
export class SearchPokemonComponent implements OnInit {
  searchTerms: Subject<string> = new Subject<string>();
  pokemons$!: Observable<any>;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term)),
      map((response) => (response = response.data))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon): void {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
