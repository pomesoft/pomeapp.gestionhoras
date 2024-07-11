import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Profesional } from '../models/entity.models';

@Injectable({
    providedIn: 'root'
})
export class ProfesionalesService {

    private profesionales: Profesional[];
    private base_url = environment.base_url;

    constructor(
        private http: HttpClient
    ) {
        let profesional1: Profesional = { Id: 1, Apellido: 'APELLIDO 1', Nombre: 'NOMBRE 1', Funcion: { Id: 6, Descripcion: 'PROJECT MANAGER' } };
        let profesional2: Profesional = { Id: 2, Apellido: 'APELLIDO 2', Nombre: 'NOMBRE 2', Funcion: { Id: 7, Descripcion: 'ANALISTA SENIOR' }  };
        let profesional3: Profesional = { Id: 3, Apellido: 'APELLIDO 3', Nombre: 'NOMBRE 3', Funcion: { Id: 8, Descripcion: 'ANALISTA JUNIOR' }  };
        let profesional4: Profesional = { Id: 3, Apellido: 'APELLIDO 3', Nombre: 'NOMBRE 3', Funcion: { Id: 1, Descripcion: 'EXPERTO REGULATORIO' }  };

        this.profesionales = [profesional1, profesional2, profesional3, profesional4];
    }

    listar(): Observable<Profesional[]> {
        return of(this.profesionales);
    }

    obtener(id: number): Observable<Profesional> {
        return of(this.profesionales.find(item => item.Id == id));
    }

    actualizar(
        data: Profesional
    ): Observable<Profesional> {
        // const url = `${this.base_url}Profesional`;
        // return this.http.post<Profesional>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<Profesional> {
        //const url = `${base_url}Profesional/eliminar/${id}`;
        // return this.http.post<Profesional>(url, data, this.headers);
        return this.obtener(id);
    }

}
