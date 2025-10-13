import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../store/app.reducers';
import { cargarClasificacionesActividades, cargarClientes, cargarProyectos, cargarUsuarios } from 'src/app/store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectosService } from '../../services/proyectos.service';
import { UsuarioService } from '../../services/usuario.service';

import { ClasificacionActividad, Cliente, Proyecto, ProyectoFuncion, RegistroHora, RegistroHoraDTO, Usuario } from '../../models/entity.models';
import { HelpersService } from 'src/app/services/helpers.service';
import { RegistroHorasService } from 'src/app/services/registro-horas.service';

import Swal from 'sweetalert2';



@Component({
    selector: 'app-registrohorasplanificadas',
    templateUrl: './registrohorasplanificadas.component.html',
    styles: [
    ]
})
export class RegistrohorasplanificadasComponent implements OnInit, OnDestroy {

    cargando: boolean = false;
    hayDatos: boolean = false;

    filtro = new FormControl('', { nonNullable: true });

    registroHorasSubs: Subscription;
    clientesSubs: Subscription;
    usuariosSubs: Subscription;
    //proyectosSubs: Subscription;
    clasificacionSubs: Subscription;

    //proyectos: Proyecto[];
    proyectosCliente: Proyecto[];
    proyectoId: number = -1;

    clienteSeleccionado: Cliente
    clientesFULL: Cliente[] = [];
    clientes: Cliente[] = [];

    usuarioSeleccionado: Usuario;
    usuarios: Usuario[] = [];

    clasificacionesActividades: ClasificacionActividad[] = [];

    formatterCliente = (item: Cliente) => item.Nombre;
    formatterUsuario = (item: Usuario) => (item.Nombre + ' ' + item.Apellido);

    // listarMisProyectos: boolean = false;
    // misProyectos: Proyecto[] = [];


    fechaDesde: string = '';
    fechaHasta: string = '';

    camposNoValidos: boolean = false;

    periodoFechas: number = 1;
    periodoActual: string = '';

    usuarioDeshabilitado: boolean = false;

    @ViewChild('instanceUsuario', { static: true }) instance: NgbTypeahead;
    focusUsuario$ = new Subject<string>();
    clickUsuario$ = new Subject<string>();

