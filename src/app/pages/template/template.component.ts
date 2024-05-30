import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styles: [
    ]
})
export class TemplateComponent implements OnInit {

    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Template";

    constructor() {

    }

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });

    }

}
