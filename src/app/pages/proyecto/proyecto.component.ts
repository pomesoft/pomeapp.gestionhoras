import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, tap } from 'rxjs';
import { NgbCalendar, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClientes, cargarProyectos, cargarUsuarios } from '../../store/actions';

import { UsuarioService } from '../../services/usuario.service';
import { ProyectosService } from '../../services/proyectos.service';
import { UsuarioProyectosService } from '../../services/usuario-proyectos.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { HelpersService } from '../../services/helpers.service';

import { Cliente, Proyecto, ResponseApi, TipoProyecto, Usuario, UsuarioProyecto } from '../../models/entity.models';

@Component({
    selector: 'app-proyecto',
    templateUrl: './proyecto.component.html',
    styles: [
    ]
})
export class ProyectoComponent implements OnInit, AfterContentInit, OnDestroy {
    public tituloFormulario: string = 'Proyecto'

    public procesando: boolean = false;

    public mostrarAgregarUsuario: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;
    clientesSubs: Subscription;
    usuariosSubs: Subscription;

    clientes: Cliente[] = [];
    tiposProyecto: TipoProyecto[];
    usuarios: Usuario[] = [];
    usuariosAnalistas: Usuario[] = [];

    usuariosProyectos: Usuario[] = [];

    listarVigentes: boolean = true;

