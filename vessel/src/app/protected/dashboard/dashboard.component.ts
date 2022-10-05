import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Vessel } from '../interfaces/mongoInter';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent {

  activate:boolean =false;
  private debouncerTimer?: NodeJS.Timeout;

  vessel!: Vessel;
  get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private placesService: PlacesService) { }

  isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  loadVessel(vessel: Vessel) {
    this.vessel = vessel;
    this.activate =true;
  }



}
