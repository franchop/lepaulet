import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil - LePaulet',
  },
  {
    path: 'music',
    component: MusicComponent,
    title: 'Accueil - LePaulet',
  },
];
