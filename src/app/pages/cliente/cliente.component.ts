import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarClientes } from '../../store/actions';

import { Cliente } from '../../models/entity.models';

import { ClientesService } from '../../services/clientes.service';
import { SwalhelperService } from '../../services/swalhelper.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit, OnDestroy {
  public tituloFormulario: string = 'Cliente'

  public procesando: boolean = false;

  formulario: FormGroup;

  datoSubs: Subscription;


  get nombreNoValido() {
      return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
  }

  constructor(
      private store: Store<AppState>,
      private formBuilder: FormBuilder,
      private modalService: NgbModal,
      private swalService: SwalhelperService,
      private datosServcice: ClientesService,
  ) {

      this.crearFormulario();

  }

  ngOnInit(): void {
      this.datoSubs = this.store.select('clientes')
          .subscribe(({ cliente }) => {
              this.setearFormulario(cliente);
          });
  }

  ngOnDestroy(): void {
      this.datoSubs.unsubscribe();
  }


  private crearFormulario() {
      this.formulario = this.formBuilder.group({
          id: [-1],
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

  private setearFormulario(dato: Cliente) {
      if (dato) {
          this.formulario.reset({
              id: dato.Id,
              nombre: dato.Nombre,
          });
      } else {
          this.formulario.reset({
              id: -1,
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
              next: (response: Cliente) => {
                  this.store.dispatch(cargarClientes());
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