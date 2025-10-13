import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    menu: any[] = [
        { titulo: 'Inicio', icono: 'mdi mdi-gauge', url: '', nivelAcceso: 10 },
        //{ titulo: 'AgenteIA', icono: 'mdi mdi-gauge', url: 'agenteia', nivelAcceso: 10 },
        { titulo: 'Registro de Horas', icono: 'mdi mdi-calendar-clock', url: 'registrohoras', nivelAcceso: 10 },
        // { titulo: 'Mis Proyectos', icono: 'mdi mdi-account', url: 'misproyectos', nivelAcceso: 10 },
        { titulo: 'Asignación', icono: 'mdi mdi-calendar-check', url: 'asignacion', nivelAcceso: 20 },
        { titulo: 'Reporte de Horas', icono: 'mdi mdi-clipboard-text', url: 'reportehoras', nivelAcceso: 10 },
        { titulo: 'Usuarios', icono: 'mdi mdi-account-multiple', url: 'usuarios', nivelAcceso: 30 },
        //{ titulo: 'Configuración', icono: 'mdi mdi-settings', url: 'configuracion' },
    ];
    

    constructor() { }
}
