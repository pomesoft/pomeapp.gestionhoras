import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

    mostrarBtnNovigentes: boolean = true;

    filtro = new FormControl('', { nonNullable: true });

    profesional: any;
    listadoProfesionales: string[] = [];

    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();



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
    }

    ngOnDestroy(): void {

    }

    search(text: string): Proyecto[] {
        this.hayDatos = false;
        return this.listadoFULL.filter((item) => {
            const term = text.toLowerCase();
            item.Tareas = item.TareasFULL.filter(tarea => {
                return tarea.Descripcion.toLowerCase().includes(term) ||
                    tarea.Tipo.Descripcion.toLowerCase().includes(term) ||
                    tarea.Profesional.Apellido.toLowerCase().includes(term) ||
                    tarea.Profesional.Nombre.toLowerCase().includes(term) ||
                    tarea.FechaFin.toISOString().toLowerCase().includes(term)
            })
            this.hayDatos = item.Descripcion.toLowerCase().includes(term) || item.Tareas.length > 0;
            return this.hayDatos;
        });
    }

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


    refreshDatos() {
        let valor = this.filtro.value;
        this.filtro.reset('');
        this.filtro.reset(valor);
    }


    onClickListarTareas(event: any) {
        this.listadoFULL = this.proyectoService.proyectos.filter(item => {
            var lista = item.Tareas.filter(t => this.profesional.toLowerCase().includes(t.Profesional.Apellido.toLowerCase()));
            return lista.length > 0;
        });
        this.refreshDatos();
    }

    onClickLimpiarProfesional(event: any) {
        event.preventDefault();
        this.profesional = '';
        this.onClickListarTareas(event);
    }


    onClickAbrirProyectoModal(event: any) {
        event.preventDefault();
    }

    onClickGuardar(event: any) {
        if (this.hayDatos)
            this.swalService.setToastOK();
    }


}
