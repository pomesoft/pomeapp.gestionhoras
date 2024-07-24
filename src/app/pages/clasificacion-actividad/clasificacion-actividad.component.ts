import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClasificacionesActividades } from '../../store/actions';

import { ClasificacionActividad } from '../../models/entity.models';

import { ClasificacionesService } from '../../services/clasificaciones.service';
import { SwalhelperService } from '../../services/swalhelper.service';

@Component({
    selector: 'app-clasificacion-actividad',
    templateUrl: './clasificacion-actividad.component.html',
    styles: [
    ]
})
export class ClasificacionActividadComponent implements OnInit, OnDestroy {
    public tituloFormulario: string = 'Clasificación de Actividad'

    public procesando: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;


    get descripcionNoValido() {
        return this.formulario.get('descripcion').invalid && this.formulario.get('descripcion').touched
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private datosServcice: ClasificacionesService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {
        this.datoSubs = this.store.select('clasificacionesActividades')
            .subscribe(({ clasificacionActividad }) => {
                this.setearFormulario(clasificacionActividad);
            });
    }

    ngOnDestroy(): void {
        this.datoSubs.unsubscribe();
    }


    private crearFormulario() {
        this.formulario = this.formBuilder.group({
            id: [-1],
            descripcion: ['', Validators.required],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key != 'id') {
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    private setearFormulario(dato: ClasificacionActividad) {
        if (dato) {
            this.formulario.reset({
                id: dato.Id,
                descripcion: dato.Descripcion,
            });
        } else {
            this.formulario.reset({
                id: -1,
                descripcion: '',
            });
        }
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

        this.datosServcice.actualizar(this.formulario.value)
            .subscribe({
                next: (response: ClasificacionActividad) => {
                    this.store.dispatch(cargarClasificacionesActividades());
                    this.swalService.setToastOK();
                    this.modalService.dismissAll();
                },
                error: (error) => this.swalService.setToastError(error)
            });

    }

    onClickCerrar() {
        this.modalService.dismissAll();
    }
}
