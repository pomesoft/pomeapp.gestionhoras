import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable, startWith, map } from 'rxjs';

import Swal from 'sweetalert2';


import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

import { Proyecto } from '../../models/entity.models';

import { ProyectosService } from '../../services/proyectos.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { cargarProyecto, cargarProyectos } from 'src/app/store/actions';

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

    page: number = 1;
    pageSize: number = 15;
    total: number = 0;

    filtro = new FormControl('', { nonNullable: true });

    search(text: string): Proyecto[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Codigo && item.Codigo.toLowerCase().includes(term) ||
                item.Descripcion && item.Descripcion.toLowerCase().includes(term) ||
                item.Cliente && item.Cliente.Nombre.toLowerCase().includes(term) ||
                item.LiderProyecto && item.LiderProyecto.ItemList.toLowerCase().includes(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private datosServcice: ProyectosService,
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
            });
    }

    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarProyectos());
    }

    ngOnDestroy(): void {
        this.datosSubs.unsubscribe();
    }



    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    onClickAbriModal(event, content, id) {
        event.preventDefault();

        this.store.dispatch(cargarProyecto({ id: id }));

        this.modalService.open(content, { size: 'lg', centered: true });
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

                this.datosServcice.desactivar(item.Id)
                    .subscribe({
                        next: (response: Proyecto) => {
                            this.store.dispatch(cargarProyectos());
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

