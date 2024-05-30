import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.component.html',
    styles: [
    ]
})
export class ConfiguracionComponent {

    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Configuración";

    constructor() {

    }

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });

    }

}
