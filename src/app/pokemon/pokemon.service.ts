import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { UrlsService } from "../urls.service";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
  private baseUrl: string = this.urlsService.getBaseUrl();

  constructor(private http: HttpClient, private urlsService: UrlsService) {}

  getPokemonList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/pokemons`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<any | undefined> {
    return this.http.get<any>(`${this.baseUrl}api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<any>(`${this.baseUrl}api/pokemons`, pokemon).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<any | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http
      .put<any>(`${this.baseUrl}api/pokemons/${pokemon.id}`, pokemon)
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  deletePokemonById(pokemonId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term: string): Observable<any> {
    if (term.length <= 1) {
      return of([]);
    }
    return this.http.get<any>(`${this.baseUrl}api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private log(response: any): void {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
