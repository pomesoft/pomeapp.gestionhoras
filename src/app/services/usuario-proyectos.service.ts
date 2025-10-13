import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Rol, UsuarioProyecto } from '../models/entity.models';

const base_url = environment.base_url;


const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});


@Injectable({
    providedIn: 'root'
})
export class UsuarioProyectosService {

    usuarioproyectos: UsuarioProyecto[] = [];

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

    
    listar() {
        const url = `${base_url}usuarioproyectos`;
        return this.http.get<UsuarioProyecto[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}usuarioproyectos/${id}`;
        return this.http.get<UsuarioProyecto>(url, this.headers);

    }

    eliminar(dato: UsuarioProyecto) {
        return this.http.post(`${base_url}UsuarioProyectos/Eliminar`, dato, this.headers);
    }


    actualizar(dato: UsuarioProyecto) {

        if (dato.Id <= 0) {
            return this.http.post(`${base_url}usuarioproyectos`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}usuarioproyectos/${dato.Id}`, dato, this.headers);
        }

    }

}


