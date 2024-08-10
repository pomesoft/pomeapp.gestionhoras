import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs';


import { ProyectosService } from '../../services/proyectos.service';
import { ClientesService } from 'src/app/services/clientes.service';

import { Proyecto, RegistroHora } from '../../models/entity.models';

@Component({
    selector: 'app-reportetimesheet',
    templateUrl: './reportetimesheet.component.html',
    styles: [
    ]
})
export class ReportetimesheetComponent implements OnInit, OnDestroy {
    cargando: boolean = false;
    error: boolean = false;
    hayDatos: boolean = false;

    tituloFormulario: string = "Reporte de Horas";
    proyectosCliente: Proyecto[];

    proyectoSeleccionado: Proyecto;

    cliente: any;
    clientes: string[] = [];
    proyecto: any;
    proyectos: string[] = [];

    listado: RegistroHora[];

    anioPrestacion: number = 2024;
    totalHoras: number = 0;

    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.clientes : this.clientes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };


    @ViewChild('instanceProyecto', { static: true }) instanceProyecto: NgbTypeahead;
    focusProyecto$ = new Subject<string>();
    clickProyecto$ = new Subject<string>();

    searchProyecto: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProyecto$.pipe(filter(() => false));
        const inputFocus$ = this.focusProyecto$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.proyectos : this.proyectos.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };


    constructor(
        private proyectoService: ProyectosService,
        private clienteService: ClientesService,
    ) { }

    ngOnInit(): void {
        this.clientes = [];

    }

    ngOnDestroy(): void {
    }

    onChangeCliente(event) {

        this.proyectos = this.proyectoService.proyectos
            .filter(item => item.Cliente.Nombre === event)
            .map(item => item.Descripcion);

        if (this.proyectos.length == 1) {
            this.proyecto = this.proyectos[0];
            this.onChangeProyecto(this.proyecto);
        }

    }

    onClickLimpiarCliente(event: any) {
        this.cliente = '';
        this.onClickLimpiaProyecto(event);
    }


    onChangeProyecto(event) {
        this.proyectoSeleccionado = this.proyectoService.proyectos.find(item => item.Descripcion == event);
        //TODO: acá se hace el get de las horas registrados para el proyecto seleccionado "this.proyectoSeleccionado.Id"
        this.listado = [];

        this.totalHoras = 0;
        this.listado.forEach(item => this.totalHoras += item.Horas);

        this.hayDatos = this.proyectoSeleccionado != null;
    }

    onClickLimpiaProyecto(event: any) {
        this.proyecto = '';
        this.listado = [];
        this.totalHoras = 0;
        this.proyectoSeleccionado = null;
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        input.select();
    }
}
