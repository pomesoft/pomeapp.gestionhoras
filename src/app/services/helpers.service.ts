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
}
