import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appEffects, appStore } from './store/store';
import { provideEffects } from '@ngrx/effects';
import { UserService } from './services/user.service';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appStore),
    provideStoreDevtools({
      maxAge: 128,
      autoPause: true,
      trace: false,
      traceLimit: 128
    }),
    provideEffects(appEffects),
    UserService,
  ]
};
