import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable, startWith, map } from 'rxjs';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarProyecto, cargarProyectos } from '../../store/actions';

import { Proyecto, ResponseApi } from '../../models/entity.models';

import { ProyectosService } from '../../services/proyectos.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styles: [
    ]
})
export class ProyectosComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = false;
    tituloFormulario: string = 'Proyectos';

    error: any;
    textoBusqueda: string = '';

    datosSubs: Subscription;

    listadoFULL: Proyecto[];
    listado$: Observable<Proyecto[]>;
    listarVigentes: boolean = true;
    listarNoVigentes: boolean = false;

    page: number = 1;
    pageSize: number = 15;
    total: number = 0;

    filtro = new FormControl('', { nonNullable: true });

    search(text: string): Proyecto[] {

        var listReturn = this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Codigo && item.Codigo.toLowerCase().includes(term) ||
                item.Descripcion && item.Descripcion.toLowerCase().includes(term) ||
                item.Cliente && item.Cliente.Nombre.toLowerCase().includes(term) ||
                item.LiderProyecto && item.LiderProyecto.ItemList.toLowerCase().includes(term)
            );
        });

        this.total = listReturn.length;

        return listReturn;
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private datosServcice: ProyectosService,
        private usuarioService: UsuarioService,
    ) {
        // customize default values of paginations used by this component tree
        config.size = 'sm';
        config.boundaryLinks = true;

        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))
                .slice(
                    (this.page - 1) * this.pageSize,
                    (this.page - 1) * this.pageSize + this.pageSize,
                )),
        );
    }

    ngOnInit(): void {
        this.datosSubs = this.store.select('proyectos')
            .subscribe(({ proyectos, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.listadoFULL = proyectos;
                this.total = this.listadoFULL.length;
                this.refreshDatos();
            });
    }

    ngAfterContentInit(): void {
        this.cargando = true;
        this.dispatchCargarProyectos();
    }

    ngOnDestroy(): void {
        this.datosSubs.unsubscribe();
    }

    ngChangeListarVigentes(opcion: number) {
        this.listarVigentes = (opcion == 1);
        this.listarNoVigentes = (opcion == 2);
        this.dispatchCargarProyectos();
    }

    dispatchCargarProyectos() {
        if (this.usuarioService.usuario.Rol.NivelAcceso == 10) {
            this.store.dispatch(cargarProyectos({ listarVigentes: this.listarVigentes, usuarioId: this.usuarioService.usuario.Id }));
        } else {
            this.store.dispatch(cargarProyectos({ listarVigentes: this.listarVigentes, usuarioId: -1 }));
        }
    }


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    onClickAbriModal(event, content, id) {
        event.preventDefault();

        this.store.dispatch(cargarProyecto({ id: id }));

        this.modalService.open(content, { size: 'xl', centered: true }).result
            .then(
                (result) => {
                    console.log(`modalService=>Closed with: ${result}`);
                },
                (reason) => {
                    if (reason == 'SAVE_PROYECTO') {
                        this.dispatchCargarProyectos();
                    }
                },
            );
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
            title: `Desactivar Proyecto`,
            text: `¿Desea desactivar a ${item.Descripcion}?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Desactivar',
        }).then((result) => {

            if (result.isConfirmed) {
                this.cargando = true;

                item.Vigente = false;
                this.datosServcice.actualizar(item)
                    .subscribe({
                        next: (response: ResponseApi) => {

                            if (response.OK) {
                                this.dispatchCargarProyectos();
                                this.swalService.setToastOK();
                            } else {
                                this.swalService.setSwalFireError(response.Mensaje);
                            }                            
                            this.cargando = false;
                        },
                        error: (error) => this.swalService.setToastError(error),
                        complete: () => this.cargando = false,
                    });
            }

        });
    }
}

