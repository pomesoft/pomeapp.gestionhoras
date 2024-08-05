import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarFunciones } from '../../store/actions';

import { Funcion } from '../../models/entity.models';

import { FuncionesService } from '../../services/funciones.service';
import { SwalhelperService } from '../../services/swalhelper.service';

@Component({
    selector: 'app-funcion',
    templateUrl: './funcion.component.html',
    styles: [
    ]
})
export class FuncionComponent implements OnInit, OnDestroy {
    public tituloFormulario: string = 'Funcion'

    public procesando: boolean = false;

    formulario: FormGroup;

    datoSubs: Subscription;

    listarVigentes: boolean = true;


    get descripcionNoValido() {
        return this.formulario.get('Descripcion').invalid && this.formulario.get('Descripcion').touched
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private datosServcice: FuncionesService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {
        this.datoSubs = this.store.select('funciones')
            .subscribe(({ funcion, loaded, listarVigentes }) => {
                this.listarVigentes = listarVigentes;
                if (loaded) {
                    this.setearFormulario(funcion);
                }
            });
    }

    ngOnDestroy(): void {
        this.datoSubs.unsubscribe();
    }


    private crearFormulario() {
        this.formulario = this.formBuilder.group({
            Id: [0],
            Descripcion: ['', Validators.required],
            Vigente: [true],
        });
        Object.keys(this.formulario.controls).forEach(key => {
            if (key == 'Descripcion') {
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    private setearFormulario(dato: Funcion) {
        if (dato) {
            this.formulario.reset({
                Id: dato.Id,
                Descripcion: dato.Descripcion,
                Vigente: dato.Vigente,
            });
        } else {
            this.formulario.reset({
                Id: 0,
                Descripcion: '',
                Vigente: true,
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

        this.datosServcice.actualizar(this.formulario.value)
            .subscribe({
                next: (response: Funcion) => {
                    this.store.dispatch(cargarFunciones({ listarVigentes: this.listarVigentes }));
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