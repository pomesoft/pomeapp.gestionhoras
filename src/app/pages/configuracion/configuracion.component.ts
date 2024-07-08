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

    tituloFormulario: string = "Configuración del sistema";


    menu: any[] = [
        { titulo: 'Profesionales', href: 'profesionales', component: 'app-profesionales' },
        { titulo: 'Clientes', href: 'clientes', component: 'app-clientes' },
        { titulo: 'Proyectos', href: 'proyectos' , component: 'app-proyectos'},
    ];

    constructor() {

    }

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });

    }

}
