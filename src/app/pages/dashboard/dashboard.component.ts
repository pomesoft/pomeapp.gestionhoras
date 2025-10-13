import { AfterContentInit, Component, OnDestroy, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import Swal from 'sweetalert2';
import { ChartOptions, Chart, ChartConfiguration, ChartData, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarDashboardInfo, setFiltros } from '../../store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ArchivoService } from '../../services/archivo.service';
import { UsuarioService } from '../../services/usuario.service';
import { HelpersService } from '../../services/helpers.service';
import { RegistroHorasService } from '../../services/registro-horas.service';

import { DashboardItem, DataFiltro, FiltroListadoRegistroDTO, ItemListado, ProyectoFuncion, ProyectoFuncionDashboard, Usuario } from '../../models/entity.models';
import { AgenteiaComponent } from '../agenteia/agenteia.component';


const asignadoBackgroundColor: string = 'rgba(255, 159, 64, 0.2)';
const asignadoBorderColor: string = 'rgba(255, 159, 64, 1)';

const registradoBackgroundColor: string = "rgba(57, 227, 126, 0.2)";
const registradoBorderColor: string = "rgba(57, 227, 126, 1)";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [
    ]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {



    tituloFormulario: string = "";
    nivelAccesoUsuario: number = 10;
    listarMisMisHoras: boolean = false;
    isCollapsedSaldos: boolean = false;
    cargando: boolean = false;
    error: boolean = false;



    listadoUsuarios: Usuario[] = [];
    listadoDatos: DashboardItem[] = [];

    totalAsignadas: number = 0;
    totalRegistradas: number = 0;
    totalRegistradasUsuario: number = 0;
    totalXUsuario: ItemListado[] = [];
    totalXFuncion: ItemListado[] = [];
    totalXCliente: ItemListado[] = [];
    totalXProyecto: ItemListado[] = [];
    totalXPeriodo: ItemListado[] = [];
    totalXProyectoFuncion: ProyectoFuncionDashboard[] = [];


    meses: string[] = [];
    periodoRegistroAnio: number = 2024;
    periodoRegistroMes: string = '';


    chartTotalHoras: Chart;


    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    chartPlugins = {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += context.raw + ' horas';
                    return label;
                }
            }
        }
    };


    chartPieOptions: ChartConfiguration['options'] = {
        plugins: this.chartPlugins,
    };

    chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: this.chartPlugins,
        indexAxis: 'y',
        scales: {
            x: {
                ticks: {
                    callback: function (value: any, index: number, values: any[]) {
                        // Obtén el label y divídelo en palabras
                        const label = this.getLabelForValue(value);
                        const words = label.split(' ');

                        // Devuelve el texto dividido en dos líneas
                        return words.join('\n');
                    }
                }
            }
        }
    };

    totalHoras: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };



    evolucionHoras: ChartData<'line'> = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [
            {
                label: 'Asignadas',
                data: [0, 0, 8, 8, 8, 8, 8, 0, 0, 8, 8, 8, 8, 8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.7
            },
            {
                label: 'Registradas',
                data: [8, 7, 6, 5, 8, 13, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 16, 16, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(57, 227, 126, 0.2)",
                borderColor: "rgba(57, 227, 126, 1)",
                borderWidth: 1,
                fill: false,
                tension: 0.5
            }
        ]
    };

    totalHorasXProyecto: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    totalHorasRegistradasXProyecto: ChartData<'pie'> = {
        labels: [],
        datasets: [],
    };

    totalHorasXUsuario: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    totalHorasXFuncion: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };



    constructor(
        private store: Store<AppState>,
        private router: Router,
        private modalService: NgbModal,
        public swalService: SwalhelperService,
        public usuarioService: UsuarioService,
        private archivoService: ArchivoService,
        private pipeDecimal: DecimalPipe,
        private registroHorasService: RegistroHorasService,
        private helpersService: HelpersService,
    ) {

    }



    ngOnInit(): void {
        this.tituloFormulario = `Time Sheets ${this.usuarioService.usuario.ItemList}`;
        this.nivelAccesoUsuario = this.usuarioService.usuario.Rol.NivelAcceso;
        this.meses = this.helpersService.getMeses();
        this.periodoRegistroMes = this.meses[this.helpersService.getMesActual()];
        this.periodoRegistroAnio = this.helpersService.getAnioActual();
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

    }

    listarReporte() {
        return new Promise<DashboardItem[]>((resolve, reject) => {

            let _periodoRegistro: string = '';
            if (this.periodoRegistroMes && this.periodoRegistroAnio) {
                _periodoRegistro = this.periodoRegistroMes + '-' + this.periodoRegistroAnio;
            }

            var filtro: FiltroListadoRegistroDTO = {
                PeriodoRegistro: _periodoRegistro,
            };

            //siempre se envía el usuario, si es PL trae todos los proyectos que es PL; si no trae los proyectos en los que cargó horas
            filtro.UsuarioId = this.usuarioService.usuario.Id;

            this.registroHorasService.listarDashboard(filtro)
                .subscribe({
                    next: (response: DashboardItem[]) => resolve(response),
                    error: (error) => reject(<any>error),
                });
        });
    }


    onClieckAbriModal_LG(content) {
        this.modalService.open(content, { size: 'lg', centered: true });
    }

    onClieckAbriModal_XL(content) {
        this.modalService.open(content, { size: 'xl', centered: true });
    }

    onClieckAbriModal_Full(content) {
        this.modalService.open(content, { fullscreen: true });
    }


    async cargarDatos() {

        this.cargando = true;
        this.error = false;

        await this.listarReporte()
            .then(result => {
                this.listadoDatos = result;
                //console.log('this.listadoDatos', this.listadoDatos);
                return this.agruparTotales();
            })
            .then(result => this.procesarGraficos())
            .catch(err => {
                this.error = true;
                console.log(err);
            })
            .finally(() => this.cargando = false);

    }

    onClickPeriodo() {
        this.cargarDatos();
    }

    agruparTotales() {

        return new Promise<Boolean>((resolve, reject) => {

            this.totalAsignadas = 0;
            this.totalRegistradas = 0;
            this.totalRegistradasUsuario = 0;
            this.totalXProyectoFuncion = [];
            this.totalXUsuario = [];
            this.totalXCliente = [];
            this.totalXProyecto = [];
            this.totalXFuncion = [];


            this.listadoDatos.forEach(dashboardItem => {

                this.totalRegistradas += dashboardItem.HorasRegistradas;

                if (dashboardItem.UsuarioId == this.usuarioService.usuario.Id) {
                    this.totalRegistradasUsuario += dashboardItem.HorasRegistradasUsuario;
                }

                //proyectos
                var _indexProy = this.totalXProyecto.findIndex(item => item.Id === dashboardItem.ProyectoId);
                if (_indexProy >= 0) {
                    this.totalXProyecto[_indexProy].Valor2 += dashboardItem.HorasRegistradas;
                    this.totalXProyecto[_indexProy].Valor3 += dashboardItem.HorasRegistradasUsuario;
                }
                else
                    this.totalXProyecto.push(
                        {
                            Id: dashboardItem.ProyectoId,
                            Descripcion: `${dashboardItem.Cliente} - ${dashboardItem.CodigoProyecto}`,
                            Descripcion2: ``,
                            Valor: 0,
                            Valor2: dashboardItem.HorasRegistradas,
                            Valor3: dashboardItem.HorasRegistradasUsuario,
                            SubItems: [],
                        });


                //proyecto / funcion
                var _indexRFAsignadas = this.totalXProyectoFuncion.findIndex(item => {
                    return item.ProyectoId == dashboardItem.ProyectoId
                        && item.FuncionId == dashboardItem.FuncionId;
                });
                if (_indexRFAsignadas == -1) {
                    this.totalXProyectoFuncion.push(
                        {
                            UsuarioId: dashboardItem.UsuarioId,
                            Usuario: dashboardItem.Usuario,
                            ProyectoId: dashboardItem.ProyectoId,
                            Proyecto: `${dashboardItem.Cliente} ${dashboardItem.CodigoProyecto}`,
                            FuncionId: dashboardItem.FuncionId,
                            Funcion: dashboardItem.FuncionaAsignada,
                            HorasAsignadas: dashboardItem.HorasAsignadas,
                            HorasRegistradas: 0,
                            HorasRegistradasUsuario: dashboardItem.HorasRegistradasUsuario,
                        });
                    this.totalAsignadas += dashboardItem.HorasAsignadas;

                }

                if (this.nivelAccesoUsuario > 10 || dashboardItem.UsuarioId == this.usuarioService.usuario.Id) {


                    //usuarios
                    if (dashboardItem.Usuario != '') {
                        var _indexProf = this.totalXUsuario.findIndex(item => item.Id === dashboardItem.UsuarioId);
                        if (_indexProf >= 0)
                            this.totalXUsuario[_indexProf].Valor2 += dashboardItem.HorasRegistradas;
                        else
                            this.totalXUsuario.push(
                                {
                                    Id: dashboardItem.UsuarioId,
                                    Descripcion: dashboardItem.Usuario,
                                    Valor: 0,
                                    Valor2: dashboardItem.HorasRegistradas,
                                    SubItems: [],
                                });
                    }



                    //funciones
                    if(dashboardItem.HorasRegistradas>0){
                        var _indexProy = this.totalXFuncion.findIndex(item => item.Id === dashboardItem.FuncionId);
                        if (_indexProy >= 0)
                            this.totalXFuncion[_indexProy].Valor2 += dashboardItem.HorasRegistradas;
                        else
                            this.totalXFuncion.push(
                                {
                                    Id: dashboardItem.FuncionId,
                                    Descripcion: dashboardItem.FuncionaAsignada,
                                    Valor: 0,
                                    Valor2: dashboardItem.HorasRegistradas,
                                });
                    }
                    
                }





                //periodos
                var _indexProf = this.totalXPeriodo.findIndex(item => item.Descripcion === dashboardItem.Periodo);
                if (_indexProf >= 0)
                    this.totalXPeriodo[_indexProf].Valor2 += dashboardItem.HorasRegistradas;
                else {
                    this.totalXPeriodo.push(
                        {
                            Id: dashboardItem.Id,
                            Descripcion: dashboardItem.Periodo,
                            Valor: 0,
                            Valor2: dashboardItem.HorasRegistradas,
                        });
                }


                //clientes
                var _indexCli = this.totalXCliente.findIndex(item => item.Id === dashboardItem.ClienteId);
                if (_indexCli >= 0)
                    this.totalXCliente[_indexCli].Valor2 += dashboardItem.HorasRegistradas;
                else
                    this.totalXCliente.push(
                        {
                            Id: dashboardItem.ClienteId,
                            Descripcion: dashboardItem.Cliente,
                            Valor: 0,
                            Valor2: dashboardItem.HorasRegistradas,
                        });



            });

            let index: number = 1;
            this.totalXProyecto.sort((a, b) => a.Valor2 - b.Valor2);


            this.totalXProyectoFuncion.forEach(proyFuncion => {
                this.listadoDatos
                    .filter(item => (item.ProyectoId == proyFuncion.ProyectoId) && (item.FuncionId == proyFuncion.FuncionId))
                    .forEach(item => {
                        proyFuncion.HorasRegistradas += item.HorasRegistradas;

                        if (item.HorasRegistradasUsuario > 0) {
                            proyFuncion.HorasRegistradasUsuario = item.HorasRegistradasUsuario;
                        }
                    });
            });

            this.totalXProyecto.forEach(proyecto => {
                this.totalXProyectoFuncion
                    .filter(pf => pf.ProyectoId === proyecto.Id)
                    .forEach(pf => {
                        proyecto.Valor += pf.HorasAsignadas;
                        proyecto.SubItems.push(
                            {
                                Id: pf.FuncionId,
                                Descripcion: pf.Funcion,
                                Valor: pf.HorasAsignadas,
                                Valor2: pf.HorasRegistradas,
                                Valor3: pf.HorasRegistradasUsuario,
                                SubItemsN2: [],
                            });
                    });
            });


            this.totalXUsuario.forEach(user => {
                this.listadoDatos.filter(dato => dato.UsuarioId == user.Id)
                    .forEach(dato => {
                        var _indexProyecto = user.SubItems.findIndex(item => item.Id === dato.ProyectoId);
                        if (_indexProyecto >= 0) {
                            user.SubItems[_indexProyecto].Valor2 += dato.HorasRegistradas;
                        }
                        else {
                            user.SubItems.push(
                                {
                                    Id: dato.ProyectoId,
                                    Descripcion: `${dato.Cliente} - ${dato.CodigoProyecto}`,
                                    Valor: 0,
                                    Valor2: dato.HorasRegistradas,
                                    SubItemsN2: [],
                                });
                        }

                    });
            });


            this.totalXProyecto.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));
            this.totalXUsuario.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));            
            this.totalXFuncion.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));

            resolve(true);

        });

    }

    procesarGraficos() {

        if (this.nivelAccesoUsuario > 10) {
            this.totalHoras = {
                labels: ['Asignadas', 'Registradas'],
                datasets: [
                    {
                        data: [this.totalAsignadas, this.totalRegistradas],
                        backgroundColor: [
                            asignadoBackgroundColor,
                            registradoBackgroundColor,
                        ],
                        borderColor: [
                            asignadoBorderColor,
                            registradoBorderColor,
                        ],
                        borderWidth: 1,
                        borderRadius: 10,
                        barPercentage: 0.65,
                    }
                ],
            };
        } else {
            this.totalHoras = {
                labels: ['Registradas'],
                datasets: [
                    {
                        data: [this.totalRegistradas],
                        backgroundColor: [
                            registradoBackgroundColor,
                        ],
                        borderColor: [
                            registradoBorderColor,
                        ],
                        borderWidth: 1,
                        borderRadius: 10,
                        barPercentage: 0.65,
                    }
                ],
            };
        }

        this.procesarGraficoPorProyecto();
        this.procesarGraficoPorUsurio();
        this.procesarGraficoPorFuncion();
    }

    procesarGraficoPorProyecto() {

        let totalHorasXProyecto_Labels: string[] = [];
        let totalHorasXProyecto_Datasets_Asignados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: asignadoBackgroundColor,
            borderColor: asignadoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
            barThickness: 8,
            categoryPercentage: 0.5
        };
        let totalHorasXProyecto_Datasets_Registrados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: registradoBackgroundColor,
            borderColor: registradoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
            barThickness: 8,
            categoryPercentage: 0.5
        };


        let totalHorasRegistradasXProyecto_Labels: string[] = [];
        let totalHorasRegistradasXProyecto_Datasets: number[] = [];

        this.totalXProyecto.slice(0, 6).forEach(item => {
            totalHorasXProyecto_Labels.push(item.Descripcion);

            totalHorasXProyecto_Datasets_Asignados.data.push(item.Valor);
            totalHorasXProyecto_Datasets_Registrados.data.push(item.Valor2);

            totalHorasRegistradasXProyecto_Labels.push(item.Descripcion);
            totalHorasRegistradasXProyecto_Datasets.push(item.Valor2);
        });

        if (this.nivelAccesoUsuario > 10) {
            this.totalHorasXProyecto = {
                labels: totalHorasXProyecto_Labels,
                datasets: [
                    totalHorasXProyecto_Datasets_Asignados,
                    totalHorasXProyecto_Datasets_Registrados,
                ],
            };
        } else {
            this.totalHorasXProyecto = {
                labels: totalHorasXProyecto_Labels,
                datasets: [
                    totalHorasXProyecto_Datasets_Registrados,
                ],
            };
        }




        this.totalHorasRegistradasXProyecto = {
            labels: totalHorasRegistradasXProyecto_Labels,
            datasets: [
                {
                    data: totalHorasRegistradasXProyecto_Datasets,
                    borderWidth: 1,
                    borderRadius: 10,
                }
            ],
        };
    }

    procesarGraficoPorUsurio() {

        let labelsUsuarios: string[] = [];
        let datasets_Asignados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: asignadoBackgroundColor,
            borderColor: asignadoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
        };
        let datasets_Registrados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: registradoBackgroundColor,
            borderColor: registradoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
        };

        this.totalXUsuario.forEach(item => {
            //console.log('totalXUsuario item', item);
            labelsUsuarios.push(item.Descripcion);
            datasets_Asignados.data.push(item.Valor2 + 5);
            datasets_Registrados.data.push(item.Valor2);
        });

        this.totalHorasXUsuario = {
            labels: labelsUsuarios,
            datasets: [
                datasets_Asignados,
                datasets_Registrados,
            ],
        };
    }

    procesarGraficoPorFuncion() {

        let labelsFunciones: string[] = [];
        let datasets_Asignados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: asignadoBackgroundColor,
            borderColor: asignadoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
        };
        let datasets_Registrados: ChartDataset<"bar", number[]> = {
            data: [],
            backgroundColor: registradoBackgroundColor,
            borderColor: registradoBorderColor,
            borderWidth: 1,
            borderRadius: 10,
            barPercentage: 0.3,
        };

        this.totalXFuncion.forEach(item => {
            labelsFunciones.push(item.Descripcion);
            datasets_Asignados.data.push(item.Valor);
            datasets_Registrados.data.push(item.Valor2);
        });

        this.totalHorasXFuncion = {
            labels: labelsFunciones,
            datasets: [
                //datasets_Asignados,
                datasets_Registrados,
            ],
        };
    }


    onChangeMisHoras() {
        if (this.listarMisMisHoras) {
            this.nivelAccesoUsuario = 10;
        } else {
            this.nivelAccesoUsuario = this.usuarioService.usuario.Rol.NivelAcceso;
        }
        this.cargarDatos()
    }
}
