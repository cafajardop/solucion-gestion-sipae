import { Routes } from '@angular/router';
import { ListaInstitucionesComponent } from './lista-instituciones/lista-instituciones.component';
import { CrearInstitucionComponent } from './crear-institucion/crear-institucion.component';
import { SolucionComponent } from './solucion/solucion.component';
import { TecnologiasComponent } from './tecnologias/tecnologias.component';

export const routes: Routes = [
  { path: '', component: ListaInstitucionesComponent },
  { path: 'crear', component: CrearInstitucionComponent },
  { path: 'solucion', component: SolucionComponent },
  { path: 'tecnologias', component: TecnologiasComponent },
  { path: '**', redirectTo: '' }
];
