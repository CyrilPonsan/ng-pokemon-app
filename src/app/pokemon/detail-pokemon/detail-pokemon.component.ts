import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: [],
})
export class DetailPokemonComponent implements OnInit {
  pokemon!: Pokemon | undefined;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon.data));
    }
  }

  deletePokemon(pokemon: Pokemon): void {
    if (this.authService.isLoggedIn) {
      this.pokemonService
        .deletePokemonById(pokemon.id)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon): void {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }
}
