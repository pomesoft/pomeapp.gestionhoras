import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/entity.models';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styles: [
    ]
})
export class SidebarMenuComponent {

    public usuario: Usuario;
    public menuItems: any[];

    public isCollapsedListados = false;

    public isCollapsedConfiguracion = true;

    public userAdmin: boolean = false;

    @Input() esMobile: boolean = false;

    constructor(
        private router: Router,
        private offcanvasService: NgbOffcanvas,
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
        if(this.esMobile){
            this.offcanvasService.dismiss();
        }
    }

    onClickItemMenu(url: string) {
        this.router.navigate([`/home/${url}`]);
        if(this.esMobile){
            this.offcanvasService.dismiss();
        }
    }
}
