import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsc290bzMxMzIiLCJhIjoiY2w3ZHJ2ZWo2MHZ0MzNwcjVweGQwM3pvZCJ9.KK-PgDdPhRoK4mJAagO2LA';
if (environment.production) {
  enableProdMode();
}

if (!navigator.geolocation) {
  alert("Navegador no soporta el Geolocation");
  throw new Error("Navegador no soporta el Geolocation");
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
