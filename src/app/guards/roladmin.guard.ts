import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class RoladminGuard  {

    constructor( private usuarioService: UsuarioService ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.usuarioService.validaRolUserAdministrador();
    }

}
