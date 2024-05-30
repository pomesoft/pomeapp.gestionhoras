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

    fecha: NgbDateStruct;

    formulario: FormGroup;


    get periodo() {
        return this.formulario.get('periodo').value;
    }

    get tipoFiltro() {
        return this.formulario.get('tipoFiltro').value;
    }
    
    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private offcanvasService: NgbOffcanvas,
        private calendar: NgbCalendar,
        public swalService: SwalhelperService,
        private usuarioService: UsuarioService,

    ) {
        this.crearFormulario();
    }

    async ngOnInit(): Promise<void> {



    }

    ngAfterViewInit() {
    }

    async cargarDatos() {

        await this.cargarMonedas()
            .then(result => {
                
            })
            .catch(err => {
                this.swalService.setToastError(`Ocurrió un error al cargar los datos`)
                console.log(err);
            });

    }

    cargarMonedas() {
        return new Promise<boolean>((resolve, reject) => {

            resolve(true);

        });
    }


    ngOnDestroy(): void {
        this.filtrosSubs.unsubscribe();
    }

    crearFormulario() {
        this.fecha = {
            year: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };

        this.formulario = this.formBuilder.group({
            proyecto: [''],
            tarea: [''],
            profesional: [''],
            periodo: [1],
            tipoFiltro: [1],
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
        })
    }


    onClickSubmit() {


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
            _idProfesional = +this.formulario.get('profesional').value.substring(1, this.formulario.get('profesional').value.replace('(', '').replace(')', '').indexOf('-'));
        }
        let _idProyecto = -1;
        if (this.formulario.get('proyecto').value) {
            _idProyecto = +this.formulario.get('proyecto').value.substring(1, this.formulario.get('proyecto').value.replace('(', '').replace(')', '').indexOf('-'));
        }

        let filtros: DataFiltro = {
            IdProfesional: _idProfesional,
            IdProyecto: _idProyecto,
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
        this.formulario.get('tipoFiltro').setValue(value, {
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
