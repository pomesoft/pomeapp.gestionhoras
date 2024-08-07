import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

import { Usuario } from '../../models/entity.models';
import { UsuarioService } from '../../services/usuario.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { cargarUsuario, cargarUsuarios } from 'src/app/store/actions';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: [
    ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

    cargando: boolean = false;

    error: any;
    textoBusqueda: string = '';

    page: number = 1;
    pageSize: number = 10;
    total: number = 0;

    usuariosSubs: Subscription;

    listadoFULL: Usuario[];
    listado$: Observable<Usuario[]>;

    filtro = new FormControl('', { nonNullable: true });
    listarNoVigentes: boolean = false;

    search(text: string): Usuario[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Apellido && item.Apellido.toLowerCase().includes(term) ||
                item.Nombre && item.Nombre.toLowerCase().includes(term) ||
                item.Email && item.Email.toLowerCase().includes(term) ||
                item.Celular && item.Celular.toLowerCase().includes(term) ||
                item.LoginUsuario && item.LoginUsuario.toLowerCase().includes(term) ||
                item.Rol && item.Rol.Descripcion && item.Rol.Descripcion.toLowerCase().includes(term) ||
                item.Funcion && item.Funcion.Descripcion && item.Funcion.Descripcion.toLowerCase().includes(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private config: NgbPaginationConfig,
        private swalService: SwalhelperService,
        private usuarioServcice: UsuarioService,
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

        this.usuariosSubs = this.store.select('usuarios')
            .subscribe(({ usuarios, loaded }) => {
                if (loaded){
                    this.cargarListadoFULL(usuarios);
                    this.refreshDatos();
                }
            });
        this.cargarDatos();
    }

    ngOnDestroy(): void {
        this.usuariosSubs.unsubscribe();
    }

    async cargarDatos() {

        this.cargando = true;
        
        await this.getDatosListadoFull()
            .then(usuarios => {
                this.cargarListadoFULL(usuarios);
            })
            .catch(err => {
                this.swalService.setToastError(`Ocurrió un error al cargar los datos`)
                console.log(err);
            })
            .finally(() => this.cargando = false);

    }

    cargarListadoFULL(usuarios: Usuario[]) {

        this.listadoFULL = [];

        if (this.listarNoVigentes) {
            this.listadoFULL.push(...usuarios.filter(item => !item.Vigente));
        } else {
            this.listadoFULL.push(...usuarios.filter(item => item.Vigente));
        }

        this.total = this.listadoFULL.length;

    }

    getDatosListadoFull() {
        return new Promise<Usuario[]>((resolve, reject) => {
            this.usuarioServcice.listar()
                .subscribe({
                    next: (response) => resolve(response),
                    error: (error) => reject(<any>error),
                });
        });
    }

    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    onChangeChekVigentes(event: any) {
        this.cargarDatos();
    }

    onClickAbriModal(event, content, id) {
        event.preventDefault();

        this.store.dispatch(cargarUsuario({ id: id }));

        this.modalService.open(content, { size: 'lg', centered: true });
    }

    onClickEliminar(
        event: any,
        item: Usuario
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
            title: `Desactivar Usuario`,
            text: `¿Desea desactivar a ${item.Nombre} ${item.Apellido} (${item.LoginUsuario})?`,
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-times mr-2"></i>Cancelar',
            confirmButtonText: '<i class="fa fa-minus-square-o mr-2"></i>Desactivar',
        }).then((result) => {

            if (result.isConfirmed) {
                this.cargando = true;
                item.Vigente = false;
                this.usuarioServcice.actualizar(item)
                    .subscribe({
                        next: (response: Usuario) => {
                            this.store.dispatch(cargarUsuarios());
                            this.swalService.setToastOK();
                        },
                        error: (error) => this.swalService.setToastError(error),
                        complete: () => this.cargando = false,
                    });
            }

        });
    }

}
