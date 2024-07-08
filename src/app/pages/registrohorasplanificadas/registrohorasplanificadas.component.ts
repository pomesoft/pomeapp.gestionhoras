import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../store/app.reducers';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectoService } from '../../services/proyecto.service';

import { Cliente, Profesional, Proyecto } from '../../models/entity.models';


declare var $: any;

@Component({
    selector: 'app-registrohorasplanificadas',
    templateUrl: './registrohorasplanificadas.component.html',
    styles: [
    ]
})
export class RegistrohorasplanificadasComponent implements OnInit, OnDestroy {
    listadoFULL: Proyecto[] = [];
    listado$: Observable<Proyecto[]>;
    hayDatos: boolean = false;
    proyectoSeleccionado: Proyecto;
    proyectoId: number = -1;

    registroHorasSubs: Subscription;

    mostrarBtnNovigentes: boolean = true;

    filtro = new FormControl('', { nonNullable: true });

    profesional: any;
    listadoProfesionales: string[] = [];
    cliente: any;
    clientes: string[] = [];
    proyecto: any;
    proyectos: string[] = [];

    periodo: number = 1;

    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchProfesional: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.listadoProfesionales : this.listadoProfesionales.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                return [...new Set(datos)];
            }),
        );
    };


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
        private store: Store<AppState>,
        private proyectoService: ProyectoService,
        private swalService: SwalhelperService,
    ) {
        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))
                // .slice(
                //     (this.page - 1) * this.pageSize,
                //     (this.page - 1) * this.pageSize + this.pageSize,
                // )
            ),
        );
        this.refreshDatos();

    }

    ngOnInit(): void {

        this.registroHorasSubs = this.store.select('registroHoras')
            .subscribe(({ proyectoId }) => {
                this.proyectoId = proyectoId;
            });

        this.listadoFULL = this.proyectoService.proyectos;
        this.listadoProfesionales = this.proyectoService.profesionales.map(item => item.Apellido + '' + item.Nombre);
        this.clientes = this.proyectoService.clientes.map(item => item.Nombre);

        this.profesional = 'APELLIDO 1 NOMBRE 1';
    }

    ngOnDestroy(): void {

    }

    search(text: string): Proyecto[] {
        this.hayDatos = false;
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();

            return item.Descripcion.toLowerCase().includes(term) ||
                item.Cliente.Nombre.toLowerCase().includes(term) ||
                item.Producto.Descripcion.toLowerCase().includes(term) ||
                item.Tipo.Descripcion.toLowerCase().includes(term);
        });
    }


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }


    onClickListarProyectos(event: any) {
        if (this.listadoFULL.length > 0) {
            if (this.proyectoId > 0) {
                this.proyectoSeleccionado = this.listadoFULL.find(item => item.Id === this.proyectoId);
            } else {
                this.proyectoSeleccionado = this.listadoFULL[0];
            }
        }
        this.refreshDatos();
    }

    onClickLimpiarProfesional(event: any) {
        event.preventDefault();
        this.profesional = '';
        this.cliente = '';
        this.proyectoSeleccionado = null;
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
        event.preventDefault();
        this.cliente = '';
        this.onClickLimpiaProyecto(event);
    }

    onChangeProyecto(event) {
        console.log('onChangeProyecto(event)', event);
        this.proyectoSeleccionado = this.listadoFULL.find(item => item.Descripcion == event);
        this.hayDatos = this.proyectoSeleccionado != null;
    }


    onClickLimpiaProyecto(event: any) {
        event.preventDefault();
        this.proyecto = '';
        this.proyectoSeleccionado = null;
    }

    onClickSeleccionarProyecto(
        event: any,
        proyecto: Proyecto
    ) {
        event.preventDefault();
        this.proyectoSeleccionado = proyecto;
    }

    onClickAbrirProyectoModal(event: any) {
        event.preventDefault();
    }

    onClickGuardar(event: any) {
        this.swalService.setToastOK();
    }

    onClickPeriodo(value: number) {
        this.periodo = value;
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        input.select();
    }

    onKeyPress(event: KeyboardEvent, controlFocus: string) {

        console.log('event', event);

        if (event.keyCode == 13) {

            $('#' + controlFocus).focus();
            $('#' + controlFocus).select();

            event.preventDefault();
        }
    }

    onKeyPressInputHoras(event: KeyboardEvent, contorlId: number) {

        if (event.keyCode == 13) {

            $('#inputHoras_' + (contorlId + 1).toString()).focus();
            $('#inputHoras_' + (contorlId + 1).toString()).select();

            event.preventDefault();
        }
    }

    trackByFn(index, item) {
        return index;
    }

}
