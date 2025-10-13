import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, merge, OperatorFunction, Subscription, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { NgbTypeahead, NgbModal, NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { cargarClasificacionesActividades, cargarClientes, cargarFunciones, cargarProyectos, cargarUsuarios, setFiltros } from '../../store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';

import { ClasificacionActividad, Cliente, DataFiltro, FechaNgDateStruct, Funcion, Proyecto, Usuario } from '../../models/entity.models';
import { CustomAdapterService } from '../../services/custom-adapter.service';
import { CustomDateParserFormatterService } from '../../services/custom-date-parser-formatter.service';
import { ProyectosService } from '../../services/proyectos.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
    selector: 'app-filtros',
    templateUrl: './filtros.component.html',
    styles: [],
    providers: [
        { provide: NgbDateAdapter, useClass: CustomAdapterService },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
    ],
})
export class FiltrosComponent implements OnInit, OnDestroy, AfterViewInit {

    filtrosSubs: Subscription;


    clientesSubs: Subscription;
    clientes: Cliente[] = [];
    formatterCliente = (item: Cliente) => {
        if (item && item.Nombre) {
            return item.Nombre.substring(0, item.Nombre.length > 30 ? 30 : item.Nombre.length);
        } else {
            return '';
        }
    };

    proyectosSubs: Subscription;
    proyectos: Proyecto[] = [];
    proyectosFULL: Proyecto[] = [];
    formatterProyecto = (item: Proyecto) => {
        if (item && item.Codigo) {
            return item.Codigo.substring(0, item.Codigo.length > 30 ? 30 : item.Codigo.length);
        } else {
            return '';
        }
    };

    usuariosSubs: Subscription;
    usuarios: Usuario[] = [];
    formatterUsuario = (item: Usuario) => {
        if (item && item.ItemList) {
            return item.ItemList.substring(0, item.ItemList.length > 30 ? 30 : item.ItemList.length);
        } else {
            return '';
        }
    };

    funcionesSubs: Subscription;
    funciones: Funcion[] = [];
    formatterFuncion = (item: Funcion) => {
        if (item && item.Descripcion) {
            return item.Descripcion.substring(0, item.Descripcion.length > 30 ? 30 : item.Descripcion.length);
        } else {
            return '';
        }
    };

    clasificacionesSubs: Subscription;
    clasificaciones: ClasificacionActividad[] = [];
    formatterClasificacion = (item: ClasificacionActividad) => {
        if (item && item.Descripcion) {
            return item.Descripcion.substring(0, item.Descripcion.length > 30 ? 30 : item.Descripcion.length);
        } else {
            return '';
        }
    };

    fecha: NgbDateStruct;

    formulario: FormGroup;

    meses: string[] = [];



    get periodoFechas() {
        return this.formulario.get('periodoFechas').value;
    }


