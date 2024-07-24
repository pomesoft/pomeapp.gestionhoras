import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, startWith, map } from 'rxjs';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClasificacionesActividades, cargarClasificacionActividad } from '../../store/actions';

import { ClasificacionActividad } from '../../models/entity.models';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ClasificacionesService } from '../../services/clasificaciones.service';

@Component({
    selector: 'app-clasificaciones-actividades',
    templateUrl: './clasificaciones-actividades.component.html',
    styles: [
    ]
})
export class ClasificacionesActividadesComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = false;
    tituloFormulario: string = 'Clasificación de Actividades';
  
    error: any;
    textoBusqueda: string = '';
  
    datosSubs: Subscription;
  
    page: number = 1;
    pageSize: number = 15;
    total: number = 0;
  
    listadoFULL: ClasificacionActividad[];
    listado$: Observable<ClasificacionActividad[]>;
  
    filtro = new FormControl('', { nonNullable: true });
  
    search(text: string): ClasificacionActividad[] {
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
        private datosServcice: ClasificacionesService,
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
        this.datosSubs = this.store.select('clasificacionesActividades')
            .subscribe(({ clasificacionesActividades, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                console.log('clasificacionesActividades', clasificacionesActividades);
                this.listadoFULL = clasificacionesActividades;
                this.total = this.listadoFULL.length;
            });
    }
  
    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarClasificacionesActividades());
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
  
        this.store.dispatch(cargarClasificacionActividad({ id: id }));
  
        this.modalService.open(content, { size: 'lg', centered: true });
    }
  
    onClickEliminar(
        event: any,
        item: ClasificacionActividad
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
  
                this.datosServcice.eliminar(item.Id)
                    .subscribe({
                        next: (response: ClasificacionActividad) => {
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
  