import { Component, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../store/app.reducers';

import { Usuario } from '../../models/entity.models';
import { UsuarioService } from '../../services/usuario.service';
import { setTareaRegistroHoras } from 'src/app/store/actions';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [
    ]
})
export class HeaderComponent {

    public usuario: Usuario;

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private offcanvasService: NgbOffcanvas,
        private usuarioService: UsuarioService,
    ) {
        this.usuario = usuarioService.usuario;
    }

    logout() {
        this.usuarioService.logout();
    }

    onClickAbrirOffcanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'start', panelClass: 'filtros-panel' });
    }

    onClickCargarHoras(
        event: any,
        tareaId: number,
        proyectoId: number,
    ) {
        console.log(proyectoId);
        event.preventDefault();
        this.store.dispatch(setTareaRegistroHoras({ tareaId: tareaId, proyectoId: proyectoId }));
        this.router.navigate(['/home/registrohoras']);
    }

}
