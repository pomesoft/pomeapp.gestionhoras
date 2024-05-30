import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';

import { NgbCalendar, NgbDateStruct, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProyectoService } from '../../services/proyecto.service';
import { HelpersService } from '../../services/helpers.service';

import { Proyecto, TipoTarea } from '../../models/entity.models';

@Component({
    selector: 'app-registrohorasmanual',
    templateUrl: './registrohorasmanual.component.html',
    styles: [
    ]
})
export class RegistrohorasmanualComponent implements OnInit, OnDestroy {

    tituloFormulario: string = 'Moneda'

    procesando: boolean = false;

    formulario: FormGroup;

    fecha: NgbDateStruct;

    proyectos: string[] = [];

    tiposTarea: TipoTarea[] = [];


    get proyectoNoValido() {
        return this.formulario.get('proyecto').invalid && this.formulario.get('proyecto').touched
    }
    get tareaNoValido() {
        return this.formulario.get('tarea').invalid && this.formulario.get('tarea').touched
    }
    get tipoTareaNoValido() {
        return this.formulario.get('tipoTarea').invalid && this.formulario.get('tipoTarea').touched
    }
    get fechaNoValida() {
        return this.formulario.get('fecha').invalid && this.formulario.get('fecha').touched
    }
    get horasNoValida() {
        return this.formulario.get('horas').invalid && this.formulario.get('horas').touched
    }


    @ViewChild('instanceclienteDebito', { static: true }) instanceclienteDebito: NgbTypeahead;
    focusProyecto$ = new Subject<string>();
    clickProyecto$ = new Subject<string>();

    searchProyecto: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickProyecto$.pipe(filter(() => false));
        const inputFocus$ = this.focusProyecto$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
            .pipe(
                map((term) => {
                    var datos = (term === '' ? this.proyectos : this.proyectos.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10);
                    return [...new Set(datos)];
                }),
            );
    };


    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private calendar: NgbCalendar,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private proyectoService: ProyectoService,
        private helpersService: HelpersService
    ) {

        this.crearFormulario();
    }

    ngOnInit(): void {
        this.proyectos = this.proyectoService.proyectos.map(item => item.Descripcion);
        this.tiposTarea = this.proyectoService.tiposTarea;

    }

    ngOnDestroy(): void {

    }

    private crearFormulario() {

        this.fecha = {
            year: this.calendar.getToday().year,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).year,
            month: this.calendar.getToday().month,      //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).month + 1,
            day: this.calendar.getToday().day,          //this.calendar.getPrev(this.calendar.getToday(), 'm', 1).day
        };


        this.formulario = this.formBuilder.group({
            id: [-1],
            proyecto: ['', Validators.required],
            tarea: ['', Validators.required],
            tipoTarea: [0, Validators.required],
            fechaNgDateStruct: [this.fecha, Validators.required],
            fecha: [this.helpersService.parserNgDateStruct(this.fecha)],
            horas: [0, Validators.required],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key != 'id' && key != 'cotizacion') {
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    private setearFormulario() {

        this.formulario.reset({
            id: -1,
            descripcion: '',
            abreviado: '',
            cotizacion: '',
        });

    }

    onClickGuardar() {
        if (this.formulario.invalid) {

            return Object.values(this.formulario.controls).forEach(control => {
                if (control instanceof FormGroup) {
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                } else {
                    control.markAsTouched();
                }
            });
        }
        this.swalService.setToastOK();

    }

    onClickCerrar() {

    }


    onClickLimpiarTypeahead(
        controlName: string,
    ) {
        this.formulario.get(controlName).setValue('', { onlySelf: true, });
    }

}
