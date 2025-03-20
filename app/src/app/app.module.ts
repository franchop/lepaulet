import { inject, NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {
  IsActiveMatchOptions,
  provideRouter,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  withViewTransitions,
} from '@angular/router';
// Importez ici d'autres composants ou modules si nécessaire

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(
      routes,
      withViewTransitions({
        onViewTransitionCreated: ({ transition }) => {
          const router = inject(Router);
          const targetUrl = router.getCurrentNavigation()!.finalUrl!;
          // Skip the transition if the only thing
          // changing is the fragment and queryParams
          const config: IsActiveMatchOptions = {
            paths: 'exact',
            matrixParams: 'exact',
            fragment: 'ignored',
            queryParams: 'ignored',
          };
          if (router.isActive(targetUrl, config)) {
            transition.skipTransition();
          }
        },
      })
    ),
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent], // Composant racine de l'application
})
export class AppModule {}
