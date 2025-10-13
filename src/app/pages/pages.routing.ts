import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { RoladminGuard } from '../guards/roladmin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TemplateComponent } from './template/template.component';
import { ReporteshorasComponent } from './reporteshoras/reporteshoras.component';
import { RegistrohorasComponent } from './registrohoras/registrohoras.component';
import { PlanningComponent } from './planning/planning.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ClasificacionesActividadesComponent } from './clasificaciones-actividades/clasificaciones-actividades.component';
import { FuncionesComponent } from './funciones/funciones.component';
import { MisproyectosComponent } from './misproyectos/misproyectos.component';
import { AgenteiaComponent } from './agenteia/agenteia.component';

const routes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Panel principal' } },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Panel principal' } },
            //{ path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'reportehoras', component: ReporteshorasComponent, data: { titulo: 'Reporte de Horas' } },
            { path: 'registrohoras', component: RegistrohorasComponent, data: { titulo: 'Registro de Horas' } },
            { path: 'misproyectos', component: MisproyectosComponent, data: { titulo: 'Mis Proyectos' } },
            { path: 'asignacion', component: PlanningComponent, data: { titulo: 'Asignación' } },            
            { path: 'configuracion', component: ConfiguracionComponent, data: { titulo: 'Configuración' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes' }},
            { path: 'proyectos', component: ProyectosComponent, data: { titulo: 'Proyectos' }},
            { path: 'funciones', component: FuncionesComponent, data: { titulo: 'Funciones Asignadas' }},
            { path: 'clasifactividades', component: ClasificacionesActividadesComponent, data: { titulo: 'Clasificación de actividades' }},
            { path: 'agenteia', component: AgenteiaComponent, data: { titulo: 'AgenteIA.AR' }},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }



