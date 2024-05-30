import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menu: any[] = [
        { titulo: 'Inicio', icono: 'mdi mdi-gauge', url: '' },
        { titulo: 'Reporte de Horas', icono: 'mdi mdi-clipboard-text', url: 'reportehoras' },
        { titulo: 'Registro de Horas', icono: 'mdi mdi-calendar-clock', url: 'registrohoras' },
        { titulo: 'Planning', icono: 'mdi mdi-calendar-check', url: 'planning' },
        { titulo: 'Configuración', icono: 'mdi mdi-settings', url: 'configuracion' },
        { titulo: 'Usuarios', icono: 'mdi mdi-account-multiple', url: 'usuarios' },
    ];

    constructor() { }
}
