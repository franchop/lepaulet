import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  pictures: any=[];
  

  constructor(private http: HttpClient) { }

  getPictures(){
    if(this.pictures.length>0) return;
    this.http.get("/assets/photo.json").pipe(
      map((response) => {
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          return Object.entries(response).map(([key, value]) => ({ key, ...value }));
        }
        return response;
      }),
      catchError(err => {
        console.error("Erreur de chargement des photos :", err);
        return of([]); // Retourne un tableau vide en cas d'erreur
      }),
      tap(pictures => this.pictures = pictures),
    ).subscribe();
  }
  
}
