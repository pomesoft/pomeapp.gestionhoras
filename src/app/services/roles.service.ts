import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Rol } from '../models/entity.models';

const base_url = environment.base_url;


const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});


@Injectable({
    providedIn: 'root'
})
export class RolesService {

    roles: Rol[] = [];

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
                        this.roles = response;
                        resolve(true)
                    },
                    error: (error) => reject(<any>error),
                });
        });
    }

    listar() {
        const url = `${base_url}roles`;
        return this.http.get<Rol[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}roles/${id}`;
        return this.http.get<Rol>(url, this.headers);

    }

    eliminar(dato: Rol) {
        const url = `${base_url}Rol/eliminar?id=${dato.Id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: Rol) {

        console.log('actualizar dato', JSON.stringify(dato));
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}roles`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}roles/${dato.Id}`, dato, this.headers);
        }

    }

}


