import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { foundReducer } from './store/found/found.reducer';
import { FundEffects } from './store/found/fund.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { uiNotificationReducer } from './store/ui-notifications/ui-notification.reducer';
import { UiNotificationEffects } from './store/ui-notifications/ui-notification.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ found: foundReducer, uiNotification: uiNotificationReducer }),
    provideEffects([FundEffects, UiNotificationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
