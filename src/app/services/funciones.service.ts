import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Funcion } from '../models/entity.models';


const base_url = environment.base_url;

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});


@Injectable({
    providedIn: 'root'
})
export class FuncionesService {

    funciones: Funcion[] = [];

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
                        this.funciones = response;
                        resolve(true)
                    },
                    error: (error) => reject(<any>error),
                });
        });
    }

    listar(listarVigentes: boolean = true) {
        const url = `${base_url}funciones/?listarVigentes=${listarVigentes}`;
        return this.http.get<Funcion[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}funciones/${id}`;
        return this.http.get<Funcion>(url, this.headers);

    }

    eliminar(dato: Funcion) {
        const url = `${base_url}Funcion/eliminar?id=${dato.Id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: Funcion) {
        console.log('dato', JSON.stringify(dato));
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}funciones`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}funciones/${dato.Id}`, dato, this.headers);
        }

    }

}
