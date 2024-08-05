import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { ClasificacionActividad } from '../models/entity.models';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ClasificacionesService {

    private clasificaciones: ClasificacionActividad[];

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

    inicializar() {
        return new Promise<boolean>((resolve, reject) => {
            this.listar()
                .subscribe({
                    next: (response) => {
                        this.clasificaciones = response;
                        resolve(true)
                    },
                    error: (error) => reject(<any>error),
                });
        });
    }

    listar(listarVigentes: boolean = true) {
        const url = `${base_url}ClasificacionesActividad?listarVigentes=${listarVigentes}`;
        return this.http.get<ClasificacionActividad[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}ClasificacionesActividad/${id}`;
        return this.http.get<ClasificacionActividad>(url, this.headers);

    }

    eliminar(dato: ClasificacionActividad) {
        const url = `${base_url}ClasificacionActividad/eliminar?id=${dato.Id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: ClasificacionActividad) {
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}ClasificacionesActividad`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}ClasificacionesActividad/${dato.Id}`, dato, this.headers);
        }

    }
}
