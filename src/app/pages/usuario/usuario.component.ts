import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/entity.models';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styles: [
    ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

    tituloFormulario: string = 'Usuario'

    procesando: boolean = false;

    formulario: FormGroup;


    clientesSubs: Subscription;
    usuarioSubs: Subscription;

    get loginUsuarioNoValido() {
        return this.formulario.get('loginUsuario').invalid && this.formulario.get('loginUsuario').touched
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private usuarioService: UsuarioService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {
       
        this.usuarioSubs = this.store.select('usuario')
            .subscribe(({ usuario }) => {
                this.setearFormulario(usuario);
            });
    }

    ngOnDestroy(): void {
        this.usuarioSubs.unsubscribe();
        this.clientesSubs.unsubscribe();
    }


    private crearFormulario() {
        this.formulario = this.formBuilder.group({
            id: [-1],
            loginUsuario: ['', Validators.required],
            apellido: [''],
            nombre: [''],
            email: [''],
            celular: [''],
            idRol: [0],
            idCliente: [0],
            habilitado: [0],
        });
        // Object.keys(this.formulario.controls).forEach(key => {
        //     if (key != 'id' && key != 'email' && key != 'loginUsuario') {
        //         const yourControl = this.formulario.get(key);
        //         yourControl.valueChanges.subscribe(() => {
        //             if (yourControl.value) {
        //                 yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
        //             }
        //         });
        //     }
        // });
    }

    private setearFormulario(Usuario: Usuario) {
        console.log('usuario', Usuario);
        if (Usuario) {
            this.formulario.reset({
                id: Usuario.Id,
                loginUsuario: Usuario.LoginUsuario,
                apellido: Usuario.Apellido,
                nombre: Usuario.Nombre,
                email: Usuario.Email,
                celular: Usuario.Celular,
                idRol: Usuario.Rol.Id,
                habilitado: Usuario.Habilitado ? 1 : 0,
            });
        } else {
            this.formulario.reset({
                id: -1,
                loginUsuario: '',
                apellido: '',
                nombre: '',
                email: '',
                celular: '',
                observaciones: '',
                idRol: 0,
                habilitado: 0,
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

        let user: Usuario = {
            Id: this.formulario.get('id').value,
            LoginUsuario: this.formulario.get('loginUsuario').value,
            Apellido: this.formulario.get('apellido').value,
            Nombre: this.formulario.get('nombre').value,
            Email: this.formulario.get('email').value,
            Celular: this.formulario.get('celular').value,
            Habilitado: (this.formulario.get('habilitado').value == 1),
            Rol: {
                Id: this.formulario.get('idRol').value,
                Descripcion: 'ROL',
            },
        };

        this.swalService.setToastOK();

        // this.usuarioService.guardarUsuario(user)
        //     .subscribe({
        //         next: (response: Usuario) => {
        //             this.store.dispatch(cargarUsuarios());
        //             this.swalService.setToastOK();
        //             this.modalService.dismissAll();
        //         },
        //         error: (error) => this.swalService.setToastError(error)
        //     });

    }

    onClickCerrar() {
        this.modalService.dismissAll();
    }

    onChangeRol(event: any) {
        this.formulario.get('idRol').setValue(+event.target.value, {
            onlySelf: true,
        });
    }

    onChangeHabilitado(event: any) {
        this.formulario.get('habilitado').setValue(+event.target.value, {
            onlySelf: true,
        });
    }
}
