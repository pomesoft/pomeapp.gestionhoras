import { AfterContentInit, Component, OnDestroy, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, startWith, Subscription, timer } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import Swal from 'sweetalert2';
import { ChartOptions, Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

import {
    cargarDashboardInfo,
} from '../../store/actions';

import { Usuario } from '../../models/entity.models';
import { SwalhelperService } from '../../services/swalhelper.service';
import { ArchivoService } from '../../services/archivo.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [
    ]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {

    isCollapsedSaldos: boolean = false;
    cargando: boolean = false;

    dashboardInfoSubs: Subscription;

    periodo: number = 1;

    listadoUsuarios: Usuario[] = [];

    countdown$ = timer(1000);

    chartTotalHoras: Chart;


    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    totalHoras: ChartData<'bar'> = {
        labels: ['Planificadas', 'Registradas'],
        datasets: [
            {
                data: [650, 400],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    "rgba(57, 227, 126, 0.2)",
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    "rgba(57, 227, 126, 1)",
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.65,
            }
        ],
    };

    totalHorasXProyecto: ChartData<'bar'> = {
        labels: [
            'Proyecto #001 Cliente 1',
            'Proyecto #002 Cliente 1',
            'Proyecto #001 Cliente 2',
            'Proyecto #001 Cliente 3',
            'Proyecto #001 Cliente 4',
            'Proyecto #001 Cliente 5',
        ],
        datasets: [
            {
                data: [160, 0, 100, 150, 70, 50],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.3,
            }, {
                data: [60, 20, 160, 0, 156, 10],
                backgroundColor: [
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                ],
                borderColor: [
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.4,
            }
        ],
    };

    totalHorasXProfesional: ChartData<'bar'> = {
        labels: [
            'Profgesional 1',
            'Profgesional 2',
            'Profgesional 3',
            'Profgesional 4',                        
        ],
        datasets: [
            {
                data: [160, 50, 150, 170],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.3,
            }, {
                data: [0, 150, 100, 70],
                backgroundColor: [
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                    "rgba(57, 227, 126, 0.2)",
                ],
                borderColor: [
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                    "rgba(57, 227, 126, 1)",
                ],
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.4,
            }
        ],
    };


    chartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: {
                display: false
            },
        },
        indexAxis: 'y',

    };

    constructor(
        private store: Store<AppState>,
        private router: Router,
        private modalService: NgbModal,
        public swalService: SwalhelperService,
        private usuarioService: UsuarioService,
        private archivoService: ArchivoService,
        private pipeDecimal: DecimalPipe,
    ) {

    }



    ngOnInit(): void {

        this.usuarioService.validaRolUserAdministrador()
            .subscribe(esAdmin => {
                if (!esAdmin) {
                    this.router.navigate(['/home/ctacte']);
                }
            });



        this.dashboardInfoSubs = this.store.select('dashboardInfo')
            .subscribe(({ dashboardInfo, loading, error }) => {

                this.cargando = loading;

                if (dashboardInfo) {

                    this.refreshDatos();

                }
            });

        this.store.dispatch(cargarDashboardInfo());


    }

    ngAfterContentInit(): void {

        this.countdown$.subscribe(() => {
            this.cargando = false;
        });
    }

    ngOnDestroy(): void {
        this.dashboardInfoSubs.unsubscribe();
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


    refreshDatos() {

    }

    onClickPeriodo(value: number) {
        this.periodo = value;
    }

}
