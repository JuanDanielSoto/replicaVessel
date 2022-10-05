import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from '../services';
import { MongoService } from '../services/mongo.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent{

  names?: string[];
  private debouncerTimer?: NodeJS.Timeout;

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private placesService: PlacesService,
               private mongoService: MongoService) {
    this.names = this.mongoService.names;
  }

  isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();

  }

  onQueryChanges(query: string = "") {
    if (this.debouncerTimer) clearTimeout(this.debouncerTimer);
    this.debouncerTimer = setTimeout(() => {
      console.log("Mandar este Query:", query);
    }, 500);
  }

}
