import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoComponent } from './listado/listado.component';
import { VesselDetailComponent } from './vessel-detail/vessel-detail.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: ListadoComponent },         //Muesta el listado
      { path: ':id', component: VesselDetailComponent },    //Muestra detalle del vessel
      { path: ':id/map', component: DashboardComponent }, //Muestra el Vessel en el mapa
      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
