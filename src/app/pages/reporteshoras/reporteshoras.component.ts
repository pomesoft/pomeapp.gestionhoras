import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-reporteshoras',
    templateUrl: './reporteshoras.component.html',
    styles: [
    ]
})
export class ReporteshorasComponent {

    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Reporte de Horas";

    constructor() {


    }

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });

    }

}
