import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';

import { NgbCalendar, NgbDateStruct, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectoService } from '../../services/proyecto.service';
import { HelpersService } from '../../services/helpers.service';

import { Proyecto, TipoProyecto } from '../../models/entity.models';

@Component({
    selector: 'app-registrohorasmanual',
    templateUrl: './registrohorasmanual.component.html',
    styles: [
    ]
})
export class RegistrohorasmanualComponent implements OnInit, OnDestroy {


    procesando: boolean = false;

    formulario: FormGroup;

    fecha: NgbDateStruct;

    profesionales: string[] = [];
    clientes: string[] = [];
    proyectos: string[] = [];

    tiposProyecto: TipoProyecto[] = [];


    get clienteNoValido() {
        return this.formulario.get('cliente').invalid && this.formulario.get('cliente').touched;
    }
    get proyectoNoValido() {
        return this.formulario.get('proyecto').invalid && this.formulario.get('proyecto').touched;
    }
    get tipoProyectoNoValido() {
        return this.formulario.get('tipoProyecto').invalid && this.formulario.get('tipoProyecto').touched;
    }
    get rolFuncionNoValido() {
        return this.formulario.get('rolFuncion').invalid && this.formulario.get('rolFuncion').touched;
    }
    get fechaNoValida() {
        return this.formulario.get('fecha').invalid && this.formulario.get('fecha').touched;
    }
    get horasNoValida() {
        return this.formulario.get('horas').invalid && this.formulario.get('horas').touched;
    }


    @ViewChild('instanceProfesional', { static: true }) instanceProfesional: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchProfesional: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.profesionales : this.profesionales.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
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
        private formBuilder: FormBuilder,
        private calendar: NgbCalendar,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private proyectoService: ProyectoService,
        private helpersService: HelpersService
    ) {

        this.crearFormulario();
        this.setearEventosControles();
    }

    ngOnInit(): void {
        this.profesionales = this.proyectoService.profesionales.map(item => item.Apellido + '' + item.Nombre);
        this.clientes = this.proyectoService.clientes.map(item => item.Nombre);
        this.tiposProyecto = this.proyectoService.tiposProyecto;

    }

    ngOnDestroy(): void {

    }

    private crearFormulario() {

        this.fecha = {
            year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };


        this.formulario = this.formBuilder.group({
            id: [-1],
            profesional: ['APELLIDO 1 NOMBRE 1', Validators.required],
            proyecto: ['', Validators.required],
            tipoProyecto: [''],
            cliente: [''],
            rolFuncion: [0, Validators.required],
            detalle: [''],
            fechaNgDateStruct: [this.fecha, Validators.required],
            fecha: [this.helpersService.parserNgDateStruct(this.fecha)],
            horas: [0, [Validators.required, Validators.min(1)]],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key != 'id' && key != 'cotizacion' && key != 'rolFuncion' && key != 'horas') {
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    private setearFormulario() {

        this.formulario.reset({
            id: -1,
            descripcion: '',
            abreviado: '',
            cotizacion: '',
        });

    }

    onClickGuardar() {
        if (this.formulario.invalid) {

            return Object.values(this.formulario.controls).forEach(control => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                } else {
                    control.markAsTouched();
                }
            });
        }
        this.swalService.setToastOK();

    }

    onClickCerrar() {

    }

    onClickAgregar(
        controlName: string,
    ) {
        this.swalService.setSwalFireOk(`Se podrá agregar un nuevo ${controlName}`);
    }

    onClickLimpiarTypeahead(
        controlName: string,
    ) {
        this.formulario.get(controlName).setValue('', { onlySelf: true, });
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        input.select();
    }


    setearEventosControles() {

        this.formulario.get('cliente').valueChanges.subscribe(valor => {
            this.proyectos = this.proyectoService.proyectos
                .filter(item => item.Cliente.Nombre === valor)
                .map(item => item.Descripcion);

            this.formulario.patchValue({
                proyecto: this.proyectos.length == 1 ? this.proyectos[0] : '',
            }, {
                emitEvent: true
            });
        });

        this.formulario.get('proyecto').valueChanges.subscribe(valor => {

            var _listaux = this.proyectoService.proyectos.filter(item => item.Descripcion === valor);
            this.formulario.patchValue({
                tipoProyecto: _listaux.length == 1 ? _listaux[0].TipoDescripcion : '',
            }, {
                emitEvent: false
            });

        });

    }
}
