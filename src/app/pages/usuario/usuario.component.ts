import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions';

import { SwalhelperService } from '../../services/swalhelper.service';
import { UsuarioService } from '../../services/usuario.service';
import { Funcion, Rol, Usuario } from '../../models/entity.models';
import { RolesService } from '../../services/roles.service';
import { FuncionesService } from '../../services/funciones.service';

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

    usuarioSubs: Subscription;

    roles: Rol[] = [];
    funciones: Funcion[] = [];

    funcionNoValido: boolean = false;

    get loginUsuarioNoValido() {
        return this.formulario.get('loginUsuario').invalid && this.formulario.get('loginUsuario').touched;
    }
    get apellidoNoValido() {
        return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
    }
    get emailNoValido() {
        return this.formulario.get('email').invalid && this.formulario.get('email').touched;
    }
    get idRolNoValido() {
        return this.formulario.get('idRol').invalid && this.formulario.get('idRol').touched;
    }

    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private swalService: SwalhelperService,
        private usuarioService: UsuarioService,
        private rolesService: RolesService,
        private funcionesService: FuncionesService,
    ) {

        this.crearFormulario();

    }

    ngOnInit(): void {

        this.usuarioSubs = this.store.select('usuario')
            .subscribe(({ usuario, loaded }) => {
                if (loaded)
                    this.setearFormulario(usuario);
            });

        this.cargarDatos();
    }

    ngOnDestroy(): void {
        this.usuarioSubs.unsubscribe();
    }


    async cargarDatos() {

        await this.rolesService.inicializar()
            .then(result => {
                if (result) {
                    this.roles = this.rolesService.roles;
                }
                return this.funcionesService.inicializar();
            })
            .then(result => {
                if (result) {
                    this.funciones = this.funcionesService.funciones;
                }
            })
            .catch(err => {
                this.swalService.setToastError(`Ocurrió un error al cargar los datos`)
                console.log(err);
            });

    }


    private crearFormulario() {
        this.formulario = this.formBuilder.group({
            id: [-1],
            apellido: ['', Validators.required],
            nombre: [''],
            email: ['', [Validators.required, Validators.email]],
            celular: [''],
            loginUsuario: ['', Validators.required],
            clave: [''],
            vigente: [1],
            idRol: [0, [Validators.required, Validators.min(1)]],
            idFuncion: [0],
        });

        Object.keys(this.formulario.controls).forEach(key => {
            if (key == 'apellido' || key == 'nombre') {
                const yourControl = this.formulario.get(key);
                yourControl.valueChanges.subscribe(() => {
                    if (yourControl.value) {
                        yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
                    }
                });
            }
        });
    }

    private setearFormulario(Usuario: Usuario) {
        if (Usuario && Usuario.Id) {
            this.formulario.reset({
                id: Usuario.Id,
                apellido: Usuario.Apellido,
                nombre: Usuario.Nombre,
                email: Usuario.Email,
                celular: Usuario.Celular,
                loginUsuario: Usuario.LoginUsuario,
                clave: Usuario.Clave,
                vigente: Usuario.Vigente ? 1 : 0,
                idRol: Usuario.Rol ? Usuario.Rol.Id : 0,
                idFuncion: Usuario.Funcion ? Usuario.Funcion.Id : 0,
            });
        } else {
            this.formulario.reset({
                id: 0,
                apellido: '',
                nombre: '',
                email: '',
                celular: '',
                loginUsuario: '',
                clave: '',
                vigente: 1,
                idRol: 0,
                idFuncion: 0,
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

        var rolSeleccionado = this.roles.find(item => item.Id == this.formulario.get('idRol').value);
        var funcionSeleccioanda = this.funciones.find(item => item.Id == this.formulario.get('idFuncion').value);

        if (!funcionSeleccioanda) {
            funcionSeleccioanda = { Id: 0, Descripcion: '', Vigente: true };
        }


        if (rolSeleccionado && rolSeleccionado.Id > 1 && funcionSeleccioanda.Id == 0) {
            this.funcionNoValido = true;
            return;
        } else {
            this.funcionNoValido = false;
        }

        let user: Usuario = {
            Id: this.formulario.get('id').value,
            Apellido: this.formulario.get('apellido').value,
            Nombre: this.formulario.get('nombre').value ? this.formulario.get('nombre').value : '',
            Email: this.formulario.get('email').value,
            Celular: this.formulario.get('celular').value,
            LoginUsuario: this.formulario.get('loginUsuario').value,
            Clave: this.formulario.get('clave').value,
            Vigente: (this.formulario.get('vigente').value == 1),
            Rol: rolSeleccionado,
            Funcion: funcionSeleccioanda,
        };

        this.usuarioService.actualizar(user)
            .subscribe({
                next: (response: Usuario) => {
                    this.store.dispatch(cargarUsuarios());
                    this.swalService.setToastOK();
                    this.modalService.dismissAll();
                },
                error: (error) => this.swalService.setToastError(error)
            });

    }

    onClickCerrar() {
        this.modalService.dismissAll();
    }

    onChangeRol(event: any) {
        this.formulario.get('idRol').setValue(+event.target.value, {
            onlySelf: true,
        });
    }

    onChangeFuncion(event: any) {
        this.formulario.get('idFuncion').setValue(+event.target.value, {
            onlySelf: true,
        });
    }

    onChangeVigente(event: any) {
        this.formulario.get('vigente').setValue(+event.target.value, {
            onlySelf: true,
        });
    }
}
