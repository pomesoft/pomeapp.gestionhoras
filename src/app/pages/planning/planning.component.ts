import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styles: [
  ]
})
export class PlanningComponent {

  cargando: boolean = true;
  error: boolean = false;

  countdown$ = timer(500);

  tituloFormulario: string = "Planning";

  constructor() {


  }

  ngOnInit(): void {

      this.countdown$.subscribe(() => {
          this.cargando = false;
      });

  }

}
