import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { PhotoComponent } from './photo/photo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil - LePaulet',
  },
  {
    path: 'music',
    component: MusicComponent,
    title: 'Ma musique - LePaulet',
  },
  {
    path: 'photo',
    component: PhotoComponent,
    title: 'Mes photos - LePaulet',
  },
];
