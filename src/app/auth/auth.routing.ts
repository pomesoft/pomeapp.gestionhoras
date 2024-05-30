import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccesoclienteComponent } from './accesocliente/accesocliente.component';
import { RestablecerComponent } from './restablecer/restablecer.component';

const routes: Routes = [

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'accesocliente', component: AccesoclienteComponent },
    { path: 'restablecer', component: RestablecerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
