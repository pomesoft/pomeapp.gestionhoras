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
            { path: 'asignacion', component: PlanningComponent, data: { titulo: 'Asignación' } },
            { path: 'configuracion', component: ConfiguracionComponent, data: { titulo: 'Configuración' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }



