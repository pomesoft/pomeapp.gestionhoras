import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store/app.reducers';
import { cargarClientes, cargarProyectos } from '../../store/actions';

import { ProyectosService } from '../../services/proyectos.service';
import { ClientesService } from '../../services/clientes.service';

import { Cliente, DatosExportarExcel, FiltroListadoRegistroDTO, ItemListado, Proyecto, RegistroHora, ReporteItem } from '../../models/entity.models';
import { RegistroHorasService } from '../../services/registro-horas.service';
import { HelpersService } from '../../services/helpers.service';
import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
    selector: 'app-reportetimesheet',
    templateUrl: './reportetimesheet.component.html',
    styles: [
    ]
})
export class ReportetimesheetComponent implements OnInit, OnDestroy, AfterViewInit {
    cargando: boolean = false;
    error: boolean = false;
    hayDatos: boolean = false;

    tipoTimesheet: number = 1;

    tituloFormulario: string = "Reporte de Horas";
    proyectosCliente: Proyecto[];

    totalXFuncion: ItemListado[] = [];

    cliente: Cliente;
    clientesSubs: Subscription;
    clientes: Cliente[] = [];
    formatterCliente = (item: Cliente) => (item && item.Nombre) ? item.Nombre : '';

    proyectosSubs: Subscription;
    proyecto: Proyecto;
    proyectosFULL: Proyecto[] = [];
    formatterProyecto = (item: Proyecto) => (item && item.Codigo) ? item.Codigo : '';

    listado: ReporteItem[];

    meses: string[] = [];
    periodoRegistroAnio: number = 2024;
    periodoRegistroMes: string = '';

    totalHorasAsignadas: number = 0;
    totalHorasRegistradas: number = 0;

    puedeVerGeneral: boolean = true;

    detallePorUsuario: boolean = false;

    @ViewChild('instanceCliente', { static: true }) instanceCliente: NgbTypeahead;
    focusCliente$ = new Subject<string>();
    clickCliente$ = new Subject<string>();

