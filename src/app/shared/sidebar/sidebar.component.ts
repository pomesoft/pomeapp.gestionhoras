import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/entity.models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [
    ]
})
export class SidebarComponent implements OnInit {

    public usuario: Usuario;
    public menuItems: any[];

    public isCollapsedListados = false;

    public userAdmin: boolean = false;

    constructor(
        private sidebarService: SidebarService,
        private usuarioService: UsuarioService
    ) {

        this.menuItems = sidebarService.menu;
        this.usuario = usuarioService.usuario;
    }

    async ngOnInit() {
        this.usuarioService.validaRolUserAdministrador()
            .subscribe(esAdmin => this.userAdmin = esAdmin);
    }

    logout() {
        this.usuarioService.logout();
    }
}
