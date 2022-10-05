import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: ListadoComponent },
      { path: 'map', component: DashboardComponent },
      { path: 'map/:id', component: DashboardComponent },
      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