    searchCliente: OperatorFunction<string, readonly Cliente[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCliente$.pipe(filter(() => false));
        const inputFocus$ = this.focusCliente$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.clientes.filter((item) => new RegExp(term, 'mi').test(item.Nombre)))
            );
    };


    @ViewChild('instanceProyecto', { static: true }) instanceProyecto: NgbTypeahead;
    focusProyecto$ = new Subject<string>();
    clickProyecto$ = new Subject<string>();

    searchProyecto: OperatorFunction<string, readonly Proyecto[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProyecto$.pipe(filter(() => false));
        const inputFocus$ = this.focusProyecto$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => this.proyectosCliente.filter((item) => new RegExp(term, 'mi').test(item.Codigo)))
            );
    };



    constructor(
        private store: Store<AppState>,
        private proyectoService: ProyectosService,
        private clienteService: ClientesService,
        private usuarioService: UsuarioService,
        private swalService: SwalhelperService,
        private registroHorasService: RegistroHorasService,
        private helpersService: HelpersService,
        private excelService: ExcelService,
    ) { }

    ngOnInit(): void {

        this.clientesSubs = this.store.select('clientes')
            .subscribe(({ clientes }) => {
                this.clientes = clientes;
            });

        this.proyectosSubs = this.store.select('proyectos')
            .subscribe(({ proyectos }) => {
                this.proyectosFULL = proyectos;
            });


        this.meses = this.helpersService.getMeses();
        this.periodoRegistroMes = this.meses[this.helpersService.getMesActual()];
        this.puedeVerGeneral = this.usuarioService.usuario.Rol.NivelAcceso >= 20;
    }

    ngOnDestroy(): void {
        this.clientesSubs.unsubscribe();
        this.proyectosSubs.unsubscribe();
    }

    ngAfterViewInit() {
        this.store.dispatch(cargarClientes({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
        this.store.dispatch(cargarProyectos({ listarVigentes: true, usuarioId: this.usuarioService.usuario.Id }));
    }

    onChangeCliente(event) {

        if (event && event.Id) {
            this.proyectosCliente = this.proyectosFULL
                .filter(item => item.Cliente.Id === event.Id);

            if (this.proyectosCliente.length == 1) {
                this.proyecto = this.proyectosCliente[0];
                this.onChangeProyecto(this.proyecto);
            }
        }

    }

    onChangeProyecto(event: any) {

        if (event && event.Id) {
            console.log('onChangeProyecto(event)', event);
            this.proyectoService.obtener(event.Id)
                .subscribe({
                    next: (proyecto) => {
                        this.proyecto = proyecto;
                    },
                    error: (error) => {
                        this.swalService.setToastError(`Ocurrió un error al cargar el proyecto`)
                        console.log(error);
                    },
                });
        }
    }

    onClickTipoSheet(tipo: number) {
        this.tipoTimesheet = tipo;
        this.onClickAplicarFiltros();
    }

    onClickAplicarFiltros() {


        this.totalHorasAsignadas = 0;
        this.totalHorasRegistradas = 0;
        this.totalXFuncion = [];

        let _periodoRegistro: string = '';
        if (this.periodoRegistroMes && this.periodoRegistroAnio) {
            _periodoRegistro = this.periodoRegistroMes + '-' + this.periodoRegistroAnio;
        }

        if (this.proyecto == null || _periodoRegistro == '') {
            return;
        }


        var filtro: FiltroListadoRegistroDTO = {
            ProyectoId: this.proyecto.Id,
            PeriodoRegistro: _periodoRegistro,
            UsuarioId: this.tipoTimesheet == 1 ? this.usuarioService.usuario.Id : -1,
        };

        this.registroHorasService.listarReporte(filtro)
            .subscribe({
                next: (response: ReporteItem[]) => {

                    this.listado = response;

                    console.log('this.listado', this.listado);

                    this.proyecto.FuncionesAsignadas?.forEach(item => {
                        this.totalXFuncion.push(
                            {
                                Id: item.Funcion.Id,
                                Descripcion: item.Funcion.Descripcion,
                                Valor: item.Horas,
                                Valor2: 0,
                            });
                    });


                    this.listado.forEach(item => {
                        var _indexProy = this.totalXFuncion.findIndex(itemTF => itemTF.Id === item.FuncionId);
                        if (_indexProy >= 0)
                            this.totalXFuncion[_indexProy].Valor2 += item.Horas;
                        else
                            this.totalXFuncion.push({ Id: item.FuncionId, Descripcion: item.FuncionaAsignada, Valor: 0, Valor2: item.Horas });
                    });

                    this.totalXFuncion
                        .filter(items => items.Valor2 > 0)
                        .forEach(item => {
                            this.totalHorasAsignadas += item.Valor;
                            this.totalHorasRegistradas += item.Valor2;
                        });


                },
                error: (error) => this.swalService.setToastError(`Ocurrió un error al cargar los datos`),
            });
    }


    onClickExportar() {
        if (this.listado.length == 0) return;

        var encabezado: string = '';
        var totalesItems: string = '';
        if (this.detallePorUsuario) {
            encabezado = 'Fecha\tFunción asociada\tUsuario\tClasificación de Actividad\tDetalle y Producto\tTiempo dedicado';
        } else {
            encabezado = 'Fecha\tFunción asociada\tClasificación de Actividad\tDetalle y Producto\tTiempo dedicado';
        }

        var itemsReporte: string[] = [];
        this.listado.forEach(item => {
            if (this.detallePorUsuario) {
                itemsReporte.push(`${item.Fecha}\t${item.FuncionaAsignada}\t${item.Usuario}\t${item.ClasificacionDeActividad}\t${item.DetalleYProducto}\t${item.Horas}`);
                totalesItems=`\t\t\t\tTotal horas registradas\t${this.totalHorasRegistradas}`;
            } else {
                itemsReporte.push(`${item.Fecha}\t${item.FuncionaAsignada}\t${item.ClasificacionDeActividad}\t${item.DetalleYProducto}\t${item.Horas}`);
                totalesItems=`\t\t\tTotal horas registradas\t${this.totalHorasRegistradas}`;
            }
        });

        var tipoTimesheet: string;
        if (this.tipoTimesheet == 1) {
            tipoTimesheet = `Usuario:\t${this.usuarioService.usuario.ItemList}`;
        } else {
            tipoTimesheet = `General\tTodos los usuarios`;
        }

        //totalHorasRegistradas

        var datosExcel: DatosExportarExcel = {
            NombreArchivo: `TS_${this.cliente.Nombre}`,
            NombreHoja: `Timesheet_${this.cliente.Nombre}`,
            Titulo: `Cliente ${this.cliente.Nombre}`,
            Subtitulo: encabezado,
            Parametros: [
                `Proyecto:\t${this.proyecto.Codigo}`,
                `Periodo:\t${this.periodoRegistroMes}-${this.periodoRegistroAnio}`,
                tipoTimesheet,
            ],
            ReporteItems: itemsReporte,
            TotalesItems: [totalesItems],
        };

        this.excelService.exportar(datosExcel)
            .subscribe({
                next: (response: Blob) => {
                    const url = window.URL.createObjectURL(response);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `TS_${this.cliente.Nombre}.xlsx`;
                    link.click();
                    window.URL.revokeObjectURL(url);

                },
                error: (error) => {
                    console.error(error);
                    this.swalService.setToastError(`Ocurrió un error al exportar a excel`)
                },
            });
    }

    onClickLimpiarCliente(event: any) {
        this.cliente = null;
        this.onClickLimpiaProyecto(event);
    }

    onClickLimpiaProyecto(event: any) {
        this.proyecto = null;
        this.listado = [];
        this.totalHorasAsignadas = 0;
        this.totalHorasRegistradas = 0;
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLInputElement;
        input.select();
    }


    onChangeDetallePorUsuario() { }
}
