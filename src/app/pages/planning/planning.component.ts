import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge, startWith, timer } from 'rxjs';

import { AppState } from '../../store/app.reducers';

import { HelpersService } from '../../services/helpers.service';
import { ProyectoService } from '../../services/proyecto.service';
import { SwalhelperService } from '../../services/swalhelper.service';

import { Proyecto, TipoProyecto } from '../../models/entity.models';

@Component({
    selector: 'app-planning',
    templateUrl: './planning.component.html',
    styles: [
    ]
})
export class PlanningComponent {

    tituloFormulario: string = "Asignación de Horas";

    cargando: boolean = true;
    procesando: boolean = false;
    error: boolean = false;

    countdown$ = timer(500);

    listadoFULL: Proyecto[] = [];
    listado$: Observable<Proyecto[]>;
    hayDatos: boolean = false;
    proyectoSeleccionado: Proyecto;

    mostrarBtnNovigentes: boolean = true;

    filtro = new FormControl('', { nonNullable: true });

    profesional: any;
    periodo: number = 1;

    profesionales: string[] = [];
    clientes: string[] = [];
    proyectos: string[] = [];

    formularioProyecto: FormGroup;
    formularioTarea: FormGroup;


    get clienteNoValido() {
        return this.formularioProyecto.get('cliente').invalid && this.formularioProyecto.get('cliente').touched;
    }
    get proyectoNoValido() {
        return this.formularioProyecto.get('proyecto').invalid && this.formularioProyecto.get('proyecto').touched;
    }
    get tipoProyectoNoValido() {
        return this.formularioProyecto.get('tipoProyecto').invalid && this.formularioProyecto.get('tipoProyecto').touched;
    }
    get rolFuncionNoValido() {
        return this.formularioTarea.get('rolFuncion').invalid && this.formularioTarea.get('rolFuncion').touched;
    }
    get horasNoValida() {
        return this.formularioTarea.get('horas').invalid && this.formularioTarea.get('horas').touched;
    }


    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.clientes : this.clientes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };

    @ViewChild('instanceProyecto', { static: true }) instanceProyecto: NgbTypeahead;
    focusProyecto$ = new Subject<string>();
    clickProyecto$ = new Subject<string>();

    searchProyecto: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProyecto$.pipe(filter(() => false));
        const inputFocus$ = this.focusProyecto$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.proyectos : this.proyectos.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };


    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchProfesional: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.profesionales : this.profesionales.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                return [...new Set(datos)];
            }),
        );
    };


    constructor(
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private proyectoService: ProyectoService,
        private swalService: SwalhelperService,
    ) {
        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))
                // .slice(
                //     (this.page - 1) * this.pageSize,
                //     (this.page - 1) * this.pageSize + this.pageSize,
                // )
            ),
        );
        this.refreshDatos();

        this.crearFormularios();
        this.setearEventosControlesProyecto();

    }

    ngOnInit(): void {

        this.profesionales = this.proyectoService.profesionales.map(item => item.Apellido + '' + item.Nombre);
        this.clientes = this.proyectoService.clientes.map(item => item.Nombre);


        this.profesional = 'APELLIDO 1 NOMBRE 1';
        this.onClickListarProyectos('');

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });
    }

    ngOnDestroy(): void {

    }

    search(text: string): Proyecto[] {
        this.hayDatos = false;
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();

            this.hayDatos = item.Descripcion.toLowerCase().includes(term) ||
                item.Cliente.Nombre.toLowerCase().includes(term) ||
                item.Producto.Descripcion.toLowerCase().includes(term) ||
                item.Tipo.Descripcion.toLowerCase().includes(term);

            return this.hayDatos;
        });
    }


    private crearFormularios() {

        this.formularioProyecto = this.formBuilder.group({
            id: [-1],
            profesional: ['', Validators.required],
            cliente: ['', Validators.required],
            proyecto: ['', Validators.required],
            tipoProyecto: [''],
        });
        Object.keys(this.formularioProyecto.controls).forEach(key => {
            if (key != 'id') {
                const yourControl = this.formularioProyecto.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });

        this.formularioTarea = this.formBuilder.group({
            id: [-1],
            rolFuncion: ['', Validators.required],
            horas: ['', Validators.required],
        });
        Object.keys(this.formularioTarea.controls).forEach(key => {
            if (key != 'id') {
                const yourControl = this.formularioTarea.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }


    onClickListarProyectos(event: any) {
        this.listadoFULL = this.proyectoService.proyectos;
        if (this.listadoFULL.length > 0) {
            this.proyectoSeleccionado = this.listadoFULL[0];
        }
        this.refreshDatos();
        console.log('proyectoSeleccionado', this.proyectoSeleccionado);
    }



    onClickSeleccionarProyecto(
        event: any,
        proyecto: Proyecto
    ) {
        event.preventDefault();
        this.proyectoSeleccionado = proyecto;
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

    onClickGuardarProyecto() {
        if (this.formularioProyecto.invalid) {
            return Object.values(this.formularioProyecto.controls).forEach(control => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                } else {
                    control.markAsTouched();
                }
            });

        }
        this.swalService.setToastOK();
    }


    onClickGuardarTarea() {
        if (this.formularioTarea.invalid) {
            return Object.values(this.formularioTarea.controls).forEach(control => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                } else {
                    control.markAsTouched();
                }
            });

        }
        this.swalService.setToastOK();
    }
    onClickGuardar(event: any) {
        if (this.hayDatos)
            this.swalService.setToastOK();
    }

    onClickPeriodo(value: number) {
        this.periodo = value;
    }

    onFocusHoras(event,) {
        console.log(event);
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

    onClickLimpiarTypeahead(
        controlName: string,
    ) {
        this.formularioProyecto.get(controlName).setValue('', { onlySelf: true, });
    }


    setearEventosControlesProyecto() {

        this.formularioProyecto.get('cliente').valueChanges.subscribe(valor => {
            this.proyectos = this.proyectoService.proyectos
                .filter(item => item.Cliente.Nombre === valor)
                .map(item => item.Descripcion);

            this.formularioProyecto.patchValue({
                proyecto: this.proyectos.length == 1 ? this.proyectos[0] : '',
            }, {
                emitEvent: true
            });
        });

        this.formularioProyecto.get('proyecto').valueChanges.subscribe(valor => {

            var _listaux = this.proyectoService.proyectos.filter(item => item.Descripcion === valor);
            this.formularioProyecto.patchValue({
                tipoProyecto: _listaux.length == 1 ? _listaux[0].TipoDescripcion : '',
            }, {
                emitEvent: false
            });

        });

    }

}
