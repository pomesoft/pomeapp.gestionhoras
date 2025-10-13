import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Cliente } from '../models/entity.models';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private clientes: Cliente[];

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
                        this.clientes = response;
                        resolve(true)
                    },
                    error: (error) => reject(<any>error),
                });
        });
    }

    listar(
        listarVigentes: boolean = true,
        usuarioId: number = -1,
    ) {
        const url = `${base_url}Clientes?listarVigentes=${listarVigentes}&usuarioId=${usuarioId}`;
        console.log('url', url);
        return this.http.get<Cliente[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}Clientes/${id}`;
        return this.http.get<Cliente>(url, this.headers);

    }

    eliminar(dato: Cliente) {
        const url = `${base_url}Cliente/eliminar?id=${dato.Id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: Cliente) {
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}Clientes`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}Clientes/${dato.Id}`, dato, this.headers);
        }

    }

}
