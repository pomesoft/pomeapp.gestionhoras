import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { SwalhelperService } from '../../services/swalhelper.service';

@Component({
    selector: 'app-accesocliente',
    templateUrl: './accesocliente.component.html',
    styles: [
    ]
})
export class AccesoclienteComponent implements OnInit, OnDestroy {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usuarioService: UsuarioService,
        public swalService: SwalhelperService,
    ) {

    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {

            this.usuarioService.validarUsuarioKey(params.key)
                .subscribe({
                    next: (keyOK) => {
                        if (keyOK) {
                            this.router.navigate(['/home/ctacte']);
                        }
                    },
                    error: (error) => this.swalService.setToastError(error),
                });
                
        });
    }

    ngOnDestroy(): void {

        }

}
