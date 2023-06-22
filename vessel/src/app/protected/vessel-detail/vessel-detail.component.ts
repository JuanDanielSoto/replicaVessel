import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from '../services';
import { MongoService } from '../services/mongo.service';
import { FormBuilder } from '@angular/forms';
import { Vessel } from '../interfaces/List';

@Component({
  selector: 'app-vessel-detail',
  templateUrl: './vessel-detail.component.html',
  styleUrls: ['./vessel-detail.component.css']
})
export class VesselDetailComponent implements OnInit {

  vessel!:Vessel;
  test = "PEMEX EHECATL";

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private mongoService: MongoService,
               private activatedRoute: ActivatedRoute) { }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.mongoService.getCoors(params.id).subscribe(res => {
        this.vessel = res;
      });
    });
  }

}
