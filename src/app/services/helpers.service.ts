import { Injectable } from '@angular/core';

import { DataFiltro, FechaNgDateStruct } from '../models/entity.models';

@Injectable({
    providedIn: 'root'
})
export class HelpersService {

    constructor() { }

    parserNgDateStruct(
        fecha: FechaNgDateStruct
    ) {

        return fecha.year + '-' + this.pad(fecha.month, 2) + '-' + this.pad(fecha.day, 2);
    }

    pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
}
