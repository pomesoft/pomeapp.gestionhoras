import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, merge, OperatorFunction, Subscription, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { NgbTypeahead, NgbModal, NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { setFiltros } from '../../store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';

import { DataFiltro, FechaNgDateStruct } from '../../models/entity.models';
import { CustomAdapterService } from '../../services/custom-adapter.service';
import { CustomDateParserFormatterService } from '../../services/custom-date-parser-formatter.service';
import { ProyectosService } from '../../services/proyectos.service';

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

    fecha: NgbDateStruct;

    formulario: FormGroup;

    clientes: string[] = [];
    proyectos: string[] = [];
    profesionales: string[] = [];

    get periodo() {
        return this.formulario.get('periodo').value;
    }

    get tipoProyecto() {
        return this.formulario.get('tipoProyecto').value;
    }


    @ViewChild('instancecliente', { static: true }) instancecliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => !this.instancecliente.isPopupOpen()));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) =>
                    (term === '' ? this.clientes : this.clientes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
                ),
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


    @ViewChild('instanceProfesional', { static: true }) instanceProfesional: NgbTypeahead;
    focusProfesional$ = new Subject<string>();
    clickProfesional$ = new Subject<string>();

    searchProfesional: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProfesional$.pipe(filter(() => false));
        const inputFocus$ = this.focusProfesional$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.profesionales : this.profesionales.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private offcanvasService: NgbOffcanvas,
        private calendar: NgbCalendar,
        public swalService: SwalhelperService,

    ) {
        this.crearFormulario();
    }

    async ngOnInit(): Promise<void> {
        /*
        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes.map(item=>item.Nombre)
            });

        this.clientes = this.proyectoService.clientes.map(item => item.Nombre);
        this.proyectos = this.proyectoService.proyectos.map(item => item.Descripcion);
        this.profesionales = this.proyectoService.profesionales.map(item => item.Apellido.concat(" ", item.Nombre));

        this.filtrosSubs = this.store.select('filtros')
            .subscribe(({ filtros }) => {
                this.setearFormulario(filtros);
            });
            */
    }

    ngAfterViewInit() {
    }

    
    ngOnDestroy(): void {
        this.filtrosSubs.unsubscribe();
        this.clientesSubs.unsubscribe();
    }



    onChangeCliente(event: any) {
        this.formulario.get('c').setValue(+event.target.value, {
            onlySelf: true,
        });
    }


    crearFormulario() {
        this.fecha = {
            year: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };

        this.formulario = this.formBuilder.group({
            profesional: [''],
            cliente: [0],
            proyecto: [''],
            tipoProyecto: [0],
            tarea: [''],
            periodo: [1],
            fechaDesdeNgDate: [this.fecha],
            fechaHastaNgDate: [this.fecha],
        });
    }

    setearFormulario(filtros: DataFiltro) {

        let fechaDesde: FechaNgDateStruct;
        let fechaHasta: FechaNgDateStruct;

        if (filtros.FechaDesdeNgDate) {
            fechaDesde = {
                year: filtros.FechaDesdeNgDate.year,
                month: filtros.FechaDesdeNgDate.month,
                day: filtros.FechaDesdeNgDate.day,
            };
        } if (filtros.FechaDesde) {
            fechaDesde = {
                year: +filtros.FechaDesde.substring(0, 4),
                month: +filtros.FechaDesde.substring(5, 7),
                day: +filtros.FechaDesde.substring(8, 10),
            };
        } else {
            fechaDesde = this.fecha;
        }

        if (filtros.FechaHastaNgDate) {
            fechaHasta = {
                year: filtros.FechaHastaNgDate.year,
                month: filtros.FechaHastaNgDate.month,
                day: filtros.FechaHastaNgDate.day,
            };
        } if (filtros.FechaHasta) {
            fechaHasta = {
                year: +filtros.FechaHasta.substring(0, 4),
                month: +filtros.FechaHasta.substring(5, 7),
                day: +filtros.FechaHasta.substring(8, 10),
            };
        } else {
            fechaHasta = this.fecha;
        }

        this.formulario.reset({
            fechaDesdeNgDate: fechaDesde,
            fechaHastaNgDate: fechaHasta,
            profesional: filtros.Profesional,
            cliente: filtros.Cliente,
            proyecto: filtros.Proyecto,
            tipoProyecto: filtros.IdTipoProyecto,
            tarea: filtros.IdProfesional,
            periodo: filtros.Periodo,
        })
    }




    onClickSubmit() {

        /*
        if (this.formulario.get('periodo').value < 4) {
            //si el periodo es distinto a personalizado sete las fecha con el getdate
            this.formulario.get('fechaDesdeNgDate').setValue(this.fecha, { onlySelf: true, });
            this.formulario.get('fechaHastaNgDate').setValue(this.fecha, { onlySelf: true, });
        }

        const fechaNgDesde = this.formulario.get('fechaDesdeNgDate').value;
        const _fechaDesde: string = fechaNgDesde.year + '-' + this.pad(fechaNgDesde.month, 2) + '-' + this.pad(fechaNgDesde.day, 2);

        const fechaNgHasta = this.formulario.get('fechaHastaNgDate').value;
        const _fechaHasta: string = fechaNgHasta.year + '-' + this.pad(fechaNgHasta.month, 2) + '-' + this.pad(fechaNgHasta.day, 2);


        let _idProfesional = -1;
        if (this.formulario.get('profesional').value) {
            var _profesional = this.proyectoService.profesionales.filter(item => item.Apellido.concat(" ", item.Nombre) == this.formulario.get('profesional').value);
            if (_profesional && _profesional.length > 0)
                _idProfesional = _profesional[0].Id;
        }
        let _idCliente = -1;
        if (this.formulario.get('cliente').value) {
            var _cliente = this.proyectoService.clientes.filter(item => item.Nombre == this.formulario.get('cliente').value);
            if (_cliente && _cliente.length > 0)
                _idCliente = _cliente[0].Id;
        }
        let _idProyecto = -1;
        if (this.formulario.get('proyecto').value) {
            var _proyecto = this.proyectoService.proyectos.filter(item => item.Descripcion == this.formulario.get('proyecto').value);
            if (_proyecto && _proyecto.length > 0)
                _idProyecto = _proyecto[0].Id;
        }

        let filtros: DataFiltro = {
            IdProfesional: _idProfesional,
            Profesional: this.formulario.get('profesional').value || '',
            IdCliente: _idCliente,
            Cliente: this.formulario.get('cliente').value || '',
            IdProyecto: _idProyecto,
            Proyecto: this.formulario.get('proyecto').value || '',
            IdTipoProyecto: this.formulario.get('tipoProyecto').value,
            Periodo: this.formulario.get('periodo').value,
            FechaDesde: _fechaDesde,
            FechaHasta: _fechaHasta,
            FechaDesdeNgDate: fechaNgDesde,
            FechaHastaNgDate: fechaNgHasta,
            Meses: -1,
            Pagina: -1,
            CantidadRegistros: -1,
            CargarDatos: true,
        }

        this.store.dispatch(setFiltros({ filtros: filtros }));

        this.offcanvasService.dismiss();
        */
    }

    onClickCerrar() {
        this.offcanvasService.dismiss();
    }


    onClickPeriodo(value: number) {
        this.formulario.get('periodo').setValue(value, {
            onlySelf: true,
        });

        let fecha: NgbDateStruct = {
            year: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };

        this.formulario.patchValue({
            FechaDesdeNgDate: fecha,
            FechaHastaNgDate: fecha,
        }, {
            emitEvent: false
        });

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
        this.formulario.get(controlName).setValue('', {
            onlySelf: true,
        });
    }

}
