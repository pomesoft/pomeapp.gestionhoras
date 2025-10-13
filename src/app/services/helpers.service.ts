import { Injectable } from '@angular/core';

import { DataFiltro, FechaNgDateStruct } from '../models/entity.models';
import { NgbCalendar, NgbDateStruct, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    private fechaActual: NgbDateStruct;

    constructor(
        private calendar: NgbCalendar,
    ) { }

    getFechaActual() {
        this.fechaActual = {
            year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };
        return this.parserNgDateStruct(this.fechaActual)
    }

    getMesActual() {
        return this.calendar.getToday().month - 1;
    }

    getAnioActual() {
        return this.calendar.getToday().year;
    }

    getPeriodoActual(): string {
        let _periodoActual: string = `${this.getMeses()[this.calendar.getToday().month - 1]} ${this.calendar.getToday().year}`;
        console.log('_periodoActual', _periodoActual);
        return _periodoActual;
    }

    parserNgDateStruct(
        fecha: FechaNgDateStruct
    ) {
        //return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
        return this.pad(fecha.day, 2) + '-' + this.pad(fecha.month, 2) + '-' + fecha.year;
    }

    parserNgDateStruct2(
        fecha: FechaNgDateStruct
    ) {
        //return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
        return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
    }

    parserDate(
        fecha: Date
    ) {
        return this.pad(fecha.getDate(), 2) + '-' + this.pad(fecha.getMonth() + 1, 2) + '-' + fecha.getFullYear();
    }

    getFechaDate(
        fecha: string
    ): Date {
        console.log('fecha', fecha);
        var fechaSplit = fecha.substring(0, 10).split('-');
        return new Date(fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[0]);
    }

    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    public cargarLabelsFiltros(
        filtros: DataFiltro
    ): string[] {

        let labelsFiltros: string[] = [];

        if (filtros.PeriodoRegistro) {
            labelsFiltros.push(`${filtros.PeriodoRegistro}`);
        } else {
            switch (filtros.PeriodoFechas) {
                case 1:
                    labelsFiltros.push(`Últimos 7 días`);
                    break;
                case 2:
                    labelsFiltros.push(`Últimos 30 días`);
                    break;
                case 3:
                    labelsFiltros.push(`Últimos 90 días`);
                    break;
                case 4:
                    if (filtros.FechaDesde && filtros.FechaHasta) {
                        labelsFiltros.push(`Desde ${this.parserDate(filtros.FechaDesde)} hasta ${this.parserDate(filtros.FechaHasta)}`);
                    }
                    break;
            }
        }

        if (filtros.Usuario) {
            labelsFiltros.push(`${filtros.Usuario.ItemList}`);
        }

        if (filtros.Cliente) {
            labelsFiltros.push(`${filtros.Cliente.Nombre}`);
        }

        if (filtros.Proyecto) {
            labelsFiltros.push(`${filtros.Proyecto.Codigo}`);
        }

        if (filtros.Funcion) {
            labelsFiltros.push(`${filtros.Funcion.Descripcion}`);
        }

        if (filtros.ClasificacionActividad) {
            labelsFiltros.push(`${filtros.ClasificacionActividad.Descripcion}`);
        }


        return labelsFiltros;
    }

    getMeses(): string[] {
        let _meses: string[] = [
            'ENERO',
            'FEBRERO',
            'MARZO',
            'ABRIL',
            'MAYO',
            'JUNIO',
            'JULIO',
            'AGOSTO',
            'SEPTIEMBRE',
            'OCTUBRE',
            'NOVIEMBRE',
            'DICIEMBRE',
        ];
        return _meses;
    }


    getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
