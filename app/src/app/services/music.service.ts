import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  albums:Array<any>=[];

  constructor(
    private http: HttpClient
  ) { }

  getAlbums(){
    if(this.albums.length == 0){
      return this.http.get("/assets/ep.json").pipe(
        map((response) => {
          if (response && typeof response === 'object' && !Array.isArray(response)) {
            return Object.entries(response).map(([key, value]) => ({ key, ...value }));
          }
          return response;
        }),
        catchError(err => {
          console.error("Erreur de chargement des albums :", err);
          return of([]); // Retourne un tableau vide en cas d'erreur
        }),
        tap(data => this.albums = data)
      )
    }else{
      return of(this.albums);
    }
  }
}
