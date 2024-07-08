import { Injectable } from '@angular/core';

import { DataFiltro, FechaNgDateStruct } from '../models/entity.models';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    private fechaActual: NgbDateStruct;

    constructor(
        private calendar: NgbCalendar,
    ) { }

    getFechaActual(){
        this.fechaActual = {
            year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };
        return this.parserNgDateStruct(this.fechaActual)
    }

    parserNgDateStruct(
        fecha: FechaNgDateStruct
    ) {
        //return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
        return this.pad(fecha.day, 2) + '-' + this.pad(fecha.month, 2) + '-' + fecha.year;
    }

    parserDate(
        fecha: Date
    ) {
        //return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
        return this.pad(fecha.getDay(), 2) + '-' + this.pad(fecha.getMonth(), 2) + '-' + fecha.getFullYear();
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
        
        switch (filtros.Periodo) {
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
                if (filtros.FechaDesde &&filtros.FechaHasta) {
                    const _desde: string = filtros.FechaDesde.substring(8, 10) + '/' + filtros.FechaDesde.substring(5, 7) + '/' + filtros.FechaDesde.substring(0, 4);
                    const _hasta: string = filtros.FechaHasta.substring(8, 10) + '/' + filtros.FechaHasta.substring(5, 7) + '/' + filtros.FechaHasta.substring(0, 4);
                    labelsFiltros.push(`Desde ${_desde} hasta ${_hasta}`);
                }
                break;
        }

        if (filtros.IdProfesional > 0) {
            labelsFiltros.push(`${filtros.Profesional}`);
        }
        
        if (filtros.IdCliente > 0) {
            labelsFiltros.push(`${filtros.Cliente}`);
        }

        if (filtros.IdProyecto > 0) {
            labelsFiltros.push(`${filtros.Proyecto}`);
        }

        if (filtros.IdTipoProyecto == 1) {
            labelsFiltros.push(`MENSUALIZADO`);
        } else if (filtros.IdTipoProyecto == 2) {
            labelsFiltros.push(`ENTREGABLE`);
        }
        

        return labelsFiltros;
    }
}
