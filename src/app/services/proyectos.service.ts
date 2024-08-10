import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { Proyecto, ProyectoDTO, TipoProyecto } from '../models/entity.models';
import { HelpersService } from './helpers.service';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ProyectosService {

    public tiposProyecto: TipoProyecto[];
    public proyectos: Proyecto[];

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
    ) {
        this.tiposProyecto = [
            { Id: 1, Descripcion: 'MENSUALIZADO', Vigente: true },
            { Id: 2, Descripcion: 'ENTREGABLE', Vigente: true },
        ];
    }


    inicializar() {
        return new Promise<boolean>((resolve, reject) => {
            this.listar()
                .subscribe({
                    next: (response) => {
                        this.proyectos = response;
                        resolve(true)
                    },
                    error: (error) => reject(<any>error),
                });
        });
    }

    listar(listarVigentes: boolean = true) {
        const url = `${base_url}Proyectos?listarVigentes=${listarVigentes}`;
        return this.http.get<Proyecto[]>(url, this.headers)
    }

    obtener(id: number) {

        const url = `${base_url}Proyectos/${id}`;
        return this.http.get<Proyecto>(url, this.headers);

    }

    desactivar(id: number) {

        const url = `${base_url}Proyectos/Desactivar/${id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: ProyectoDTO) {
        console.log('dato', JSON.stringify(dato));
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}Proyectos`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}Proyectos/${dato.Id}`, dato, this.headers);
        }

    }

}

