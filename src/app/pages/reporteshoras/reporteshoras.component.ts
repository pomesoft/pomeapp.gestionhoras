import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-reporteshoras',
    templateUrl: './reporteshoras.component.html',
    styles: [
    ]
})
export class ReporteshorasComponent {

    cargando: boolean = false;
    error: boolean = false;
    
    tituloFormulario: string = "Reporte de Horas";

    countdown$ = timer(500);

    constructor(){}

}