    formatterCliente = (item: Cliente) => (item ? item.Nombre : '');
    formatterUsuario = (item: Usuario) => (item ? item.ItemList : '');

    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly Cliente[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clientes.filter((item) => new RegExp(term, 'mi').test(item.Nombre))
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
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList))
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
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList))
                ));
    };


    @ViewChild('instanceUsuarioProyecto', { static: true }) instanceUsuarioProyecto: NgbTypeahead;
    focusUsuarioProyecto$ = new Subject<string>();
    clickUsuarioProyecto$ = new Subject<string>();

    searchUsuarioProyecto: OperatorFunction<string, readonly Usuario[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuarioProyecto$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$)
            .pipe(
                map((term) => this.usuariosAnalistas.filter((item) => new RegExp(term, 'mi').test(item.ItemList))
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
        private usuarioService: UsuarioService,
        private helperService: HelpersService,
        private usuarioProyectosServices: UsuarioProyectosService,
    ) {

        this.crearFormulario();
        this.setearEventosControles();
    }

    ngOnInit(): void {

        this.tiposProyecto = this.datosServcice.tiposProyecto;

        this.usuariosSubs = this.store.select('usuarios')
            .subscribe(({ usuarios, loaded }) => {
                this.usuarios = usuarios;                
                if (loaded) {
                }
            });

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes;
            });

        this.datoSubs = this.store.select('proyectos')
            .subscribe(({ proyecto, listarVigentes }) => {
                this.listarVigentes = listarVigentes;
                this.setearFormulario(proyecto);
            });

    }

    ngAfterContentInit(): void {
        this.store.dispatch(cargarClientes({ listarVigentes: true, usuarioId: -1 }));
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
            UsuarioProyectoSeleccionado: [{}],
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



    private async setearFormulario(dato: Proyecto) {

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
                UsuarioProyectoSeleccionado: {},
            });

            await this.cargarUsuariosProyecto(dato.Id);

        } else {

            this.formulario.reset({
                Id: 0,
                Codigo: '',
                Descripcion: '',
                DiaCierre: 25,
                Vigente: true,
                TipoProyectoId: 0,
                Cliente: {},
                LiderProyecto: {},
                LiderProyectoBackup: {},
                UsuarioProyectoSeleccionado: {},
            });

            this.usuariosProyectos = [];

        }

        this.cargarUsuariosAnalistas();

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


        var proyectoActualizar: Proyecto = this.formulario.value;
        proyectoActualizar.UsuariosAsignados = this.usuariosProyectos;

        this.datosServcice.actualizar(proyectoActualizar)
            .subscribe({
                next: (response: ResponseApi) => {

                    if (response.OK) {
                        this.swalService.setToastOK();
                        this.modalService.dismissAll('SAVE_PROYECTO');
                    } else {
                        this.swalService.setSwalFireError(response.Mensaje);
                    }

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

        this.formulario.get('LiderProyecto').valueChanges.subscribe(valor => {

            // console.log('LiderProyecto', valor);

        });

        this.formulario.get('LiderProyectoBackup').valueChanges.subscribe(valor => {

            //console.log('LiderProyectoBackup', valor);
            if (valor == null) {
                this.formulario.get('LiderProyectoBackup').setValue({}, { onlySelf: false, });
            }

        });
    }


    onClickMostrarAgregarUsuario() {
        this.formulario.get('UsuarioProyectoSeleccionado').setValue({}, { onlySelf: false, });
        this.mostrarAgregarUsuario = true;
    }

    async onClickAgregarUsuario() {
        if (this.formulario.get('UsuarioProyectoSeleccionado').value) {

            var userSeleccionado: Usuario = this.formulario.get('UsuarioProyectoSeleccionado').value;
            if (this.usuariosProyectos.filter(item => item.Id == userSeleccionado.Id).length > 0)
                return;

            var _proyectoId = +this.formulario.get('Id').value;
            if (_proyectoId > 0) {
                //si ya está creado el proyecto se guarda el usuario de la base de datos, despues el POST no actualiza nbada
                var result = await this.guardarUsuarioProyecto(_proyectoId, userSeleccionado.Id);
            }

            this.usuariosProyectos.push(userSeleccionado);
            this.usuariosProyectos.sort((a, b) => a.ItemList.localeCompare(b.ItemList));

            this.formulario.get('UsuarioProyectoSeleccionado').setValue({}, { onlySelf: false, });
            this.cargarUsuariosAnalistas();

        }
    }


    cargarUsuariosProyecto(proyectoId) {
        return new Promise<boolean>((resolve, reject) => {
            this.datosServcice.listarUsuariosPorProyecto(proyectoId)
                .subscribe({
                    next: (response: Usuario[]) => {
                        this.usuariosProyectos = response;
                        this.usuariosProyectos.sort((a, b) => a.ItemList.localeCompare(b.ItemList));
                        resolve(true);
                    },
                    error: (error) => reject(<any>error)
                });
        });
    }

    async onClickEliminarUsuario(
        event: any,
        user: Usuario
    ) {

        var index: number = this.usuariosProyectos.findIndex(item => item.Id == user.Id);
        if (index >= 0) {

            var _proyectoId = +this.formulario.get('Id').value;

            if (_proyectoId > 0) {
                //si ya está creado el proyecto se elimina el usuario de la base de datos
                var result = await this.eliminarUsuarioProyecto(_proyectoId, user.Id);
            }

            this.usuariosProyectos.splice(index, 1);
            this.cargarUsuariosAnalistas();
        }

    }

    cargarUsuariosAnalistas() {

        var userPL: Usuario = this.formulario.get('LiderProyecto').value;
        var userPLB: Usuario = this.formulario.get('LiderProyectoBackup').value;

        this.usuariosAnalistas = [];
        this.usuarios.forEach(user => {

            var esPL = userPL ? (userPL.Id == user.Id) : false;
            var esPLB = userPLB ? (userPLB.Id == user.Id) : false;
            var estaAsignado = this.usuariosProyectos.findIndex(item => item.Id == user.Id) > 0;

            if (!esPL && !esPLB && !estaAsignado) {
                this.usuariosAnalistas.push(user);
            }
        });
    }

    guardarUsuarioProyecto(
        proyectoId: number,
        usuarioId: number,
    ) {
        return new Promise<boolean>((resolve, reject) => {
            const data: UsuarioProyecto = {
                Id: 0,
                UsuarioId: usuarioId,
                ProyectoId: proyectoId,
            }
            this.usuarioProyectosServices.actualizar(data)
                .subscribe({
                    next: (response: Proyecto) => resolve(true),
                    error: (error) => reject(<any>error)
                });
        });
    }

    eliminarUsuarioProyecto(
        proyectoId: number,
        usuarioId: number
    ) {
        return new Promise<boolean>((resolve, reject) => {
            const data: UsuarioProyecto = {
                Id: 0,
                UsuarioId: usuarioId,
                ProyectoId: proyectoId,
            }
            this.usuarioProyectosServices.eliminar(data)
                .subscribe({
                    next: (response: Proyecto) => resolve(true),
                    error: (error) => reject(<any>error)
                });
        });
    }
}

