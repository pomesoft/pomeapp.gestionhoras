import { Component, ViewChild, TemplateRef, AfterContentInit, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge, startWith, timer } from 'rxjs';

import { AppState } from '../../store/app.reducers';
import { cargarClientes, cargarFunciones, cargarProyectos } from '../../store/actions';

import { HelpersService } from '../../services/helpers.service';
import { ProyectosService } from '../../services/proyectos.service';
import { SwalhelperService } from '../../services/swalhelper.service';

import { Cliente, Funcion, Proyecto, ProyectoFuncion, ResponseApi } from '../../models/entity.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: [
    ]
})
export class PlanningComponent implements OnInit, AfterContentInit, OnDestroy {

    tituloFormulario: string = "Asignación de Horas Mensuales";

    cargando: boolean = true;
    procesando: boolean = false;
    error: boolean = false;

    countdown$ = timer(500);

    funcionesSubs: Subscription;

    clienteSeleccionado: Cliente;
    clientes: Cliente[] = [];
    formatterCliente = (item: Cliente) => (item && item.Nombre) ? item.Nombre : '';


    proyectosFULL: Proyecto[] = [];
    proyectos$: Observable<Proyecto[]>;
    proyectoSeleccionado: Proyecto;

    funciones: Funcion[] = [];
    funcionesAsignadas: ProyectoFuncion[] = [];
    totalHorasAsignadas: number = 0;
    listarTodasFunciones: boolean = false;

    mostrarBtnNovigentes: boolean = true;

    filtro = new FormControl('', { nonNullable: true });


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

    get hayFuncionesAsignadas() {
        return this.funcionesAsignadas && this.funcionesAsignadas.length > 0;
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private proyectoService: ProyectosService,
        private usuarioService: UsuarioService,
        private swalService: SwalhelperService,
    ) {
        this.proyectos$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))
                // .slice(
                //     (this.page - 1) * this.pageSize,
                //     (this.page - 1) * this.pageSize + this.pageSize,
                // )
            ),
        )

    }

    ngOnInit(): void {

        this.funcionesSubs = this.store.select('funciones')
            .subscribe(({ funciones, loading, error }) => {
                this.cargando = loading;
                this.error = error;
                this.funciones = funciones;
            });

        this.proyectos$.subscribe({
            next: (proyectos) => {
                if (proyectos && proyectos.length > 0) {
                    this.cargarProyecto(proyectos[0].Id);
                }
            },
            error: (error) => this.swalService.setToastError(error)
        });


        this.cargarDatos();
    }

    ngAfterContentInit(): void {
        this.cargando = true;
        this.store.dispatch(cargarFunciones({ listarVigentes: true }));
    }


    ngOnDestroy(): void {
        this.funcionesSubs.unsubscribe();
    }


    async cargarDatos() {
        this.cargando = true;
        this.error = false;

        await this.cargarProyectos()
            .then(result => {

                this.proyectosFULL = result;
                this.clientes = [];
                this.proyectosFULL.forEach(item => {
                    if (this.clientes.filter(cli => cli.Id == item.Cliente.Id).length == 0) {
                        this.clientes.push(item.Cliente);
                    }
                });
                this.clientes.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
                
            })
            .catch(err => {
                this.error = true;
                console.log(err);
            })
            .finally(() => this.cargando = false);
    }

    search(text: string): Proyecto[] {
        return this.proyectosFULL.filter((item) => {
            const term = text.toLowerCase();

            // return item.Codigo.toLowerCase().includes(term) ||
            //     item.Cliente.Nombre.toLowerCase().includes(term);

            return this.clienteSeleccionado && item.Cliente.Id == this.clienteSeleccionado.Id;
        });
    }


    listarFuncionesAsignadas(
    ) {
        this.funcionesAsignadas = [];

        this.funciones.forEach(item => {
            let proyFuncion: ProyectoFuncion = this.proyectoSeleccionado.FuncionesAsignadas?.find(pfa => pfa.Funcion.Id == item.Id);

            if (!proyFuncion) {
                proyFuncion = { Id: 0, Funcion: item, Horas: 0 };
            }

            if (this.listarTodasFunciones) {
                this.funcionesAsignadas.push(proyFuncion);

            } else if (proyFuncion.Horas > 0) {
                this.funcionesAsignadas.push(proyFuncion);
            }
        });

        this.totalHorasAsignadas = 0;
        this.funcionesAsignadas.forEach(item => this.totalHorasAsignadas += item.Horas);
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
        this.proyectoSeleccionado = null;
        this.refreshDatos();
    }

    onClickSeleccionarProyecto(
        event: any,
        proyectoId: number
    ) {
        event.preventDefault();
        this.cargarProyecto(proyectoId);
    }

    cargarProyectos() {
        return new Promise<Proyecto[]>((resolve, reject) => {
            this.proyectoService.listar(true, true, -1, this.usuarioService.usuario.Id)
                .subscribe({
                    next: (response: Proyecto[]) => resolve(response),
                    error: (error) => reject(<any>error)
                });
        });
    }

    cargarProyecto(
        proyectoId: any
    ) {
        this.funcionesAsignadas = [];

        this.proyectoService.obtener(proyectoId)
            .subscribe({
                next: (proyecto) => {
                    this.proyectoSeleccionado = proyecto;
                    this.listarFuncionesAsignadas();
                },
                error: (error) => {
                    this.swalService.setToastError(`Ocurrió un error al cargar el proyecto`)
                    console.log(error);
                },
            });
    }

    onClickAbrirModal(
        event: any,
        content: TemplateRef<any>,
    ) {
        event.preventDefault();

        this.modalService.open(content, {
            size: 'lg',
            centered: true,
            ariaLabelledBy: 'modal-basic-title'
        }).result.then(
            (result) => {
                //console.log(`Closed with: ${result}`);
                //se puede utilizar para saber que boton presiono en el this.modalService, pero si hay validaciones de formualrio no sirve
            },
            (reason) => {
                //console.log(`Dismissed ${this.getDismissReason(reason)}`);
            },
        );
    }


    onClickGuardar(event: any) {

        let funcAsignadas: ProyectoFuncion[] = this.funcionesAsignadas;

        this.proyectoSeleccionado.FuncionesAsignadas = funcAsignadas;

        this.proyectoService.actualizar(this.proyectoSeleccionado)
            .subscribe({
                next: (response: ResponseApi) => {

                    if (response.OK) {
                        this.onClickSeleccionarProyecto(event, this.proyectoSeleccionado.Id);
                        this.swalService.setToastOK();
                    } else {
                        this.swalService.setSwalFireError(response.Mensaje);
                    }                    
                },
                error: (error) => this.swalService.setToastError(error)
            });

    }


    onFocusHoras(event,) {

    }

    onChangeHoras(event: any) {
        this.totalHorasAsignadas = 0;
        this.funcionesAsignadas.forEach(item => this.totalHorasAsignadas += item.Horas);
    }

    trackByFn(index, item) {
        return index;
    }

    private getDismissReason(reason: any): string {
        switch (reason) {
            case ModalDismissReasons.ESC:
                return 'by pressing ESC';
            case ModalDismissReasons.BACKDROP_CLICK:
                return 'by clicking on a backdrop';
            default:
                return `with: ${reason}`;
        }
    }

    onClickAgregar(
        controlName: string,
    ) {
        this.swalService.setSwalFireOk(`Se podrá agregar un nuevo ${controlName}`);
    }


    onChangeListarTodasFunciones(
        event: any
    ) {
        this.listarFuncionesAsignadas();
    }


}
