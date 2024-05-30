import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class RoladminGuard implements CanActivate {

    constructor( private usuarioService: UsuarioService ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.usuarioService.validaRolUserAdministrador();
    }

}
