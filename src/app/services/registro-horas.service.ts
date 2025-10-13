import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { DashboardItem, FiltroListadoRegistroDTO, RegistroHora, RegistroHoraDTO, ReporteItem } from '../models/entity.models';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class RegistroHorasService {

    constructor(
        private http: HttpClient
    ) { }

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


    listar(filtro: FiltroListadoRegistroDTO) {
        const url = `${base_url}RegistroHoras/Listar`;
        return this.http.post(url, filtro, this.headers);
    }


    obtener(id: number) {

        const url = `${base_url}RegistroHoras/${id}`;
        return this.http.get<RegistroHora>(url, this.headers);

    }

    eliminar(id: number) {
        const url = `${base_url}RegistroHoras/Eliminar?id=${id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: RegistroHoraDTO) {
        if (dato.Id <= 0) {
            return this.http.post<RegistroHoraDTO>(`${base_url}RegistroHoras`, dato, this.headers);
        } else {
            return this.http.put<RegistroHoraDTO>(`${base_url}RegistroHoras/${dato.Id}`, dato, this.headers);
        }

    }

    listarReporte(filtro: FiltroListadoRegistroDTO) {      
        const url = `${base_url}RegistroHoras/Reporte`;
        return this.http.post<ReporteItem[]>(url, filtro, this.headers);
    }

    listarDashboard(filtro: FiltroListadoRegistroDTO) {        
        const url = `${base_url}RegistroHoras/Dashboard`;
        return this.http.post<DashboardItem[]>(url, filtro, this.headers);
    }


}
