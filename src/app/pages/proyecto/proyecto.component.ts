import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { NgbCalendar, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarProyectos } from '../../store/actions';

import { Proyecto, TipoProyecto } from '../../models/entity.models';
import { ProyectoService } from '../../services/proyecto.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
    selector: 'app-proyecto',
    templateUrl: './proyecto.component.html',
    styles: [
    ]
})
export class ProyectoComponent implements OnInit, OnDestroy {
    public tituloFormulario: string = 'Proyecto'

    public procesando: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;
    clientesSubs: Subscription;

    clientes: string[] = [];
    tiposProyecto: TipoProyecto[];

    usuarios: string[] = [];

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
                    var datos = (term === '' ? this.clientes : this.clientes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 15);
                    return [...new Set(datos)];
                }),
            );
    };

    @ViewChild('instanceUsuarioPL', { static: true }) instanceUsuarioPL: NgbTypeahead;
    focusUsuarioPL$ = new Subject<string>();
    clickUsuarioPL$ = new Subject<string>();

    searchUsuarioPL: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuarioPL$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.usuarios : this.usuarios.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                return [...new Set(datos)];
            }),
        );
    };

    @ViewChild('instanceUsuarioPLB', { static: true }) instanceUsuarioPLB: NgbTypeahead;
    focusUsuarioPLB$ = new Subject<string>();
    clickUsuarioPLB$ = new Subject<string>();

    searchUsuarioPLB: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuarioPLB$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.usuarios : this.usuarios.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                return [...new Set(datos)];
            }),
        );
    };

    get codigoNoValido() {
        return this.formulario.get('codigo').invalid && this.formulario.get('codigo').touched
    }
    get clienteNoValido() {
        return this.formulario.get('cliente').invalid && this.formulario.get('cliente').touched;
    }
    get idTipoProyectoNoValido() {
        return this.formulario.get('idTipoProyecto').invalid && this.formulario.get('idTipoProyecto').touched;
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private calendar: NgbCalendar,
        private swalService: SwalhelperService,
        private datosServcice: ProyectoService,
        private helperService: HelpersService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {

        this.tiposProyecto = this.datosServcice.tiposProyecto.map(item => item);
        this.usuarios = this.datosServcice.profesionales.map(item => item.Apellido + '' + item.Nombre);

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes.map(item => item.Nombre);
            });

        this.datoSubs = this.store.select('proyectos')
            .subscribe(({ proyecto}) => {                
                this.setearFormulario(proyecto);
            });

    }

    ngOnDestroy(): void {
        this.datoSubs.unsubscribe();
        this.clientesSubs.unsubscribe();
    }

    private crearFormulario() {
        var fecha = {
            year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };

        this.formulario = this.formBuilder.group({
            id: [-1],
            codigo: ['', Validators.required],
            descripcion: [''],
            idTipoProyecto: [0, [Validators.required, Validators.min(1)]],
            cliente: ['', Validators.required],
            producto: ['', Validators.required],
            fechaInicioNgDateStruct: [fecha],
            fechaInicio: [this.helperService.parserNgDateStruct(fecha), Validators.required],
            fechaFinNgDateStruct: [null],
            fechaFin: [''],
            diaCierre: [30],
            usuarioPL: [''],
            usuarioPLB: [''],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key != 'id' && key != 'idTipoProyecto' && key != 'diaCierre' && key.indexOf('fecha') < 0) {
                //console.log('key', key);
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }



    private setearFormulario(dato: Proyecto) {


        if (dato) {

            const _fechaInicioNgDateStruct = {
                year: new Date(dato.FechaInicio).getFullYear(),
                month: new Date(dato.FechaInicio).getMonth() + 1,
                day: new Date(dato.FechaInicio).getDate(),
            };

            let _fechaFinNgDateStruct = null;
            if (dato.FechaFin) {
                _fechaFinNgDateStruct = {
                    year: new Date(dato.FechaInicio).getFullYear(),
                    month: new Date(dato.FechaInicio).getMonth() + 1,
                    day: new Date(dato.FechaInicio).getDate(),
                };
            }

            this.formulario.reset({
                id: dato.Id,
                codigo: dato.Codigo,
                descripcion: dato.Descripcion,
                idTipoProyecto: dato.Tipo ? dato.Tipo.Id : '',
                cliente: dato.Cliente ? dato.Cliente.Nombre : '',
                producto: '',
                fechaInicioNgDateStruct: _fechaInicioNgDateStruct,
                fechaInicio: this.helperService.parserDate(dato.FechaInicio),
                fechaFinNgDateStruct: _fechaFinNgDateStruct,
                fechaFin: dato.FechaFin ? this.helperService.parserDate(dato.FechaFin) : null,
                diaCierre: [dato.DiaCierre],
                usuarioPL: '',
                usuarioPLB: '',
            });
        } else {

            var fecha = {
                year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
                month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
                day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
            };

            this.formulario.reset({
                id: -1,
                descripcion: '',
                idTipoProyecto: 0,
                cliente: '',
                producto: '',
                fechaInicioNgDateStruct: fecha,
                fechaInicio: this.helperService.parserNgDateStruct(fecha),
                fechaFinNgDateStruct: null,
                fechaFin: '',
            });
        }
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

        this.datosServcice.actualizar(this.formulario.value)
            .subscribe({
                next: (response: Proyecto) => {
                    this.store.dispatch(cargarProyectos());
                    this.swalService.setToastOK();
                    this.modalService.dismissAll();
                },
                error: (error) => this.swalService.setToastError(error)
            });

    }

    onClickCerrar() {
        this.modalService.dismissAll();
    }

    onClickLimpiarTypeahead(
        controlName: string,
    ) {
        this.formulario.get(controlName).setValue('', { onlySelf: true, });
    }

    onClickAgregar(
        controlName: string,
    ) {
        this.swalService.setSwalFireOk(`Se podrá agregar un nuevo ${controlName}`);
    }
}

