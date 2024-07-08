import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, startWith, map } from 'rxjs';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarProfesional, cargarProfesionales } from 'src/app/store/actions';


import { Profesional } from '../../models/entity.models';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProfesionalesService } from '../../services/profesionales.service';

@Component({
    selector: 'app-profesionales',
    templateUrl: './profesionales.component.html',
    styles: [
    ]
})
export class ProfesionalesComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = false;
    tituloFormulario: string = 'Profesionales';

    error: any;
    textoBusqueda: string = '';

    datosSubs: Subscription;

    listadoFULL: Profesional[];
    listado$: Observable<Profesional[]>;

    filtro = new FormControl('', { nonNullable: true });

    search(text: string): Profesional[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Apellido && item.Apellido.toLowerCase().includes(term) ||
                item.Nombre && item.Nombre.toLowerCase().includes(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private datosServcice: ProfesionalesService,
    ) {
        // customize default values of paginations used by this component tree
        config.size = 'sm';
        config.boundaryLinks = true;

        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))),
        );
        this.refreshDatos();
    }

    ngOnInit(): void {
        this.datosSubs = this.store.select('profesionales')
            .subscribe(({ profesionales, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.listadoFULL = profesionales;
            });
    }
    
    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarProfesionales());
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

        this.store.dispatch(cargarProfesional({ id: id }));

        this.modalService.open(content, { size: 'lg', centered: true });
    }

    onClickEliminar(
        event: any,
        item: Profesional
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
            title: `Desactivar Moneda`,
            text: `¿Desea desactivar a ${item.Apellido} ${item.Nombre}?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Desactivar',
        }).then((result) => {

            if (result.isConfirmed) {
                this.cargando = true;

                this.datosServcice.eliminar(item.Id)
                    .subscribe({
                        next: (response: Profesional) => {
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
