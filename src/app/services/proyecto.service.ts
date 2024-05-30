import { Injectable } from '@angular/core';
import { Producto, Profesional, Proyecto, Tarea, TipoTarea } from '../models/entity.models';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {

    public proyectos: Proyecto[];
    public profesionales: Profesional[];
    public tiposTarea: TipoTarea[];

    constructor() {
        this.inicializarDatosDummy();
    }

    inicializarDatosDummy() {
        const fecIni = new Date();

        let profesional1: Profesional = { Id: 1, Apellido: 'APELLIDO 1', Nombre: 'NOMBRE 1' };
        let profesional2: Profesional = { Id: 2, Apellido: 'APELLIDO 2', Nombre: 'NOMBRE 2' };
        let profesional3: Profesional = { Id: 3, Apellido: 'APELLIDO 3', Nombre: 'NOMBRE 3' };

        this.profesionales = [profesional1, profesional2, profesional3];

        let producto1: Producto = { Id: 1, Descripcion: 'PRODUCTO ENTREGABLE #1' };
        let producto2: Producto = { Id: 2, Descripcion: 'PRODUCTO ENTREGABLE #2' };
        let producto3: Producto = { Id: 3, Descripcion: 'PRODUCTO ENTREGABLE #3' };

        let tipoMensual: TipoTarea = { Id: 1, Descripcion: 'MENSUAL' };
        let tipoEntregable: TipoTarea = { Id: 2, Descripcion: 'ENTREGABLE' };

        this.tiposTarea = [tipoMensual, tipoEntregable];

        let tareas: Tarea[] = [
            { Id: 1, Descripcion: 'REUNIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional1 },
            { Id: 2, Descripcion: 'REUNIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional2 },
            { Id: 3, Descripcion: 'REUNIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional3 },
            { Id: 4, Descripcion: 'PRESENTACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 6), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional1 },
            { Id: 5, Descripcion: 'HACER REGISTRO', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional2 },
            { Id: 6, Descripcion: 'HACER REGISTRO', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional3 },
            { Id: 7, Descripcion: 'HACER REGISTRO', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 2), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional1 },
            { Id: 8, Descripcion: 'RENOVACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional2 },
            { Id: 9, Descripcion: 'RENOVACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional3 },
            { Id: 10, Descripcion: 'RENOVACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, Profesional: profesional1 },
            { Id: 11, Descripcion: 'PRESENTACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 3), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional2 },
            { Id: 12, Descripcion: 'PRESENTACIÓN', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 1), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional3 },
            { Id: 13, Descripcion: 'Renovacion', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 1), Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, Profesional: profesional1 },
        ];

        this.proyectos = [
            { Id: 1, Descripcion: 'PROYECTO #001 CLIENTE 1', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto1.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 1), TareasFULL: tareas.filter(item => item.Profesional.Id === 1 && item.Id != 13) },
            { Id: 1, Descripcion: 'PROYECTO #002 CLIENTE 2', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto2, ProductoDescripcion: producto2.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 2), TareasFULL: tareas.filter(item => item.Profesional.Id === 2) },
            { Id: 1, Descripcion: 'PROYECTO #003 CLIENTE 3', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto3, ProductoDescripcion: producto3.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 3), TareasFULL: tareas.filter(item => item.Profesional.Id === 3) },
            { Id: 1, Descripcion: 'PROYECTO #004 CLIENTE 1', FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto3.Descripcion, Tareas: tareas.filter(item => item.Id === 13), TareasFULL: tareas.filter(item => item.Id === 13) },
        ];
    }

    agregarMeses(fecha: Date, meses: number): Date {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);
        return nuevaFecha;
    }
}
