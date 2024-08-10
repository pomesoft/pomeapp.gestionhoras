import { Component, OnDestroy, OnInit, PipeTransform, TemplateRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbOffcanvas, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, filter, from, map, of, reduce, startWith, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';


import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectosService } from '../../services/proyectos.service';
import { HelpersService } from '../../services/helpers.service';

import { DataFiltro, ItemListado, Profesional, RegistroHora } from '../../models/entity.models';


@Component({
    selector: 'app-reportegeneral',
    templateUrl: './reportegeneral.component.html',
    styles: [
    ]
})
export class ReportegeneralComponent implements OnInit, OnDestroy {
    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Reporte de Horas";

    filtrosSubs: Subscription;

    filtro = new FormControl('', { nonNullable: true });
    labelsFiltros: string[] = [];
    filtrosStore: DataFiltro;

    listadoFULL: RegistroHora[];
    listado$: Observable<RegistroHora[]>;

    totalHoras: number = 0;
    totalXProfesional: ItemListado[] = [];
    totalXFuncion: ItemListado[] = [];
    totalXCliente: ItemListado[] = [];
    totalXProyecto: ItemListado[] = [];

    search(text: string, pipe: PipeTransform): RegistroHora[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Proyecto.Cliente.Nombre.toLowerCase().includes(term) ||
                item.Proyecto.Descripcion.toLowerCase().includes(term) ||
                item.Profesional.Apellido.toLowerCase().includes(term) ||
                item.Profesional.Nombre.toLowerCase().includes(term) ||
                item.Funcion.Descripcion.toLowerCase().includes(term) ||
                item.FechaFormat.toLowerCase().includes(term) ||
                pipe.transform(item.Horas).startsWith(term)
            );
        });
    }


    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal,
        private pipeDecimal: DecimalPipe,
        private config: NgbPaginationConfig,
        private offcanvasService: NgbOffcanvas,
        private swalService: SwalhelperService,
        private proyectoService: ProyectosService,
        private helpersService: HelpersService,
    ) {
        this.listadoFULL = [];


        this.procesarListado();

    }

    ngOnInit(): void {

        this.countdown$.subscribe(() => {
            this.refreshDatos();
            this.cargando = false;
        });

        this.filtrosSubs = this.store.select('filtros')
            .subscribe(({ filtros }) => {
                this.filtrosStore = filtros;
                this.labelsFiltros = this.helpersService.cargarLabelsFiltros(this.filtrosStore);
                this.refreshDatosFiltros();
            });

        this.listado$.subscribe((datos: RegistroHora[]) => {
            this.agrupar(datos);
        });
    }

    ngOnDestroy(): void {
        this.filtrosSubs.unsubscribe();
    }

    procesarListado() {
        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map(
                (text) => this.search(text, this.pipeDecimal).map((item, i) => ({ id: i + 1, ...item }))
            ),
        );

        const totalHoras$ = this.listado$.pipe(
            map(datos => datos.reduce((acc, curr) => acc + (curr.Horas || 0), 0))
        );

        totalHoras$.subscribe(total => {
            console.log(`El total de horas es: ${total}`);
            this.totalHoras = total;
        });

    }


    async cargarDatos() {

        // await this.cargarMonedas()
        //     .then(result => {
        //         this.formulario.get('idMoneda').setValue(this.listadoMonedas[0].Id, { onlySelf: true, });
        //         this.cargarClientes();
        //     })
        //     .catch(err => {
        //         this.swalService.setToastError(`Ocurrió un error al cargar los datos`)
        //         console.log(err);
        //     });

    }

    refreshDatosFiltros() {
        /*
        if (this.filtrosStore.IdProfesional || this.filtrosStore.IdCliente || this.filtrosStore.IdProyecto || this.filtrosStore.IdTipoProyecto) {
            
            this.listadoFULL = this.proyectoService.horasRegistradas.filter(item => {

                var filtrarProfesional: boolean = true;
                if (this.filtrosStore.IdProfesional && this.filtrosStore.IdProfesional > 0)
                    filtrarProfesional = this.filtrosStore.IdProfesional == item.Profesional.Id;

                var filtrarCliente: boolean = true;
                if (this.filtrosStore.IdCliente && this.filtrosStore.IdCliente > 0)
                    filtrarCliente = this.filtrosStore.IdCliente == item.Cliente.Id;

                var filtrarProyecto: boolean = true;
                if (this.filtrosStore.IdProyecto && this.filtrosStore.IdProyecto > 0)
                    filtrarProyecto = this.filtrosStore.IdProyecto == item.Proyecto.Id;

                var filtrarTipoProyecto: boolean = true;
                if (this.filtrosStore.IdTipoProyecto && this.filtrosStore.IdTipoProyecto > 0)
                    filtrarTipoProyecto = this.filtrosStore.IdTipoProyecto == item.Proyecto.Tipo.Id;

                return filtrarProfesional && filtrarCliente && filtrarProyecto && filtrarTipoProyecto;

            });

        } else {
            this.listadoFULL = this.proyectoService.horasRegistradas;
        }

        this.refreshDatos();
        */
    }

    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    agrupar(
        datos: RegistroHora[]
    ) {
        this.totalXProfesional = [];
        this.totalXCliente = [];
        this.totalXProyecto = [];
        this.totalXFuncion = [];

        datos.forEach(registro => {

            //profesionales
            var _indexProf = this.totalXProfesional.findIndex(item => item.Id === registro.Profesional.Id);
            if (_indexProf >= 0)
                this.totalXProfesional[_indexProf].Valor += registro.Horas;
            else
                this.totalXProfesional.push(
                    {
                        Id: registro.Profesional.Id,
                        Descripcion: registro.Profesional.Apellido.concat(" ", registro.Profesional.Nombre),
                        Valor: registro.Horas
                    });

            //clientes
            var _indexCli = this.totalXCliente.findIndex(item => item.Id === registro.Proyecto.Cliente.Id);
            if (_indexCli >= 0)
                this.totalXCliente[_indexCli].Valor += registro.Horas;
            else
                this.totalXCliente.push(
                    {
                        Id: registro.Proyecto.Cliente.Id,
                        Descripcion: registro.Proyecto.Cliente.Nombre,
                        Valor: registro.Horas
                    });

            //proyectos
            var _indexProy = this.totalXProyecto.findIndex(item => item.Id === registro.Proyecto.Id);
            if (_indexProy >= 0)
                this.totalXProyecto[_indexProy].Valor += registro.Horas;
            else
                this.totalXProyecto.push(
                    {
                        Id: registro.Proyecto.Id,
                        Descripcion: `${registro.Cliente.Nombre} - ${registro.Proyecto.Descripcion}`,
                        Valor: registro.Horas
                    });


            //funciones
            var _indexProy = this.totalXFuncion.findIndex(item => item.Id === registro.Funcion.Id);
            if (_indexProy >= 0)
                this.totalXFuncion[_indexProy].Valor += registro.Horas;
            else
                this.totalXFuncion.push(
                    {
                        Id: registro.Funcion.Id,
                        Descripcion: registro.Funcion.Descripcion,
                        Valor: registro.Horas
                    });
        });
    }

    onClickAbrirOffcanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'end', panelClass: 'filtros-panel' });
    }

}
