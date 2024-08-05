import { Injectable } from '@angular/core';
import { Cliente, Producto, Profesional, Proyecto, RegistroHora, Rol, RolFuncion, Tarea, TipoProyecto } from '../models/entity.models';
import { HelpersService } from './helpers.service';
import { Observable, from, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {

    public clientes: Cliente[];
    public proyectos: Proyecto[];
    public proyectosABM: Proyecto[];
    public profesionales: Profesional[];
    public tiposProyecto: TipoProyecto[];
    public horasRegistradas: RegistroHora[];
    public roles: Rol[];


    constructor(
        private helpersService: HelpersService
    ) {
        this.inicializarDatosDummy();
    }


    listar(): Observable<Proyecto[]> {
        return of(this.proyectosABM);
    }

    obtener(id: number): Observable<Proyecto> {
        return of(this.proyectosABM.find(item => item.Id == id));
    }

    actualizar(
        data: Proyecto
    ): Observable<Proyecto> {
        // const url = `${this.base_url}Proyecto`;
        // return this.http.post<Proyecto>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<Proyecto> {
        //const url = `${base_url}Proyecto/eliminar/${id}`;
        // return this.http.post<Proyecto>(url, data, this.headers);
        return this.obtener(id);
    }

    inicializarDatosDummy() {
        const fecIni = new Date();
        let fechaRegistro: string = this.helpersService.getFechaActual();

        const fecIniFormat: string = this.helpersService.parserDate(fecIni);

        this.proyectosABM = [
            { Id: 1, Codigo: '2-21-3001-PVR-RepS-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 2, Codigo: '4-21-3033-RPR-HOST-BRA', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 3, Codigo: '6-21-3002-RPL-DT-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 4, Codigo: '7-21-3003-PVR-PC-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 5, Codigo: '8-21-3034-RFL-HOST-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 6, Codigo: '12-18-3020-PVR-PC-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 7, Codigo: '14-21-3011-RFL-HOST-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 8, Codigo: '18-21-3011-RFL-HOST-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 9, Codigo: '21-21-3012-RFL-DT-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 10, Codigo: '23-19-3000-PVR-PC-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 11, Codigo: '24-19-3000-PVR-RevL-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 12, Codigo: '25-21-3022-RFR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 13, Codigo: '27-21-3023-PVL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 14, Codigo: '34-20-3040-PVR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 15, Codigo: '37-20-3039-RFL-HOST-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 16, Codigo: '38-21-3028-RFL-DT-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 17, Codigo: '43-21-3006-T-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 18, Codigo: '51-21-3017-PVR-PC-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 19, Codigo: '59-21-3019-PVL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 20, Codigo: '67-21-3046-RFL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 21, Codigo: '68-21-3064-RFL-DT-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 22, Codigo: '69-21-3056-RFR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 23, Codigo: '76-21-3028-PVL-RepS-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 24, Codigo: '118-22-3045-PVR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 25, Codigo: '121-22-3065-RFL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 26, Codigo: '123-22-3045-RFR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 27, Codigo: '125-22-3066-RFR-XX-BRA', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 28, Codigo: '126-22-3071-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 29, Codigo: '146-22-3011-RPL-RGHost-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 30, Codigo: '156-23-3011-RPL-RGHost-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 31, Codigo: '176-23-3045-RFR-XX-CHL', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 32, Codigo: '177-23-3045-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 33, Codigo: '180-23-3015-RFR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 34, Codigo: '181-23-3015-RFL-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 35, Codigo: '182-23-3081-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 36, Codigo: '183-23-3015-PVR-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 37, Codigo: '185-23-3011-RCL-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 38, Codigo: '187-23-3045-R-XX-MEX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 39, Codigo: '189-23-3045-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 40, Codigo: '190-23-3070-RFL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 41, Codigo: '191-23-3001-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 42, Codigo: '194-23-3083-R-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 43, Codigo: '202-23-3005-IP-XX-XX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 44, Codigo: '204-23-3039-RFR-XX-LATAM', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 45, Codigo: '209-24-3033-RPR-XX-BRA', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 46, Codigo: '213-24-3077-RFR-XX-CHL', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 47, Codigo: '214-24-3039-RFL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 48, Codigo: '216-24-3075-RPL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 49, Codigo: '217-24-3042-RPL-XX-ARG', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
            { Id: 50, Codigo: '218-24-3071-RFR-XX-MEX', DiaCierre: 30, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12) },
        ];

        this.clientes = [
            { Id: 1, Codigo: '1', Nombre: 'ADIUM' },
            { Id: 2, Codigo: '2', Nombre: 'AMGEN' },
            { Id: 3, Codigo: '3', Nombre: 'ASOFARMA' },
            { Id: 4, Codigo: '4', Nombre: 'ASTRAZENECA' },
            { Id: 5, Codigo: '5', Nombre: 'ADIUM' },
            { Id: 6, Codigo: '6', Nombre: 'AMGEN' },
            { Id: 7, Codigo: '7', Nombre: 'ASOFARMA' },
            { Id: 8, Codigo: '8', Nombre: 'ASTRAZENECA' },
            { Id: 9, Codigo: '9', Nombre: 'BIOSIDUS' },
            { Id: 10, Codigo: '10', Nombre: 'COCHLEAR' },
            { Id: 11, Codigo: '11', Nombre: 'CSL BEHRING' },
            { Id: 12, Codigo: '12', Nombre: 'FERRING AR' },
            { Id: 13, Codigo: '13', Nombre: 'FERRING LAPD' },
            { Id: 14, Codigo: '14', Nombre: 'GRUNENTHAL' },
            { Id: 15, Codigo: '15', Nombre: 'GRUPO BIOTOSCANA' },
            { Id: 16, Codigo: '16', Nombre: 'ICON' },
            { Id: 17, Codigo: '17', Nombre: 'IMG' },
            { Id: 18, Codigo: '18', Nombre: 'INJEX' },
            { Id: 19, Codigo: '19', Nombre: 'INVAP' },
            { Id: 20, Codigo: '20', Nombre: 'LIF SE' },
            { Id: 21, Codigo: '21', Nombre: 'MEGA LABS' },
            { Id: 22, Codigo: '22', Nombre: 'MERZ' },
            { Id: 23, Codigo: '23', Nombre: 'NESTLE HEALTH CARE' },
            { Id: 24, Codigo: '24', Nombre: 'NUTRAPHARM' },
            { Id: 25, Codigo: '25', Nombre: 'OCTAPHARMA' },
            { Id: 26, Codigo: '26', Nombre: 'PHARMACONSULT' },
            { Id: 27, Codigo: '27', Nombre: 'PHARMALEX' },
            { Id: 28, Codigo: '28', Nombre: 'PHARMEX' },
            { Id: 29, Codigo: '29', Nombre: 'SANDOZ- NOVARTIS' },
            { Id: 30, Codigo: '30', Nombre: 'SANOFI AR' },
            { Id: 31, Codigo: '31', Nombre: 'SANOFI BR' },
            { Id: 32, Codigo: '32', Nombre: 'TEVA' },
            { Id: 33, Codigo: '33', Nombre: 'BMS' },
        ];


        this.roles = [
            { Id: 1, Descripcion: 'EXPERTO REGULATORIO' },
            { Id: 2, Descripcion: 'EXPERTO FARMACOVIGILANCIA' },
            { Id: 3, Descripcion: 'EXPERTO MEDICO' },
            { Id: 4, Descripcion: 'EXPERTO COMPLIANCE' },
            { Id: 5, Descripcion: 'EXPERTO LEGAL' },
            { Id: 6, Descripcion: 'PROJECT MANAGER' },
            { Id: 7, Descripcion: 'ANALISTA SENIOR' },
            { Id: 8, Descripcion: 'ANALISTA JUNIOR' },
            { Id: 9, Descripcion: 'TECNICO ADMINISTRATIVO' },
            { Id: 10, Descripcion: 'GESTORÍA' },
        ];


        let profesional1: Profesional = { Id: 1, Apellido: 'APELLIDO 1', Nombre: 'NOMBRE 1', Funcion: { Id: 6, Descripcion: 'PROJECT MANAGER' } };
        let profesional2: Profesional = { Id: 2, Apellido: 'APELLIDO 2', Nombre: 'NOMBRE 2', Funcion: { Id: 7, Descripcion: 'ANALISTA SENIOR' } };
        let profesional3: Profesional = { Id: 3, Apellido: 'APELLIDO 3', Nombre: 'NOMBRE 3', Funcion: { Id: 8, Descripcion: 'ANALISTA JUNIOR' } };
        let profesional4: Profesional = { Id: 4, Apellido: 'APELLIDO 4', Nombre: 'NOMBRE 4', Funcion: { Id: 1, Descripcion: 'EXPERTO REGULATORIO' } };


        this.profesionales = [profesional1, profesional2, profesional3, profesional4];

        let producto1: Producto = { Id: 1, Descripcion: 'PRODUCTO ENTREGABLE #1' };
        let producto2: Producto = { Id: 2, Descripcion: 'PRODUCTO ENTREGABLE #2' };
        let producto3: Producto = { Id: 3, Descripcion: 'PRODUCTO ENTREGABLE #3' };

        let tipoMensual: TipoProyecto = { Id: 1, Descripcion: 'MENSUALIZADO' };
        let tipoEntregable: TipoProyecto = { Id: 2, Descripcion: 'ENTREGABLE' };

        this.tiposProyecto = [tipoMensual, tipoEntregable];


        let rolAsignado1: RolFuncion = { Id: 1, Rol: this.roles.find(r => r.Id == 1), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado2: RolFuncion = { Id: 2, Rol: this.roles.find(r => r.Id == 2), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado3: RolFuncion = { Id: 3, Rol: this.roles.find(r => r.Id == 3), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado6: RolFuncion = { Id: 6, Rol: this.roles.find(r => r.Id == 6), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado7: RolFuncion = { Id: 7, Rol: this.roles.find(r => r.Id == 7), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado8: RolFuncion = { Id: 8, Rol: this.roles.find(r => r.Id == 8), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };
        let rolAsignado9: RolFuncion = { Id: 9, Rol: this.roles.find(r => r.Id == 9), HorasAsignadas: 0, Periodo: 1, RegistroFecha: this.helpersService.parserDate(fecIni), RegistroHoras: 0 };


        let proyecto1: Proyecto = { Id: 1, Codigo: '2-21-3001-PVR-RepS-XX', Descripcion: '2-21-3001-PVR-RepS-XX', Cliente: this.clientes.find(c => c.Id == 1), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto1.Descripcion, RolesAsignados: [rolAsignado1, rolAsignado3, rolAsignado6, rolAsignado7] };
        let proyecto2: Proyecto = { Id: 2, Codigo: '4-21-3033-RPR-HOST-BRA', Descripcion: '4-21-3033-RPR-HOST-BRA', Cliente: this.clientes.find(c => c.Id == 2), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto2, ProductoDescripcion: producto2.Descripcion, RolesAsignados: [rolAsignado1, rolAsignado2, rolAsignado3, rolAsignado6, rolAsignado7, rolAsignado8] };
        let proyecto3: Proyecto = { Id: 3, Codigo: '6-21-3002-RPL-DT-ARG', Descripcion: '6-21-3002-RPL-DT-ARG', Cliente: this.clientes.find(c => c.Id == 3), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto3, ProductoDescripcion: producto3.Descripcion, RolesAsignados: [rolAsignado6, rolAsignado7, rolAsignado8] };
        let proyecto4: Proyecto = { Id: 4, Codigo: '7-21-3003-PVR-PC-XX', Descripcion: '7-21-3003-PVR-PC-XX', Cliente: this.clientes.find(c => c.Id == 4), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto3.Descripcion, RolesAsignados: [rolAsignado1, rolAsignado6, rolAsignado7] };
        let proyecto5: Proyecto = { Id: 5, Codigo: '8-21-3034-RFL-HOST-ARG', Descripcion: '8-21-3034-RFL-HOST-ARG', Cliente: this.clientes.find(c => c.Id == 1), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto1.Descripcion, RolesAsignados: [rolAsignado6, rolAsignado7, rolAsignado8, rolAsignado9] };
        let proyecto6: Proyecto = { Id: 6, Codigo: '12-18-3020-PVR-PC-XX', Descripcion: '12-18-3020-PVR-PC-XX', Cliente: this.clientes.find(c => c.Id == 2), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto3.Descripcion, RolesAsignados: [rolAsignado1, rolAsignado3, rolAsignado6, rolAsignado7] };


        this.proyectos = [
            proyecto1, proyecto2, proyecto3, proyecto4, proyecto5, proyecto6,
        ];


        this.horasRegistradas = [
            { Id: 1, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 160, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 1, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 2, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 3, Profesional: profesional3, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 4, Profesional: profesional1, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: 'No aplica' },
            { Id: 5, Profesional: profesional2, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 6, Profesional: profesional3, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 7, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 8, Profesional: profesional2, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 8.5, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 9, Profesional: profesional3, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2.5, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' }, { Id: 10, Profesional: profesional1, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 11, Profesional: profesional1, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 12, Profesional: profesional1, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 13, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 12, Detalle: 'No aplica' },
            { Id: 14, Profesional: profesional2, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 15, Profesional: profesional3, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 16, Profesional: profesional1, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 17, Profesional: profesional2, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 18, Profesional: profesional3, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1.5, Detalle: 'No aplica' },
            { Id: 19, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'Reuniones' },
            { Id: 20, Profesional: profesional2, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 21, Profesional: profesional3, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1.5, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 22, Profesional: profesional1, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 23, Profesional: profesional2, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 24, Profesional: profesional3, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 8, Detalle: 'No aplica' },
            { Id: 25, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Reuniones' },
            { Id: 26, Profesional: profesional2, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 27, Profesional: profesional3, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 28, Profesional: profesional1, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 29, Profesional: profesional2, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 12, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 30, Profesional: profesional3, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'No aplica' },
            { Id: 31, Profesional: profesional1, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'Reuniones' },
            { Id: 32, Profesional: profesional2, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 33, Profesional: profesional3, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 34, Profesional: profesional1, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 35, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 36, Profesional: profesional3, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: 'No aplica' },
            { Id: 37, Profesional: profesional1, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Reuniones' },
            { Id: 38, Profesional: profesional2, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 39, Profesional: profesional3, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 40, Profesional: profesional1, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 8, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 41, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 42, Profesional: profesional3, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'No aplica' },
            { Id: 43, Profesional: profesional1, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'Reuniones' },
            { Id: 44, Profesional: profesional2, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: '' },
            { Id: 45, Profesional: profesional3, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 12, Detalle: '' },
            { Id: 46, Profesional: profesional1, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 47, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: 'Zyprexa - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 48, Profesional: profesional3, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'Gemtro - recepción de solicitud de actualización de textos, descarga, revisión preliminar de documentos de partida' },
            { Id: 49, Profesional: profesional1, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: 'GEMTRO / Gemcitabina - double check y cruce final entre PI & PIL locales actualizados y ambos vs referencia internacional - enttrega al cliente' },
            { Id: 50, Profesional: profesional2, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: 'No aplica' },
            { Id: 51, Profesional: profesional3, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: 'Reuniones' },
            { Id: 52, Profesional: profesional1, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: '' },
            { Id: 53, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 12, Detalle: '' },
            { Id: 54, Profesional: profesional3, Cliente: proyecto2.Cliente, Proyecto: proyecto2, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: '' },
            { Id: 55, Profesional: profesional1, Cliente: proyecto3.Cliente, Proyecto: proyecto3, Funcion: profesional1.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 5, Detalle: '' },
            { Id: 56, Profesional: profesional2, Cliente: proyecto4.Cliente, Proyecto: proyecto4, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: '' },
            { Id: 57, Profesional: profesional3, Cliente: proyecto5.Cliente, Proyecto: proyecto5, Funcion: profesional3.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 2, Detalle: '' },
            { Id: 58, Profesional: profesional2, Cliente: proyecto6.Cliente, Proyecto: proyecto6, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 1, Detalle: '' },
            { Id: 59, Profesional: profesional2, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional2.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 3, Detalle: '' },
            { Id: 60, Profesional: profesional4, Cliente: proyecto1.Cliente, Proyecto: proyecto1, Funcion: profesional4.Funcion, Fecha: fecIni, FechaFormat: fecIniFormat, Horas: 4, Detalle: '' },

        ];
    }

    agregarMeses(fecha: Date, meses: number): Date {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);
        return nuevaFecha;
    }


    obtenerPorfesionales(): Observable<Profesional[]> {
        return of(this.profesionales);
    }

}

