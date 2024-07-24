import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ClasificacionActividad } from '../models/entity.models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClasificacionesService {

    private clasificaciones: ClasificacionActividad[];

    private base_url = environment.base_url;

    constructor(
        private http: HttpClient
    ) {

        this.clasificaciones = [
            { Id: 1, Descripcion: 'NUEVO REGISTRO' },
            { Id: 2, Descripcion: 'VARIACIONES TECNICAS ALTA COMPLEJIDAD' },
            { Id: 3, Descripcion: 'VARIACIONES TECNICAS BAJA COMLEJIDAD' },
            { Id: 4, Descripcion: 'IP Y ROTULOS ALTA COMPLEJIDAD' },
            { Id: 5, Descripcion: 'IP Y ROTULOS ALTA COMPLEJIDAD' },
            { Id: 6, Descripcion: 'RENOVACIONES ' },
            { Id: 7, Descripcion: 'BÚSQUEDAS BIBLIOGRÁFICAS' },
            { Id: 8, Descripcion: 'IPAS NUEVO' },
            { Id: 9, Descripcion: 'IPAS REVISIÓN' },
            { Id: 10, Descripcion: 'PGR NUEVO' },
            { Id: 11, Descripcion: 'PGR REVISION' },
            { Id: 12, Descripcion: 'GESTION DE CASOS' },
            { Id: 13, Descripcion: 'PROYECTO ESPECIFICO' },
            { Id: 14, Descripcion: 'ENTRENAMIENTO' },
            { Id: 15, Descripcion: 'REUNION DE EQUIPO, PRIORIDADES' },
        ];
    }

    listar(): Observable<ClasificacionActividad[]> {
        return of(this.clasificaciones);
    }

    obtener(id: number): Observable<ClasificacionActividad> {
        return of(this.clasificaciones.find(item => item.Id == id));
    }

    actualizar(
        data: ClasificacionActividad
    ): Observable<ClasificacionActividad> {
        // const url = `${this.base_url}ClasificacionActividad`;
        // return this.http.post<ClasificacionActividad>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<ClasificacionActividad> {
        //const url = `${base_url}ClasificacionActividad/eliminar/${id}`;
        // return this.http.post<ClasificacionActividad>(url, data, this.headers);
        return this.obtener(id);
    }
}
