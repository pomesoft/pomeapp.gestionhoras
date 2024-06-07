import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, map, merge, startWith } from 'rxjs';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectoService } from '../../services/proyecto.service';

import { Profesional, Proyecto } from '../../models/entity.models';

@Component({
    selector: 'app-registrohorasplanificadas',
    templateUrl: './registrohorasplanificadas.component.html',
    styles: [
    ]
})
export class RegistrohorasplanificadasComponent implements OnInit, OnDestroy {
    listadoFULL: Proyecto[] = [];
    listado$: Observable<Proyecto[]>;
    hayDatos: boolean = false;
    proyectoSeleccionado: Proyecto;

    mostrarBtnNovigentes: boolean = true;

    filtro = new FormControl('', { nonNullable: true });

    profesional: any;
    listadoProfesionales: string[] = [];
    periodo: number = 1;

    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchProfesional: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        //const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        //, clicksWithClosedPopup$
        return merge(debouncedText$, inputFocus$).pipe(
            map((term) => {
                var datos = (term === '' ? this.listadoProfesionales : this.listadoProfesionales.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                return [...new Set(datos)];
            }),
        );
    };


    constructor(
        private proyectoService: ProyectoService,
        private swalService: SwalhelperService,
    ) {
        this.listado$ = this.filtro.valueChanges.pipe(
            startWith(''),
            map((text) => this.search(text).map((item, i) => ({ id: i + 1, ...item }))
                // .slice(
                //     (this.page - 1) * this.pageSize,
                //     (this.page - 1) * this.pageSize + this.pageSize,
                // )
            ),
        );
        this.refreshDatos();

    }

    ngOnInit(): void {

        this.proyectoService.profesionales.forEach(item => {
            this.listadoProfesionales.push(item.Apellido + ' ' + item.Nombre)
        });

        this.profesional = 'APELLIDO 1 NOMBRE 1';
        this.onClickListarProyectos('');
    }

    ngOnDestroy(): void {

    }

    search(text: string): Proyecto[] {
        this.hayDatos = false;
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();           

            return item.Descripcion.toLowerCase().includes(term) ||
                item.Cliente.Nombre.toLowerCase().includes(term) ||
                item.Producto.Descripcion.toLowerCase().includes(term) ||
                item.Tipo.Descripcion.toLowerCase().includes(term);
        });
    }


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }


    onClickListarProyectos(event: any) {
        this.listadoFULL = this.proyectoService.proyectos.filter(item => {
            var lista = item.Tareas.filter(t => this.profesional.toLowerCase().includes(t.Profesional.Apellido.toLowerCase()));
            return lista.length > 0;
        });
        if (this.listadoFULL.length > 0) {
            this.proyectoSeleccionado = this.listadoFULL[0];
        }
        this.refreshDatos();
    }

    onClickLimpiarProfesional(event: any) {
        event.preventDefault();
        this.profesional = '';
        this.proyectoSeleccionado = null;
        this.onClickListarProyectos(event);
    }


    onClickSeleccionarProyecto(
        event: any,
        proyecto: Proyecto
    ) {
        event.preventDefault();
        this.proyectoSeleccionado = proyecto;
    }

    onClickAbrirProyectoModal(event: any) {
        event.preventDefault();
    }

    onClickGuardar(event: any) {
        if (this.hayDatos)
            this.swalService.setToastOK();
    }

    onClickPeriodo(value: number) {
        this.periodo = value;
    }

    onFocusHoras(event,) {
        console.log(event);
    }


    trackByFn(index, item) {
        return index;
    }

}