    @ViewChild('instancecliente', { static: true }) instancecliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly Cliente[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => !this.instancecliente.isPopupOpen()));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clientes.filter((item) => new RegExp(term, 'mi').test(item.Nombre)))
            );
    };

    @ViewChild('instanceProyecto', { static: true }) instanceProyecto: NgbTypeahead;
    focusProyecto$ = new Subject<string>();
    clickProyecto$ = new Subject<string>();

    searchProyecto: OperatorFunction<string, readonly Proyecto[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProyecto$.pipe(filter(() => false));
        const inputFocus$ = this.focusProyecto$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.proyectos.filter((item) => new RegExp(term, 'mi').test(item.Codigo)))
            );
    };


    @ViewChild('instanceUsuario', { static: true }) instanceUsuario: NgbTypeahead;
    focusUsuario$ = new Subject<string>();
    clickUsuario$ = new Subject<string>();

    searchUsuario: OperatorFunction<string, readonly Usuario[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickUsuario$.pipe(filter(() => false));
        const inputFocus$ = this.focusUsuario$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.usuarios.filter((item) => new RegExp(term, 'mi').test(item.ItemList)))
            );
    };

    @ViewChild('instanceFuncion', { static: true }) instanceFuncion: NgbTypeahead;
    focusFuncion$ = new Subject<string>();
    clickFuncion$ = new Subject<string>();

    searchFuncion: OperatorFunction<string, readonly Funcion[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickFuncion$.pipe(filter(() => false));
        const inputFocus$ = this.focusFuncion$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.funciones.filter((item) => new RegExp(term, 'mi').test(item.Descripcion)))
            );
    };

    @ViewChild('instanceClasificacion', { static: true }) instanceClasificacion: NgbTypeahead;
    focusClasificacion$ = new Subject<string>();
    clickClasificacion$ = new Subject<string>();

    searchClasificacion: OperatorFunction<string, readonly ClasificacionActividad[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickClasificacion$.pipe(filter(() => false));
        const inputFocus$ = this.focusClasificacion$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clasificaciones.filter((item) => new RegExp(term, 'mi').test(item.Descripcion)))
            );
    };




    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private offcanvasService: NgbOffcanvas,
        private calendar: NgbCalendar,
        public usuarioService: UsuarioService,
        public swalService: SwalhelperService,
        public helperService: HelpersService,
    ) {
        this.crearFormulario();
        this.setearEventosControles();
    }

    ngOnInit(): void {

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes;
            });

        this.proyectosSubs = this.store.select('proyectos')
            .subscribe(({ proyectos }) => {
                this.proyectosFULL = proyectos;
                this.proyectos = proyectos;
                if (this.formulario.get('cliente').value) {
                    this.seleccionarCliente(this.formulario.get('cliente').value);
                }
            });

        this.usuariosSubs = this.store.select('usuarios')
            .subscribe(({ usuarios }) => {
                this.usuarios = usuarios;
            });

        this.funcionesSubs = this.store.select('funciones')
            .subscribe(({ funciones }) => {
                this.funciones = funciones;
            });

        this.clasificacionesSubs = this.store.select('clasificacionesActividades')
            .subscribe(({ clasificacionesActividades }) => {
                this.clasificaciones = clasificacionesActividades;
            });

        this.filtrosSubs = this.store.select('filtros')
            .subscribe(({ filtros }) => {
                this.setearFormulario(filtros);
            });

        this.meses = this.helperService.getMeses();
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit()=>this.usuarioService.usuario', this.usuarioService.usuario);
        this.store.dispatch(cargarClientes({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarProyectos({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarUsuarios());
        this.store.dispatch(cargarFunciones({ listarVigentes: true }));
        this.store.dispatch(cargarClasificacionesActividades({ listarVigentes: true }));
    }

    ngOnDestroy(): void {
        this.filtrosSubs.unsubscribe();
        this.clientesSubs.unsubscribe();
        this.proyectosSubs.unsubscribe();
        this.usuariosSubs.unsubscribe();
        this.funcionesSubs.unsubscribe();
        this.clasificacionesSubs.unsubscribe();
    }



    crearFormulario() {
        this.fecha = {
            year: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };

        this.formulario = this.formBuilder.group({
            usuario: [{}],
            cliente: [{}],
            proyecto: [{}],
            funcion: [{}],
            clasificacion: [{}],
            periodoFechas: [1],
            periodoRegistroMes: [''],
            periodoRegistroAnio: [this.fecha.year.toString()],
            fechaDesde: [this.helperService.parserNgDateStruct(this.fecha)],
            fechaHasta: [this.helperService.parserNgDateStruct(this.fecha)],
            // fechaDesdeNgDate: [this.fecha],
            // fechaHastaNgDate: [this.fecha],
        });

    }

    setearFormulario(filtros: DataFiltro) {

        // let fechaDesdeNgDate: FechaNgDateStruct;
        // let fechaHastaNgDate: FechaNgDateStruct;

        // if (filtros.FechaDesdeNgDate) {
        //     fechaDesdeNgDate = {
        //         year: filtros.FechaDesdeNgDate.year,
        //         month: filtros.FechaDesdeNgDate.month,
        //         day: filtros.FechaDesdeNgDate.day,
        //     };
        // } if (filtros.FechaDesde) {
        //     fechaDesdeNgDate = {
        //         year: +filtros.FechaDesde.getFullYear,
        //         month: +filtros.FechaDesde.getMonth,
        //         day: +filtros.FechaDesde.getDay,
        //     };
        // } else {
        //     fechaDesdeNgDate = this.fecha;
        // }

        // if (filtros.FechaHastaNgDate) {
        //     fechaHastaNgDate = {
        //         year: filtros.FechaHastaNgDate.year,
        //         month: filtros.FechaHastaNgDate.month,
        //         day: filtros.FechaHastaNgDate.day,
        //     };
        // } if (filtros.FechaHasta) {
        //     fechaHastaNgDate = {
        //         year: +filtros.FechaHasta.getFullYear,
        //         month: +filtros.FechaHasta.getMonth,
        //         day: +filtros.FechaHasta.getDay,
        //     };
        // } else {
        //     fechaHastaNgDate = this.fecha;
        // }

        //parserNgDateStruct2
        let fechaDesde: string;
        let fechaHasta: string;

        if (filtros.FechaDesde == null) {
            fechaDesde = this.helperService.parserNgDateStruct(this.fecha);
        } else {
            fechaDesde = this.helperService.parserDate(filtros.FechaDesde);
        }
        if (filtros.FechaHasta == null) {
            fechaHasta = this.helperService.parserNgDateStruct(this.fecha);
        } else {
            fechaHasta = this.helperService.parserDate(filtros.FechaHasta);
        }

        let _clasificacion: ClasificacionActividad = filtros.ClasificacionActividad;

        let _periodoRegistro;
        if (filtros.PeriodoRegistro) {
            _periodoRegistro = filtros.PeriodoRegistro.split('-');
        }
        let _periodoMes = _periodoRegistro ? _periodoRegistro[0] : '';
        let _periodoAnio = _periodoRegistro ? _periodoRegistro[1] : this.fecha.year.toString();


        console.log('this.usuarioService.usuario', this.usuarioService.usuario);
        let usrLogin: Usuario = null;
        if (this.usuarioService.usuario && this.usuarioService.usuario.Rol.NivelAcceso == 10) {
            usrLogin = this.usuarioService.usuario;
        } else {
            usrLogin = filtros.Usuario;
        }

        this.formulario.reset({
            usuario: usrLogin,
            cliente: filtros.Cliente,
            proyecto: filtros.Proyecto,
            funcion: filtros.Funcion,
            clasificacion: _clasificacion,
            periodoFechas: filtros.PeriodoFechas,
            periodoRegistroMes: _periodoMes,
            periodoRegistroAnio: _periodoAnio,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta,
            // fechaDesdeNgDate: fechaDesdeNgDate,
            // fechaHastaNgDate: fechaHastaNgDate,
        })

        if (this.usuarioService.usuario && this.usuarioService.usuario.Rol && this.usuarioService.usuario.Rol.NivelAcceso == 10) {
            this.formulario.get('usuario')?.disable();
        }

    }


    onClickSubmit() {

        if (this.formulario.get('periodoFechas').value < 4) {
            // this.formulario.get('fechaDesdeNgDate').setValue(this.fecha, { onlySelf: true, });
            // this.formulario.get('fechaHastaNgDate').setValue(this.fecha, { onlySelf: true, });            
        }

        const _fechaDesde = this.helperService.getFechaDate(this.formulario.get('fechaDesde').value);
        const _fechaHasta = this.helperService.getFechaDate(this.formulario.get('fechaHasta').value);


        // const _fechaNgDesde = {
        //     year: +_fechaDesde.getFullYear(),
        //     month: +_fechaDesde.getMonth(),
        //     day: +_fechaDesde.getDay(),
        // };
        // const _fechaNgHasta = {
        //     year: +_fechaHasta.getFullYear(),
        //     month: +_fechaHasta.getMonth(),
        //     day: +_fechaHasta.getDay(),
        // };


        let _usuario: Usuario = null;
        if (this.formulario.get('usuario').value) {
            _usuario = this.usuarios.find(item => item.Id == this.formulario.get('usuario').value.Id);
        }
        let _cliente: Cliente = null;
        if (this.formulario.get('cliente').value) {
            _cliente = this.clientes.find(item => item.Id == this.formulario.get('cliente').value.Id);
        }
        let _proyecto: Proyecto = null;
        if (this.formulario.get('proyecto').value) {
            _proyecto = this.proyectos.find(item => item.Id == this.formulario.get('proyecto').value.Id);
        }
        let _funcion: Funcion = null;
        if (this.formulario.get('funcion').value) {
            _funcion = this.funciones.find(item => item.Id == this.formulario.get('funcion').value.Id);
        }
        let _clasificacion: ClasificacionActividad = null;
        if (this.formulario.get('clasificacion').value) {
            _clasificacion = this.clasificaciones.find(item => item.Id == this.formulario.get('clasificacion').value.Id);
        }
        let _periodoRegistro: string = '';
        if (this.formulario.get('periodoRegistroMes').value && this.formulario.get('periodoRegistroAnio').value) {
            _periodoRegistro = this.formulario.get('periodoRegistroMes').value + '-' + this.formulario.get('periodoRegistroAnio').value;
        }

        let filtros: DataFiltro = {
            Usuario: _usuario,
            Cliente: _cliente,
            Proyecto: _proyecto,
            Funcion: _funcion,
            ClasificacionActividad: _clasificacion,
            PeriodoFechas: this.formulario.get('periodoFechas').value,
            PeriodoRegistro: _periodoRegistro,
            FechaDesde: _fechaDesde,
            FechaHasta: _fechaHasta,
            // FechaDesdeNgDate: _fechaNgDesde,
            // FechaHastaNgDate: _fechaNgHasta,
            Meses: -1,
            Pagina: -1,
            CantidadRegistros: -1,
            CargarDatos: true,
        };

        this.store.dispatch(setFiltros({ filtros: filtros }));

        this.offcanvasService.dismiss();

    }

    onClickCerrar() {
        this.offcanvasService.dismiss();
    }


    onClickPeriodo(value: number) {
        this.formulario.get('periodoFechas').setValue(value, {
            onlySelf: true,
        });

        // let fecha: NgbDateStruct = {
        //     year: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
        //     month: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
        //     day: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        // };

        // this.formulario.patchValue({
        //     FechaDesdeNgDate: fecha,
        //     FechaHastaNgDate: fecha,
        // }, {
        //     emitEvent: false
        // });

    }

    onClickTiposFiltro(value: number) {
        this.formulario.get('tipoProyecto').setValue(value, {
            onlySelf: true,
        });
    }

    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    onClickLimpiarTypeahead(
        controlName: string,
    ) {
        if (!this.formulario.get(controlName)?.enabled) return

        this.formulario.get(controlName).setValue('', {
            onlySelf: true,
        });
        if (controlName == 'cliente') {
            this.formulario.get('proyecto').setValue('');
        }
    }


    setearEventosControles() {

        this.formulario.get('cliente').valueChanges.subscribe(valor => {
            if (valor && valor.Id > 0) {
                this.seleccionarCliente(valor);
            }
        });
    }

    seleccionarCliente(
        cliente: Cliente
    ) {
        if (cliente.Id > 0) {
            this.proyectos = this.proyectosFULL.filter(item => item.Cliente.Id === cliente.Id);
            if (this.proyectos.length == 1) {
                this.formulario.get('proyecto').setValue(this.proyectos[0]);
            }
        } else {
            this.proyectos = this.proyectosFULL;
            if (this.proyectos.length == 1) {
                this.formulario.get('proyecto').setValue('');
            }
        }
    }


}
