import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, startWith, map } from 'rxjs';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarFunciones, cargarFuncion } from '../../store/actions';

import { Funcion } from '../../models/entity.models';

import { SwalhelperService } from '../../services/swalhelper.service';
import { FuncionesService } from '../../services/funciones.service';


@Component({
    selector: 'app-funciones',
    templateUrl: './funciones.component.html',
    styles: [
    ]
})
export class FuncionesComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = false;
    tituloFormulario: string = 'Funciones';

    error: any;
    textoBusqueda: string = '';

    datosSubs: Subscription;

    page: number = 1;
    pageSize: number = 15;
    total: number = 0;

    listadoFULL: Funcion[];
    listado$: Observable<Funcion[]>;

    filtro = new FormControl('', { nonNullable: true });

    listarVigentes: boolean = true;

    search(text: string): Funcion[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Descripcion && item.Descripcion.toLowerCase().includes(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private datosServcice: FuncionesService,
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
        this.refreshDatos();
    }

    ngOnInit(): void {
        this.datosSubs = this.store.select('funciones')
            .subscribe(({ funciones, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.listadoFULL = funciones;
                this.total = this.listadoFULL.length;
            });
    }

    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarFunciones({ listarVigentes: this.listarVigentes }));
    }

    ngOnDestroy(): void {
        this.datosSubs.unsubscribe();
    }

    onChangeChekVigentes(event: any) {
        this.store.dispatch(cargarFunciones({ listarVigentes: this.listarVigentes }));
    }

    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    onClickAbriModal(event, content, id) {
        event.preventDefault();

        this.store.dispatch(cargarFuncion({ id: id }));

        this.modalService.open(content, { size: 'lg', centered: true });
    }

    onClickEliminar(
        event: any,
        item: Funcion
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
            title: `Desactivar Función`,
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
                        next: (response: Funcion) => {
                            this.store.dispatch(cargarFunciones({ listarVigentes: this.listarVigentes }));
                            this.swalService.setToastOK();
                            this.cargando = false;
                        },
                        error: (error) => this.swalService.setToastError(error),
                        complete: () => this.cargando = false,
                    });
            }

        });
    }
}

