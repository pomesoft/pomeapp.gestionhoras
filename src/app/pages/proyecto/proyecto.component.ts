import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, tap } from 'rxjs';
import { NgbCalendar, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClientes, cargarProyectos, cargarUsuarios } from '../../store/actions';

import { ProyectosService } from '../../services/proyectos.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { HelpersService } from '../../services/helpers.service';

import { Cliente, Proyecto, TipoProyecto, Usuario } from '../../models/entity.models';

@Component({
    selector: 'app-proyecto',
    templateUrl: './proyecto.component.html',
    styles: [
    ]
})
export class ProyectoComponent implements OnInit, AfterContentInit, OnDestroy {
    public tituloFormulario: string = 'Proyecto'

    public procesando: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;
    clientesSubs: Subscription;
    usuariosSubs: Subscription;

    clientes: Cliente[] = [];
    tiposProyecto: TipoProyecto[];
    usuarios: Usuario[] = [];

    formatterCliente = (item: Cliente) => item.Nombre;
    formatterUsuario = (item: Usuario) => (item.Apellido + ' ' + item.Nombre);

    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly Cliente[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clientes.filter((item) => new RegExp(term, 'mi').test(item.Nombre)).slice(0, 10)
                ));
    };


    @ViewChild('instanceUsuarioPL', { static: true }) instanceUsuarioPL: NgbTypeahead;
    focusUsuarioPL$ = new Subject<string>();
    clickUsuarioPL$ = new Subject<string>();

    searchUsuarioPL: OperatorFunction<string, readonly Usuario[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuarioPL$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$)
            .pipe(
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList)).slice(0, 10)
                ));
    };

    @ViewChild('instanceUsuarioPLB', { static: true }) instanceUsuarioPLB: NgbTypeahead;
    focusUsuarioPLB$ = new Subject<string>();
    clickUsuarioPLB$ = new Subject<string>();

    searchUsuarioPLB: OperatorFunction<string, readonly Usuario[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuarioPLB$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$)
            .pipe(
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList)).slice(0, 10)
                ));
    };

    get codigoNoValido() {
        return this.formulario.get('Codigo').invalid && this.formulario.get('Codigo').touched
    }
    get clienteNoValido() {
        return this.formulario.get('Cliente').invalid && this.formulario.get('Cliente').touched;
    }
    get liderProyectoNoValido() {
        return this.formulario.get('LiderProyecto').invalid && this.formulario.get('LiderProyecto').touched;
    }
    get diaCierreNoValido() {
        return this.formulario.get('DiaCierre').invalid && this.formulario.get('DiaCierre').touched
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private calendar: NgbCalendar,
        private swalService: SwalhelperService,
        private datosServcice: ProyectosService,
        private helperService: HelpersService,
    ) {

        this.crearFormulario();
        this.setearEventosControles();
    }

    ngOnInit(): void {

        this.tiposProyecto = this.datosServcice.tiposProyecto;

        this.usuariosSubs = this.store.select('usuarios')
            .subscribe(({ usuarios, loaded }) => {
                if (loaded) {
                    this.usuarios = usuarios;
                }
            });

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes;
            });

        this.datoSubs = this.store.select('proyectos')
            .subscribe(({ proyecto }) => {
                this.setearFormulario(proyecto);
            });

    }

    ngAfterContentInit(): void {
        this.store.dispatch(cargarClientes({ listarVigentes: true }));
        this.store.dispatch(cargarUsuarios());
    }

    ngOnDestroy(): void {
        this.datoSubs.unsubscribe();
        this.clientesSubs.unsubscribe();
        this.usuariosSubs.unsubscribe();
    }

    private crearFormulario() {
       
        this.formulario = this.formBuilder.group({
            Id: [-1],
            Codigo: ['', Validators.required],
            Descripcion: [''],
            DiaCierre: [0, [Validators.required, Validators.min(1)]],
            Vigente: [true],
            TipoProyectoId: [0],
            TipoProyecto: [{}],
            Cliente: [{}, Validators.required],
            LiderProyecto: [{}, Validators.required],
            LiderProyectoBackup: [{}],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key == 'Codigo' || key == 'Descripcion') {
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

            this.formulario.reset({
                Id: dato.Id,
                Codigo: dato.Codigo,
                Descripcion: dato.Descripcion,
                DiaCierre: dato.DiaCierre,
                Vigente: dato.Vigente,
                TipoProyectoId: dato.TipoProyecto ? dato.TipoProyecto.Id : 0,
                Cliente: dato.Cliente,
                LiderProyecto: dato.LiderProyecto,
                LiderProyectoBackup: dato.LiderProyectoBackup,
            });

        } else {

            this.formulario.reset({
                Id: 0,
                Codigo: '',
                Descripcion: '',
                DiaCierre: 25,
                Vigente: true,
                TipoProyectoId: 0,
                Cliente: null,
                LiderProyecto: null,
                LiderProyectoBackup: null,
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
        this.formulario.get(controlName).setValue(null, { onlySelf: true, });
    }

    onClickAgregar(
        controlName: string,
    ) {
        this.swalService.setSwalFireOk(`Se podrá agregar un nuevo ${controlName}`);
    }

    setearEventosControles() {

        this.formulario.get('TipoProyectoId').valueChanges.subscribe(valor => {
            let tipo: TipoProyecto = this.tiposProyecto.find(item => item.Id == valor);
            this.formulario.get('TipoProyecto').setValue(tipo, { onlySelf: true, });
        });

    }
}

