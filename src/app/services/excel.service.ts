import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { DatosExportarExcel } from '../models/entity.models';

const base_url = environment.base_url;

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});


@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    constructor(
        private http: HttpClient
    ) { }

    exportar(datos: DatosExportarExcel) {
        const url = `${base_url}Export/ExportarExcel`;
        return this.http.post(url, datos, {
            responseType: 'blob'  // Recibir la respuesta como un archivo binario
        });
    }

}

