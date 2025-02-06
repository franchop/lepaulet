import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
// Importez ici d'autres composants ou modules si nécessaire

import { routes } from './app.routes';
import { MusicComponent } from './music/music.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, CommonModule, RouterOutlet, RouterModule],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],

  bootstrap: [AppComponent], // Composant racine de l'application
})
export class AppModule {}
