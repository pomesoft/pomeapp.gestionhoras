import { AfterContentInit, Component, OnDestroy, OnInit, PipeTransform, TemplateRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NgbModal, NgbOffcanvas, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, filter, from, map, of, reduce, startWith, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';


import { SwalhelperService } from '../../services/swalhelper.service';
import { HelpersService } from '../../services/helpers.service';
import { RegistroHorasService } from '../../services/registro-horas.service';
import { UsuarioService } from '../../services/usuario.service';
import { ExcelService } from '../../services/excel.service';

import { DataFiltro, DatosExportarExcel, FiltroListadoRegistroDTO, ItemListado, ReporteItem } from '../../models/entity.models';
import { setFiltros } from 'src/app/store/actions';


@Component({
    selector: 'app-reportegeneral',
    templateUrl: './reportegeneral.component.html',
    styles: [
    ]
})
export class ReportegeneralComponent implements OnInit, AfterContentInit, OnDestroy {
    cargando: boolean = true;
    error: boolean = false;

    countdown$ = timer(500);

    tituloFormulario: string = "Reporte de Horas";

    filtrosSubs: Subscription;

    filtro = new FormControl('', { nonNullable: true });
    labelsFiltros: string[] = [];
    filtrosStore: DataFiltro;

    listadoFULL: ReporteItem[];
    listado$: Observable<ReporteItem[]>;

    totalHoras: number = 0;
    totalXUsuario: ItemListado[] = [];
    totalXProyecto: ItemListado[] = [];

    totalXFuncion: ItemListado[] = [];
    totalXCliente: ItemListado[] = [];

    datosExcel: DatosExportarExcel;

    cargarSubItems: boolean = true;

    search(text: string, pipe: PipeTransform): ReporteItem[] {
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            return (
                item.Cliente.toLowerCase().includes(term) ||
                item.CodigoProyecto.toLowerCase().includes(term) ||
                item.Usuario.toLowerCase().includes(term) ||
                item.FuncionaAsignada.toLowerCase().includes(term) ||
                item.ClasificacionDeActividad.toLowerCase().includes(term) ||
                item.DetalleYProducto.toLowerCase().includes(term) ||
                item.Fecha.toLowerCase().includes(term) ||
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
        private registroHorasService: RegistroHorasService,
        private helpersService: HelpersService,
        private excelService: ExcelService,
        private usuarioService: UsuarioService,
    ) {
        this.listadoFULL = [];


        this.procesarListado();

    }

    ngOnInit(): void {

        this.filtrosSubs = this.store.select('filtros')
            .subscribe(({ filtros }) => {
                this.filtrosStore = filtros;                
                this.labelsFiltros = this.helpersService.cargarLabelsFiltros(this.filtrosStore);
                this.cargarDatos();
            });

        this.listado$.subscribe((datos: ReporteItem[]) => {
            this.agrupar(datos);
            this.procesarDatosExcel(datos);
        });

        this.cargarDatos();
    }

    ngAfterContentInit(): void {

        const filtroInicial: DataFiltro = {
            Meses: 0,
            PeriodoFechas: 1,
            PeriodoRegistro: null,
            FechaDesde: null,
            FechaHasta:null,
            Usuario: this.usuarioService.usuario,
            Cliente: null,
            Proyecto: null,
            Funcion: null,
            ClasificacionActividad: null,
            Pagina: 0,
            CantidadRegistros: 0,
            CargarDatos: false,
        };

        this.store.dispatch(setFiltros({ filtros: filtroInicial }));
        
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

        // const totalHoras$ = this.listado$.pipe(
        //     map(datos => datos.reduce((acc, curr) => acc + (curr.Horas || 0.0), 0.0))
        // );

        // totalHoras$.subscribe(total => {
        //     this.totalHoras = total;
        // });

    }


    async cargarDatos() {

        this.cargando = true;

        await this.listarReporte()
            .then(result => {
                this.listadoFULL = result;
                this.refreshDatos();
            })
            .catch(err => {
                this.swalService.setToastError(`Ocurrió un error al cargar los datos`)
                console.log(err);
            })
            .finally(() => this.cargando = false);

    }

    listarReporte() {
        return new Promise<ReporteItem[]>((resolve, reject) => {

            var filtro: FiltroListadoRegistroDTO = {
                UsuarioId: this.filtrosStore.Usuario ? this.filtrosStore.Usuario.Id : -1,
                ClienteId: this.filtrosStore.Cliente ? this.filtrosStore.Cliente.Id : -1,
                ProyectoId: this.filtrosStore.Proyecto ? this.filtrosStore.Proyecto.Id : -1,
                FuncionaAsignadaId: this.filtrosStore.Funcion ? this.filtrosStore.Funcion.Id : -1,
                FechaDesde: this.filtrosStore.FechaDesde,
                FechaHasta: this.filtrosStore.FechaHasta,
                PeriodoFechas: this.filtrosStore.PeriodoFechas,
                PeriodoRegistro: this.filtrosStore.PeriodoRegistro ? this.filtrosStore.PeriodoRegistro : '',
            };

            this.registroHorasService.listarReporte(filtro)
                .subscribe({
                    next: (response: ReporteItem[]) => resolve(response),
                    error: (error) => reject(<any>error),
                });
        });
    }


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }

    agrupar(
        datos: ReporteItem[]
    ) {
        this.totalHoras = 0;
        this.totalXUsuario = [];
        this.totalXCliente = [];
        this.totalXProyecto = [];
        this.totalXFuncion = [];
        
        datos.forEach(reporteItem => {

            this.totalHoras += reporteItem.Horas;


            //proyectos
            var _indexProy = this.totalXProyecto.findIndex(item => item.Id === reporteItem.ProyectoId);
            if (_indexProy >= 0)
                this.totalXProyecto[_indexProy].Valor += reporteItem.Horas;
            else
                this.totalXProyecto.push(
                    {
                        Id: reporteItem.ProyectoId,
                        Descripcion: `${reporteItem.Cliente}`,
                        Descripcion2: `${reporteItem.CodigoProyecto}`,
                        Valor: reporteItem.Horas,
                        SubItems: [],
                    });


            //usuarios
            var _indexProf = this.totalXUsuario.findIndex(item => item.Id === reporteItem.UsuarioId);
            if (_indexProf >= 0)
                this.totalXUsuario[_indexProf].Valor += reporteItem.Horas;
            else
                this.totalXUsuario.push(
                    {
                        Id: reporteItem.UsuarioId,
                        Descripcion: reporteItem.Usuario,
                        Valor: reporteItem.Horas,
                        SubItems: [],
                    });

            // //funciones
            // var _indexProy = this.totalXFuncion.findIndex(item => item.Id === reporteItem.FuncionId);
            // if (_indexProy >= 0)
            //     this.totalXFuncion[_indexProy].Valor += reporteItem.Horas;
            // else
            //     this.totalXFuncion.push(
            //         {
            //             Id: reporteItem.FuncionId,
            //             Descripcion: reporteItem.FuncionaAsignada,
            //             Valor: reporteItem.Horas,
            //             SubItems: [],
            //         });


            // //clientes
            // var _indexCli = this.totalXCliente.findIndex(item => item.Id === reporteItem.ClienteId);
            // if (_indexCli >= 0)
            //     this.totalXCliente[_indexCli].Valor += reporteItem.Horas;
            // else
            //     this.totalXCliente.push(
            //         {
            //             Id: reporteItem.ClienteId,
            //             Descripcion: reporteItem.Cliente,
            //             Valor: reporteItem.Horas,
            //             SubItems: [],
            //         });

        });

        this.totalXProyecto.forEach(proyecto => {
            datos.filter(dato => dato.ProyectoId == proyecto.Id)
                .forEach(dato => {

                    var _indexFuncion = proyecto.SubItems.findIndex(item => item.Id === dato.FuncionId);
                    if (_indexFuncion >= 0) {
                        proyecto.SubItems[_indexFuncion].Valor += dato.Horas;
                        
                        var _indexUsuario = proyecto.SubItems[_indexFuncion].SubItemsN2.findIndex(item => item.Id === dato.UsuarioId);

                        if (_indexUsuario >= 0)
                            proyecto.SubItems[_indexFuncion].SubItemsN2[_indexUsuario].Valor += dato.Horas;
                        else
                            proyecto.SubItems[_indexFuncion].SubItemsN2.push({ Id: dato.UsuarioId, Descripcion: dato.Usuario, Valor: dato.Horas });

                    }
                    else {
                        proyecto.SubItems.push(
                            {
                                Id: dato.FuncionId,
                                Descripcion: dato.FuncionaAsignada,
                                Valor: dato.Horas,
                                Valor2: 0,
                                SubItemsN2: [{ Id: dato.UsuarioId, Descripcion: dato.Usuario, Valor: dato.Horas }],
                            });
                    }
                        
                });
        });


        this.totalXUsuario.forEach(user => {
            datos.filter(dato => dato.UsuarioId == user.Id)
                .forEach(dato => {
                    var _indexProyecto = user.SubItems.findIndex(item => item.Id === dato.ProyectoId);
                    if (_indexProyecto >= 0) {
                        user.SubItems[_indexProyecto].Valor += dato.Horas;
                        
                        var _indexFuncion = user.SubItems[_indexProyecto].SubItemsN2.findIndex(item => item.Id === dato.FuncionId);

                        if (_indexFuncion >= 0)
                            user.SubItems[_indexProyecto].SubItemsN2[_indexFuncion].Valor += dato.Horas;
                        else
                            user.SubItems[_indexProyecto].SubItemsN2.push({ Id: dato.FuncionId, Descripcion: dato.FuncionaAsignada, Valor: dato.Horas });

                    }
                    else {
                        user.SubItems.push(
                            {
                                Id: dato.ProyectoId,
                                Descripcion: `${dato.Cliente} - ${dato.CodigoProyecto}`,
                                Valor: dato.Horas,
                                Valor2: 0,
                                SubItemsN2: [{ Id: dato.FuncionId, Descripcion: dato.FuncionaAsignada, Valor: dato.Horas }],
                            });
                    }

                });
        });

    }

    onClickAbrirOffcanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'end', panelClass: 'filtros-panel' });
    }


    procesarDatosExcel(
        datos: ReporteItem[]
    ) {
        var itemsReporte: string[] = [];
        datos.forEach(item => {
            itemsReporte.push(`${item.Usuario}\t${item.Cliente}\t${item.CodigoProyecto}\t${item.FuncionaAsignada}\t${item.ClasificacionDeActividad}\t${item.DetalleYProducto}\t${item.Periodo}\t${item.Fecha}\t${item.Horas}`);
        });

        var parametros: string[] = [];
        this.labelsFiltros.forEach(item => parametros.push(item));

        this.datosExcel = {
            NombreArchivo: `ReporteGeneral`,
            NombreHoja: `ReporteGeneral`,
            Titulo: `Registro de Horas - Reporte General`,
            Subtitulo: 'Usuario\tCliente\tProyecto\tFunción Asociada\tClasificación de Actividad\tDetalle\tPeríodo\tFecha\tHoras',
            Parametros: parametros,
            ReporteItems: itemsReporte,
            TotalesItems: [`\t\t\t\t\tTotal horas registradas\t\t${this.totalHoras}`],
        };
    }

    onClickExportar() {
        if (this.datosExcel.ReporteItems.length == 0) return;

        this.excelService.exportar(this.datosExcel)
            .subscribe({
                next: (response: Blob) => {
                    const url = window.URL.createObjectURL(response);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ReporteGeneral.xlsx`;
                    link.click();
                    window.URL.revokeObjectURL(url);
                },
                error: (error) => {
                    console.error(error);
                    this.swalService.setToastError(`Ocurrió un error al exportar a excel`)
                },
            });
    }

}
