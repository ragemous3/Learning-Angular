import 'hammerjs';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

localStorage.getItem('locale');
if (localStorage.getItem('locale') === null) {
  localStorage.setItem('locale', 'se');
}
console.log(localStorage.getItem('locale'))

const locale = localStorage.getItem('locale');

declare const require;
const translations = require(`raw-loader!../locale/messages.${locale}.xlf`).default;

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]})
  .catch(err => console.error(err));
