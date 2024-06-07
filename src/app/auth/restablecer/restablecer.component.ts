import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { Usuario } from '../../models/entity.models';
import { UsuarioService } from '../../services/usuario.service';
import { SwalhelperService } from '../../services/swalhelper.service';


@Component({
    selector: 'app-restablecer',
    templateUrl: './restablecer.component.html',
    styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent {
    public mostrarNoHabilitado: boolean = false;

    public usuario: Usuario;
    public ingresaUsuario: boolean = true;

    private paramsKey: string = '';

    public formSubmitted = false;

    public registerForm = this.fb.group({
        nombre: [''],
        email: ['', [Validators.required]],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        terminos: [true],
    }, {
        validators: this.passwordsIguales('password', 'password2')
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private swalService: SwalhelperService,
    ) { }

    ngOnInit(): void {


        this.route.queryParams.subscribe((params: Params) => {
            if (params) {
                this.paramsKey = params.key;

                if (this.usuarioService.validarUsuarioKey(params.key)) {

                    var dataKey = JSON.parse(window.atob(params.key));
                    var idUsuario = dataKey.IdUsuario;
                    if (idUsuario > 0) {
                        this.cargarDatos(idUsuario);
                    }

                }
            }
        });

    }

    async cargarDatos(idUsuario: number) {
        this.ingresaUsuario = true;
        await this.obtenerUsuario(idUsuario)
            .then(resp => {
                if (resp) {
                    this.usuario = resp;
                    this.registerForm.get('email').setValue(this.usuario.LoginUsuario, { onlySelf: true, });
                    this.ingresaUsuario = false;
                };
            })
            .catch(err => {
                this.swalService.setToastError(err)
                console.log(err);
            });
    }

    obtenerUsuario(idUsuario: number) {
        return new Promise<Usuario>((resolve, reject) => {
            this.usuarioService.obtener(idUsuario)
                .subscribe({
                    next: (user) => resolve(user),
                    error: (error) => reject(<any>error)
                });
        });
    }


    async restablecerPassword() {
        this.formSubmitted = true;
        console.log(this.registerForm.value);

        if (this.registerForm.invalid) {
            return;
        }

        // const valido = await this.usuarioService.restablecerClaveUsuario({
        //     Usuario: this.registerForm.get('email').value,
        //     Clave: this.registerForm.get('email').value,
        //     ClaveNueva: this.registerForm.get('password').value,
        // });

        const valido = true;

        if (valido) {
            this.mostrarNoHabilitado = true;

        } else {
            Swal.fire('Error', 'Ocurrió un error al restablecer tu contraseña. Comunicate con el adminsitrador', 'error');
        }

    }

    mostrarLogin(event: any) {
        event.preventDefault();
        const navigationExtras: NavigationExtras = {
            queryParams: {
                key: this.paramsKey
            }
        };
        this.router.navigate(['/login'], navigationExtras);
    }

    campoNoValido(campo: string): boolean {

        if (this.registerForm.get(campo).invalid && this.formSubmitted) {
            return true;
        } else {
            return false;
        }

    }

    contrasenasNoValidas() {
        const pass1 = this.registerForm.get('password').value;
        const pass2 = this.registerForm.get('password2').value;

        if ((pass1 !== pass2) && this.formSubmitted) {
            return true;
        } else {
            return false;
        }

    }

    aceptaTerminos() {
        return false;       // !this.registerForm.get('terminos').value && this.formSubmitted;
    }

    passwordsIguales(pass1Name: string, pass2Name: string) {

        return (formGroup: FormGroup) => {

            const pass1Control = formGroup.get(pass1Name);
            const pass2Control = formGroup.get(pass2Name);

            if (pass1Control.value === pass2Control.value) {
                pass2Control.setErrors(null)
            } else {
                pass2Control.setErrors({ noEsIgual: true })
            }


        }
    }

}
