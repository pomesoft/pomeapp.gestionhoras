import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, startWith } from 'rxjs';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarProyectos, cargarClientes } from 'src/app/store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';
import { Cliente, Proyecto, UsuarioProyecto } from '../../models/entity.models';
import { UsuarioProyectosService } from '../../services/usuario-proyectos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
    selector: 'app-misproyectos',
    templateUrl: './misproyectos.component.html',
    styles: [
    ]
})
export class MisproyectosComponent implements OnInit, AfterContentInit, OnDestroy {

    tituloFormulario: string = "Configuración de Mis Proyectos";

    cargando: boolean = true;
    procesando: boolean = false;
    error: boolean = false;

    filtro = new FormControl('', { nonNullable: true });


    proyectosSubs: Subscription;
    proyectosFULL: Proyecto[] = [];
    proyectos$: Observable<Proyecto[]>;
    misProyectos: Proyecto[] = [];

    clienteSeleccionado: Cliente;
    clientesSubs: Subscription;
    clientes: Cliente[] = [];
    formatterCliente = (item: Cliente) => (item && item.Nombre) ? item.Nombre : '';

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

    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private usuarioService: UsuarioService,
        private proyectoService: ProyectosService,
        private usuarioProyectosServices: UsuarioProyectosService,
        private swalService: SwalhelperService,
    ) {

        this.proyectos$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))),
        )

    }

    ngOnInit(): void {
        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes;
            });

        this.proyectosSubs = this.store.select('proyectos')
            .subscribe(({ proyectos, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.proyectosFULL = proyectos;
            });

        this.cargarMisProyectos();

    }
    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarProyectos({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarClientes({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
    }
    ngOnDestroy(): void {
        this.clientesSubs.unsubscribe();
        this.proyectosSubs.unsubscribe();
    }

    search(text: string): Proyecto[] {
        return this.proyectosFULL.filter((item) => {
            const term = text.toLowerCase();
            return this.clienteSeleccionado && item.Cliente.Id == this.clienteSeleccionado.Id;
        });
    }

    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    onChangeCliente(event) {

        if (event && event.Id) {
            this.refreshDatos();
        }
    }

    onClickLimpiarCliente(event: any) {
        this.clienteSeleccionado = null;
        this.refreshDatos();
    }

    async onClickAgregarAMisProyecto(
        event: any,
        proyectoId: number
    ) {
        event.preventDefault();

        await this.guardarMiProyecto(proyectoId)
            .then(result => {
                return this.cargarMisProyectos();
            }).catch(err => {
                this.swalService.setToastError(`Ocurrió un error al cargar los datos`);
                console.log(err);
            });

    }


    guardarMiProyecto(
        proyectoId: number
    ) {
        return new Promise<boolean>((resolve, reject) => {
            const data: UsuarioProyecto = {
                Id: 0,
                UsuarioId: this.usuarioService.usuario.Id,
                ProyectoId: proyectoId,
            }

            this.usuarioProyectosServices.actualizar(data)
                .subscribe({
                    next: (response: Proyecto) => resolve(true),
                    error: (error) => reject(<any>error)
                });
        });
    }

    cargarMisProyectos() {
        return new Promise<boolean>((resolve, reject) => {
            this.proyectoService.listarPorUsuario(this.usuarioService.usuario.Id)
                .subscribe({
                    next: (response: Proyecto[]) => {
                        this.misProyectos = response;
                        resolve(true);
                    },
                    error: (error) => reject(<any>error)
                });
        });
    }

    onClickEliminar(
        event: any,
        item: Proyecto
    ) {
        event.preventDefault();


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger m-2 p-2',
                cancelButton: 'btn btn-secondary m-2 p-2',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
            title: `Mis proyectos`,
            text: `¿Desea quitar ${item.Codigo} de mis proyectos?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Quitar',
        }).then((result) => {

            if (result.isConfirmed) {
                
                const data: UsuarioProyecto = {
                    Id: 0,
                    UsuarioId: this.usuarioService.usuario.Id,
                    ProyectoId: item.Id,
                }
                
                this.usuarioProyectosServices.eliminar(data)
                    .subscribe({
                        next: () => {                                                        
                            this.swalService.setToastOK();
                            this.cargarMisProyectos();
                        },
                        error: (error) => {
                            this.swalService.setToastError(`Ocurrió un error al cargar los datos`);
                            console.log(error);
                        }
                    });
            }

        });
    }


}
