import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PlacesService } from '../services';
import { MongoService } from '../services/mongo.service';
import { BodyList, List, Msg, Vessel } from '../interfaces/List';
import { type } from 'os';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { toArray } from 'rxjs/operators';

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
  bodyList:BodyList = {
    page : this.page,
    items : this.items,
  };
  form: FormGroup;

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private router: Router,
               private authService: AuthService,
               private placesService: PlacesService,
               private mongoService: MongoService,
               private fb: FormBuilder) {
    this.form = fb.group({
      filtros:  new FormArray([])
      });
    this.names = this.mongoService.names;

    this.mongoService.getList(this.bodyList).subscribe(res => {
      this.list = res;
      this.pageSelect(this.page);
    });
  }

  updateList(){
    this.mongoService.getList(this.bodyList).subscribe(res => {
      this.list = res;
    });
  }

  pageSelect(start:number){
    this.page = start;
    this.bodyList.page = start;
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

  onCheckboxChange(event: any) {
    const filtros = (this.form.controls['filtros'] as FormArray);
    if (event.target.checked) {
      filtros.push(new FormControl(event.target.value));
    } else {
      const index = filtros.controls
      .findIndex(x => x.value === event.target.value);
      filtros.removeAt(index);
    }
  }

  onInputChange(event: any) {
    const filtros = (this.form.controls['filtros'] as FormArray);
    filtros.push(new FormControl(event.target.value));
  }

  aplicar(BuildMin:string, BuildMax:string, GTMin:string, GTMax:string, DWTMin:string, DWTMax:string, SizeMin:string, SizeMax:string) {
    let built = ""; let gt = ""; let size = ""; let dwt = ""; let coors = false; let photo = false;
    if(BuildMin!=""&&BuildMax!=""){
      built = BuildMin+"/"+BuildMax;
    }
    if(GTMin!=""&&GTMax!=""){
      gt = GTMin+"/"+GTMax;
    }
    if(DWTMin!=""&&DWTMax!=""){
      dwt = DWTMin+"/"+DWTMax;
    }
    if(SizeMin!=""&&SizeMax!=""){
      size = SizeMin+"/"+SizeMax;
    }
    const filtros:string[] = this.form.value["filtros"];
    for(let filtro in filtros){
      if(filtros[parseInt(filtro)]=="photo"){ photo=true }
      if(filtros[parseInt(filtro)]=="coors"){ coors=true }
    }
    this.bodyList = {
      page : this.page,
      items : this.items,
      photo : photo,
      coors : coors,
      built,
      gt,
      dwt,
      size
    }
    console.table(this.bodyList);
    this.page = 1;
    this.pageSelect(1);
  }
}
