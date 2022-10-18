import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from '../services';
import { MongoService } from '../services/mongo.service';
import { List, Msg, Vessel } from '../interfaces/List';
import { type } from 'os';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent{

  names?: string[];
  private debouncerTimer?: NodeJS.Timeout;
  list!:List;
  pagesBefore:number[]=[];
  pagesAfter:number[]=[];
  page:number = 1;
  items:number= 8;

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private placesService: PlacesService,
               private mongoService: MongoService) {
    this.names = this.mongoService.names;
    this.mongoService.getList(this.page,this.items).subscribe(res => {
      this.list = res;
      this.pageSelect(this.page);
    });
  }

  updateList(){
    this.mongoService.getList(this.page,this.items).subscribe(res => {
      this.list = res;
    });
  }

  pageSelect(start:number){
    this.page = start;
    this.updateList();
    let end = this.list?.msg.info.pages;
    this.pagesBefore=[]; this.pagesAfter=[];
    if(start==1){
      for(let i=start+1; i<=start+3; i++){
        this.pagesBefore.push(i);
      }
    }else{
      for(let i=start; i<=start+3; i++){
        if(start<=end-5){
          this.pagesBefore.push(i);
        }
      }
    }
    if(end!=start){
      for(let i=end-3;i<=end-1;i++){
        this.pagesAfter.push(i);
      }
    }
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
