import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Funcion } from '../models/entity.models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FuncionesService {

    private funciones: Funcion[];

    private base_url = environment.base_url;

    constructor(
        private http: HttpClient
    ) {

        this.funciones = [
            { Id: 1, Descripcion: 'EXPERTO REGULATORIO' },
            { Id: 2, Descripcion: 'EXPERTO FARMACOVIGILANCIA' },
            { Id: 3, Descripcion: 'EXPERTO MEDICO' },
            { Id: 4, Descripcion: 'EXPERTO COMPLIANCE' },
            { Id: 5, Descripcion: 'EXPERTO LEGAL' },
            { Id: 6, Descripcion: 'PROJECT MANAGER' },
            { Id: 7, Descripcion: 'ANALISTA SENIOR' },
            { Id: 8, Descripcion: 'ANALISTA JUNIOR' },
            { Id: 9, Descripcion: 'TECNICO ADMINISTRATIVO' },
            { Id: 10, Descripcion: 'GESTORÍA' },
        ];
    }

    listar(): Observable<Funcion[]> {
        console.log('this.funciones', this.funciones);
        return of(this.funciones);
    }

    obtener(id: number): Observable<Funcion> {
        return of(this.funciones.find(item => item.Id == id));
    }

    actualizar(
        data: Funcion
    ): Observable<Funcion> {
        // const url = `${this.base_url}Funcion`;
        // return this.http.post<Funcion>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<Funcion> {
        //const url = `${base_url}Funcion/eliminar/${id}`;
        // return this.http.post<Funcion>(url, data, this.headers);
        return this.obtener(id);
    }
}
