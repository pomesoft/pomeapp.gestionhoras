import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbOffcanvas, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { Usuario } from '../../models/entity.models';
import { UsuarioService } from '../../services/usuario.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [
    ]
})
export class HeaderComponent {

    public usuario: Usuario;

    constructor(        
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
}
