import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';

import { FiltroListadoRegistroDTO, Proyecto, TipoProyecto, Usuario } from '../models/entity.models';



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


    listar(
        listarVigentes: boolean = true,
        listarFuncionesAsignadas: boolean = false,
        clienteId: number = -1,
        usuarioId: number = -1,
    ) {
        const url = `${base_url}Proyectos?listarVigentes=${listarVigentes}
                                        &listarFuncionesAsignadas=${listarFuncionesAsignadas}
                                        &clienteId=${clienteId}
                                        &usuarioId=${usuarioId}`;
        
        return this.http.get<Proyecto[]>(url, this.headers)
    }

    listarRegistroHoras(filtro: FiltroListadoRegistroDTO) {

        const url = `${base_url}Proyectos/ListarRegistroHoras`;
        return this.http.post(url, filtro, this.headers);
    }

    listarPorUsuario(usuarioId: number) {

        const url = `${base_url}Proyectos/ListarProyectoPorUsuario/${usuarioId}`;
        return this.http.get<Proyecto[]>(url);
    }

    listarUsuariosPorProyecto(proyectoId: number) {

        const url = `${base_url}Proyectos/ListarUsuariorPorProyecto/${proyectoId}`;
        return this.http.get<Usuario[]>(url);
    }

    obtener(id: number) {

        const url = `${base_url}Proyectos/${id}`;
        return this.http.get<Proyecto>(url, this.headers);

    }

    desactivar(id: number) {

        const url = `${base_url}Proyectos/Desactivar/${id}`;
        return this.http.post(url, this.headers);
    }


    actualizar(dato: Proyecto) {
        if (dato.Id <= 0) {
            return this.http.post(`${base_url}Proyectos`, dato, this.headers);
        } else {
            return this.http.put(`${base_url}Proyectos/${dato.Id}`, dato, this.headers);
        }

    }

}

