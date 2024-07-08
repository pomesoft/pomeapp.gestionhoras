import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Cliente } from '../models/entity.models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private clientes: Cliente[];

    private base_url = environment.base_url;

    constructor(
        private http: HttpClient
    ) {
        
        this.clientes = [
            { Id: 1, Nombre: 'ADIUM' },
            { Id: 2, Nombre: 'AMGEN' },
            { Id: 3, Nombre: 'ASOFARMA' },
            { Id: 4, Nombre: 'ASTRAZENECA' },
            { Id: 5, Nombre: 'ADIUM' },
            { Id: 6, Nombre: 'AMGEN' },
            { Id: 7, Nombre: 'ASOFARMA' },
            { Id: 8, Nombre: 'ASTRAZENECA' },
            { Id: 9, Nombre: 'BIOSIDUS' },
            { Id: 10, Nombre: 'COCHLEAR' },
            { Id: 11, Nombre: 'CSL BEHRING' },
            { Id: 12, Nombre: 'FERRING AR' },
            { Id: 13, Nombre: 'FERRING LAPD' },
            { Id: 14, Nombre: 'GRUNENTHAL' },
            { Id: 15, Nombre: 'GRUPO BIOTOSCANA' },
            { Id: 16, Nombre: 'ICON' },
            { Id: 17, Nombre: 'IMG' },
            { Id: 18, Nombre: 'INJEX' },
            { Id: 19, Nombre: 'INVAP' },
            { Id: 20, Nombre: 'LIF SE' },
            { Id: 21, Nombre: 'MEGA LABS' },
            { Id: 22, Nombre: 'MERZ' },
            { Id: 23, Nombre: 'NESTLE HEALTH CARE' },
            { Id: 24, Nombre: 'NUTRAPHARM' },
            { Id: 25, Nombre: 'OCTAPHARMA' },
            { Id: 26, Nombre: 'PHARMACONSULT' },
            { Id: 27, Nombre: 'PHARMALEX' },
            { Id: 28, Nombre: 'PHARMEX' },
            { Id: 29, Nombre: 'SANDOZ- NOVARTIS' },
            { Id: 30, Nombre: 'SANOFI AR' },
            { Id: 31, Nombre: 'SANOFI BR' },
            { Id: 32, Nombre: 'TEVA' },
            { Id: 33, Nombre: 'BMS' },
        ];        
    }

    listar(): Observable<Cliente[]> {
        return of(this.clientes);
    }

    obtener(id: number): Observable<Cliente> {
        return of(this.clientes.find(item => item.Id == id));
    }

    actualizar(
        data: Cliente
    ): Observable<Cliente> {
        // const url = `${this.base_url}Cliente`;
        // return this.http.post<Cliente>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<Cliente> {
        //const url = `${base_url}Cliente/eliminar/${id}`;
        // return this.http.post<Cliente>(url, data, this.headers);
        return this.obtener(id);
    }
}
