import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, startWith, map } from 'rxjs';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClientes, cargarCliente } from '../../store/actions';

import { Cliente } from '../../models/entity.models';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ClientesService } from '../../services/clientes.service';


@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styles: [
    ]
})
export class ClientesComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = false;
    tituloFormulario: string = 'Clientes';

    error: any;
    textoBusqueda: string = '';

    datosSubs: Subscription;

    page: number = 1;
    pageSize: number = 15;
    total: number = 0;

    listadoFULL: Cliente[];
    listado$: Observable<Cliente[]>;

    filtro = new FormControl('', { nonNullable: true });

    listarVigentes: boolean = true;

    search(text: string): Cliente[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Codigo && item.Codigo.toLowerCase().includes(term) ||
                item.Nombre && item.Nombre.toLowerCase().includes(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private datosServcice: ClientesService,
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
        this.datosSubs = this.store.select('clientes')
            .subscribe(({ clientes, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.listadoFULL = clientes;
                this.total = this.listadoFULL.length;
            });
    }

    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarClientes({ listarVigentes: this.listarVigentes }));
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

        this.store.dispatch(cargarCliente({ id: id }));

        this.modalService.open(content, { size: 'lg', centered: true });
    }

    onChangeChekVigentes(event: any) {
        this.store.dispatch(cargarClientes({ listarVigentes: this.listarVigentes }));
    }

    onClickEliminar(
        event: any,
        item: Cliente
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
            title: `Desactivar Cliente`,
            text: `¿Desea desactivar a ${item.Nombre}?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Desactivar',
        }).then((result) => {

            if (result.isConfirmed) {
                this.cargando = true;

                item.Vigente=false 
                this.datosServcice.actualizar(item)
                    .subscribe({
                        next: (response: Cliente) => {
                            this.store.dispatch(cargarClientes({ listarVigentes: this.listarVigentes }));
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

