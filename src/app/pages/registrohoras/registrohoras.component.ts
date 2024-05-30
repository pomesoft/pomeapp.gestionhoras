import { Component } from '@angular/core';
import { timer } from 'rxjs';



@Component({
    selector: 'app-registrohoras',
    templateUrl: './registrohoras.component.html',
    styles: [
    ]
})
export class RegistrohorasComponent {

    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Registro de Horas";

    constructor() {}

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });

    }

}
