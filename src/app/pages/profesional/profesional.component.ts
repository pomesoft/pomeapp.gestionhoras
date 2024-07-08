import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

import { SwalhelperService } from '../../services/swalhelper.service';
import { ProfesionalesService } from '../../services/profesionales.service';

import { Profesional } from '../../models/entity.models';
import { cargarProfesionales } from 'src/app/store/actions';

@Component({
    selector: 'app-profesional',
    templateUrl: './profesional.component.html',
    styles: [
    ]
})
export class ProfesionalComponent implements OnInit, OnDestroy {
    public tituloFormulario: string = 'Profesional'

    public procesando: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;


    get apellidoNoValido() {
        return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched
    }
    get nombreNoValido() {
        return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private datosServcice: ProfesionalesService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {
        this.datoSubs = this.store.select('profesionales')
            .subscribe(({ profesional }) => {
                this.setearFormulario(profesional);
            });
    }

    ngOnDestroy(): void {
        this.datoSubs.unsubscribe();
    }


    private crearFormulario() {
        this.formulario = this.formBuilder.group({
            id: [-1],
            apellido: ['', Validators.required],
            nombre: ['', Validators.required],
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

    private setearFormulario(dato: Profesional) {
        if (dato) {
            this.formulario.reset({
                id: dato.Id,
                apellido: dato.Apellido,
                nombre: dato.Nombre,
            });
        } else {
            this.formulario.reset({
                id: -1,
                apellido: '',
                nombre: '',
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
                next: (response: Profesional) => {
                    this.store.dispatch(cargarProfesionales());
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
