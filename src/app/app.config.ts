import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsPE from '@angular/common/locales/es-PE';
import { FormatnumberPipe } from './core/pipe/formatnumber.pipe';
//import { tokenInterceptor } from './core/interceptors/_jwt-interceptor.interceptor';

registerLocaleData(localeEs);
registerLocaleData(localeEsPE);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(NgbModule),
    { provide: LOCALE_ID, useValue: 'es-PE' },
    FormatnumberPipe,
    DecimalPipe,
    {
      provide: NgbDatepickerConfig,
      useFactory: () => {
        const config = new NgbDatepickerConfig();
        config.minDate = { year: 1900, month: 1, day: 1 };
        config.maxDate = { year: 2100, month: 12, day: 31 };
        return config;
      }
    }
  ],
};