    searchUsuario: OperatorFunction<string, readonly Usuario[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focusUsuario$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$)
            .pipe(
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList)))
            );
    };


    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly Cliente[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clientes.filter((item) => new RegExp(term, 'mi').test(item.Nombre)))
            );
    };


    clasificacionActividadNoValido(clasificacionActividadId: number): boolean {
        return clasificacionActividadId <= 0 && this.camposNoValidos;
    }
    detalleNoValido(detalle: string): boolean {
        return detalle.trim().length == 0 && this.camposNoValidos;
    }
    fecahNoValido(fechaString: string) {
        return fechaString == null && this.camposNoValidos;
    }
    horasNoValido(horas: number) {
        return horas <= 0 && this.camposNoValidos;
    }
    regsitroNoValido(registroHoraDTO: RegistroHoraDTO) {
        var camposOK: boolean = registroHoraDTO.ClasificacionActividadId > 0
            && registroHoraDTO.Detalle.trim().length > 0
            && registroHoraDTO.FechaString != null
            && registroHoraDTO.Horas > 0;
        return !camposOK;
    }


    //
    constructor(
        private store: Store<AppState>,
        private proyectoService: ProyectosService,
        private usuarioService: UsuarioService,
        private swalService: SwalhelperService,
        private helperService: HelpersService,
        private registroHorasService: RegistroHorasService,
    ) {

    }

    ngOnInit(): void {

        this.usuarioSeleccionado = this.usuarioService.usuario;
        this.usuarioDeshabilitado = this.usuarioSeleccionado.Rol.NivelAcceso == 10;
        this.periodoActual = this.helperService.getPeriodoActual();

        this.registroHorasSubs = this.store.select('registroHoras')
            .subscribe(({ proyectoId }) => {
                this.cargando = false;
                this.proyectoId = proyectoId;
            });

        this.usuariosSubs = this.store.select('usuarios')
            .subscribe(({ usuarios, loaded }) => {
                if (loaded) {
                    this.cargando = false;
                    this.usuarios = usuarios;
                }
            });

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes, loaded }) => {
                if (loaded) {
                    this.cargando = false;
                    this.clientes = clientes;
                    this.clientesFULL = clientes;
                    //this.onChangeListaClientesMisProyectos()
                }
            });

        // this.proyectosSubs = this.store.select('proyectos')
        //     .subscribe(({ proyectos, loaded }) => {
        //         if (loaded) {
        //             this.cargando = false;
        //             this.proyectos = proyectos;
        //         }
        //     });

        this.clasificacionSubs = this.store.select('clasificacionesActividades')
            .subscribe(({ clasificacionesActividades, loaded }) => {
                if (loaded) {
                    this.cargando = false;
                    this.clasificacionesActividades = clasificacionesActividades;
                }
            });

        this.fechaDesde = this.helperService.getFechaActual();
        this.fechaHasta = this.helperService.getFechaActual();
    }

    ngAfterContentInit(): void {

        this.store.dispatch(cargarUsuarios());
        this.store.dispatch(cargarClientes({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarProyectos({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarClasificacionesActividades({ listarVigentes: true }));
        //this.cargarMisProyectos();
    }

    ngOnDestroy(): void {
        this.clientesSubs.unsubscribe();
        this.usuariosSubs.unsubscribe();
        //this.proyectosSubs.unsubscribe();
        this.clasificacionSubs.unsubscribe();
    }


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }


    onClickLimpiarUsuario(event: any) {
        event.preventDefault();
        if (!this.usuarioDeshabilitado) {
            this.usuarioSeleccionado = null;
            this.clienteSeleccionado = null;
        }
    }


    onChangeCliente(event: any) {
        if (event && event.Id) {
            this.onRefreshProyectos();
        }
    }

    onChangeListarTodasFunciones() {
        this.proyectosCliente.forEach(proyectoItem => {
            proyectoItem.TotalAsignadas = 0;
            proyectoItem.TotalRegistradas = 0;
            proyectoItem.FuncionesAsignadas.forEach(rolFuncion => {
                proyectoItem.TotalRegistradas += rolFuncion.TotalRegistradas;
                proyectoItem.TotalAsignadas += rolFuncion.Horas;
            });
        });
    }

    // //este metodo filtra todos los clientes de Mis Proyectos
    // onChangeListaClientesMisProyectos() {
    //     this.clienteSeleccionado = null;
    //     this.proyectosCliente = [];
    //     this.clientes = [];
    //     if (this.listarMisProyectos) {
    //         this.misProyectos.forEach(mp => {
    //             if (this.clientes.filter(item => item.Id == mp.Cliente.Id).length == 0) {
    //                 this.clientes.push(mp.Cliente);
    //             }
    //         });
    //         this.clientes.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    //     } else {
    //         this.clientes = this.clientesFULL;
    //     }
    // }

    // cargarMisProyectos() {
    //     return new Promise<boolean>((resolve, reject) => {
    //         this.proyectoService.listarPorUsuario(this.usuarioService.usuario.Id)
    //             .subscribe({
    //                 next: (response: Proyecto[]) => {
    //                     this.misProyectos = response;
    //                     this.listarMisProyectos = (this.misProyectos.length > 0);
    //                     this.onChangeListaClientesMisProyectos()
    //                     resolve(true);
    //                 },
    //                 error: (error) => reject(<any>error)
    //             });
    //     });
    // }

    onChangeHoras(
        event: any,
        rolFuncion: ProyectoFuncion,
    ) {
        this.proyectosCliente.forEach(proyectoItem => {
            var funcion = proyectoItem.FuncionesAsignadas.find(item => item.Id == rolFuncion.Id);
            if (funcion) {
                funcion.TotalRegistradas = 0;
                funcion.RegistroHoras.forEach(item => funcion.TotalRegistradas += item.Horas)
            }
        });

        this.onChangeListarTodasFunciones();
    }



    onRefreshProyectos() {

        if (!this.clienteSeleccionado) return;

        this.cargando = true;
        this.proyectosCliente = [];



        let filtro = {
            ClienteId: this.clienteSeleccionado.Id,
            UsuarioId: this.usuarioSeleccionado.Id,
            FechaDesde: this.helperService.getFechaDate(this.fechaDesde),
            FechaHasta: this.helperService.getFechaDate(this.fechaHasta),
            PeriodoFechas: this.periodoFechas,
        }

        this.proyectoService.listarRegistroHoras(filtro).subscribe({
            next: (proyectos: Proyecto[]) => {

                proyectos.forEach(proyecto => {
                    proyecto.FuncionIdSeleccionada = this.usuarioSeleccionado.Funcion.Id;
                    // if (this.listarMisProyectos) {
                    //     if (this.misProyectos.filter(item => item.Id == proyecto.Id).length > 0) {
                    //         this.proyectosCliente.push(proyecto);
                    //     }
                    // } else {
                        this.proyectosCliente.push(proyecto);
                    //}
                });

                this.onChangeListarTodasFunciones();
            },
            error: (error) => this.swalService.setToastError(error),
            complete: () => this.cargando = false,
        });


    }



    onClickGuardarHoras(
        event: any,
        item: Proyecto
    ) {
        event.preventDefault();
        console.log('Proyecto', item);
    }

    onClickGuardarItem(
        event: any,
        proyectoFuncion: ProyectoFuncion,
        registroHoraDTO: RegistroHoraDTO,
        index: number,
    ) {
        event.preventDefault();

        if (!this.regsitroNoValido(registroHoraDTO)) {

            registroHoraDTO.Fecha = this.helperService.getFechaDate(registroHoraDTO.FechaString);
            this.camposNoValidos = false;

            this.registroHorasService.actualizar(registroHoraDTO)
                .subscribe({
                    next: (response: RegistroHoraDTO) => {
                        if (response) {
                            proyectoFuncion.RegistroHoras[index].Id = response.Id;
                            if (this.ultimoRegistroHora(proyectoFuncion, index)) {
                                this.agregarRegistroHora(proyectoFuncion, registroHoraDTO);
                            }
                        }
                        this.swalService.setToastOK();
                    },
                    error: (error) => this.swalService.setToastError(error)
                });

        } else {
            this.camposNoValidos = true;
        }
    }




    onClickEliminarItem(
        event: any,
        proyectoFuncion: ProyectoFuncion,
        index: number,
    ) {
        event.preventDefault();

        const item = proyectoFuncion.RegistroHoras[index];

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger m-2 p-2',
                cancelButton: 'btn btn-secondary m-2 p-2',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
            title: `Eliminar horas`,
            text: `¿Desea eliminar las horas?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Eliminar',

        }).then((result) => {

            if (result.isConfirmed) {
                this.registroHorasService.eliminar(item.Id)
                    .subscribe({
                        next: () => {
                            proyectoFuncion.RegistroHoras.splice(index, 1);
                            this.onChangeHoras(event, proyectoFuncion);
                            this.swalService.setToastOK();
                        },
                        error: (error) => this.swalService.setToastError(error),
                    });
            }
        });
    }

    ultimoRegistroHora(
        proyectoFuncion: ProyectoFuncion,
        index: number,
    ) {
        return proyectoFuncion.RegistroHoras.length == (index + 1);
    }

    agregarRegistroHora(
        proyectoFuncion: ProyectoFuncion,
        registroHoraDTO: RegistroHoraDTO,
    ) {
        proyectoFuncion.RegistroHoras.push({
            Id: 0,
            Fecha: new Date(this.helperService.getFechaActual()),
            FechaString: this.helperService.getFechaActual(),
            Horas: 0,
            ClasificacionActividadId: 0,
            Detalle: '',
            DiaCierre: registroHoraDTO.DiaCierre,
            Periodo: '',
            UsuarioId: registroHoraDTO.UsuarioId,
            ProyectoId: registroHoraDTO.ProyectoId,
            FuncionAsignadaId: registroHoraDTO.FuncionAsignadaId,
        });
    }

    onClickLimpiarCliente(event: any) {
        event.preventDefault();
        this.clienteSeleccionado = null;
        this.proyectosCliente = [];
    }



    onClickAbrirProyectoModal(event: any) {
        event.preventDefault();
    }

    onClickGuardar(event: any) {
        event.preventDefault();
        this.swalService.setToastOK();
    }

    onClickPeriodo(value: number) {
        this.periodoFechas = value;
        this.onRefreshProyectos();
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        input.select();
    }

    trackByFn(index, item) {
        return index;
    }

    preventNegative(event: KeyboardEvent) {
        if (event.key === '-') {
            event.preventDefault(); // Evita que se ingrese el símbolo negativo
        }
    }

    onChangeFuncion(
        event: any
    ) {

    }
}
