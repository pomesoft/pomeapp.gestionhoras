import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

declare global {
    interface Window {
        botpress: any;
    }
}

@Component({
    selector: 'app-agenteia',
    templateUrl: './agenteia.component.html',
    styles: [`
  `]
})
export class AgenteiaComponent implements OnInit, OnDestroy {

    tituloFormulario: string = 'AgenteIA.AR - Asistente con IA';

    constructor() { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
      }
    
      
}

