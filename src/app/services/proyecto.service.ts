import { Injectable } from '@angular/core';
import { Cliente, Producto, Profesional, Proyecto, Tarea, TipoProyecto } from '../models/entity.models';
import { HelpersService } from './helpers.service';

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {

    public clientes: Cliente[];
    public proyectos: Proyecto[];
    public profesionales: Profesional[];
    public tiposProyecto: TipoProyecto[];

    constructor(
        private helpersService: HelpersService
    ) {
        this.inicializarDatosDummy();
    }

    inicializarDatosDummy() {
        const fecIni = new Date();
        let fechaRegistro: string = this.helpersService.getFechaActual();
        console.log(fechaRegistro);

        let cliente1: Cliente = { Id: 1, Nombre: 'CLIENTE 1' }
        let cliente2: Cliente = { Id: 2, Nombre: 'CLIENTE 2' }
        let cliente3: Cliente = { Id: 3, Nombre: 'CLIENTE 3' }
        let cliente4: Cliente = { Id: 4, Nombre: 'CLIENTE 4' }

        this.clientes = [cliente1, cliente2, cliente3, cliente4];


        let profesional1: Profesional = { Id: 1, Apellido: 'APELLIDO 1', Nombre: 'NOMBRE 1' };
        let profesional2: Profesional = { Id: 2, Apellido: 'APELLIDO 2', Nombre: 'NOMBRE 2' };
        let profesional3: Profesional = { Id: 3, Apellido: 'APELLIDO 3', Nombre: 'NOMBRE 3' };

        this.profesionales = [profesional1, profesional2, profesional3];

        let producto1: Producto = { Id: 1, Descripcion: 'PRODUCTO ENTREGABLE #1' };
        let producto2: Producto = { Id: 2, Descripcion: 'PRODUCTO ENTREGABLE #2' };
        let producto3: Producto = { Id: 3, Descripcion: 'PRODUCTO ENTREGABLE #3' };

        let tipoMensual: TipoProyecto = { Id: 1, Descripcion: 'MENSUALIZADO' };
        let tipoEntregable: TipoProyecto = { Id: 2, Descripcion: 'ENTREGABLE' };

        this.tiposProyecto = [tipoMensual, tipoEntregable];

        let tareas: Tarea[] = [
            { Id: 1, Descripcion: 'REUNIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional1, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 2},
            { Id: 2, Descripcion: 'REUNIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional2, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 3, Descripcion: 'REUNIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional3, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 4, Descripcion: 'PRESENTACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 6), Profesional: profesional1, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 3},
            { Id: 5, Descripcion: 'HACER REGISTRO', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional2, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 6, Descripcion: 'HACER REGISTRO', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional3, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 7, Descripcion: 'HACER REGISTRO', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 2), Profesional: profesional1, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 2},
            { Id: 8, Descripcion: 'RENOVACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional2, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 9, Descripcion: 'RENOVACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional3, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 10, Descripcion: 'RENOVACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 12), Profesional: profesional1, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 11, Descripcion: 'PRESENTACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 3), Profesional: profesional2, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 12, Descripcion: 'PRESENTACIÓN', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 1), Profesional: profesional3, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
            { Id: 13, Descripcion: 'TRADUCCIÓN PROTOCOLO', FechaInicio: this.agregarMeses(fecIni, -5), FechaFin: this.agregarMeses(fecIni, 1), Profesional: profesional1, FechaRegistro: fechaRegistro, HorasRegistro: 0, Periodo: 1},
        ];

        this.proyectos = [
            { Id: 1, Descripcion: 'PROYECTO #001', Cliente: cliente1, Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto1.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 1), TareasFULL: tareas.filter(item => item.Profesional.Id === 1 && item.Id != 13) },
            { Id: 2, Descripcion: 'PROYECTO #002', Cliente: cliente2, Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto2, ProductoDescripcion: producto2.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 2), TareasFULL: tareas.filter(item => item.Profesional.Id === 2) },
            { Id: 3, Descripcion: 'PROYECTO #003', Cliente: cliente3, Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto3, ProductoDescripcion: producto3.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 3), TareasFULL: tareas.filter(item => item.Profesional.Id === 3) },
            { Id: 4, Descripcion: 'PROYECTO #004', Cliente: cliente4, Tipo: tipoMensual, TipoDescripcion: tipoMensual.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto3.Descripcion, Tareas: tareas.filter(item => item.Id === 13), TareasFULL: tareas.filter(item => item.Id === 13) },
            { Id: 5, Descripcion: 'PROYECTO #005', Cliente: cliente1, Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto1.Descripcion, Tareas: tareas.filter(item => item.Profesional.Id === 1), TareasFULL: tareas.filter(item => item.Profesional.Id === 1 && item.Id != 13) },
            { Id: 6, Descripcion: 'PROYECTO #006', Cliente: cliente2, Tipo: tipoEntregable, TipoDescripcion: tipoEntregable.Descripcion, FechaInicio: fecIni, FechaFin: this.agregarMeses(fecIni, 12), Producto: producto1, ProductoDescripcion: producto3.Descripcion, Tareas: tareas.filter(item => item.Id === 13), TareasFULL: tareas.filter(item => item.Id === 13) },
        ];
    }

    agregarMeses(fecha: Date, meses: number): Date {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);
        return nuevaFecha;
    }
}

