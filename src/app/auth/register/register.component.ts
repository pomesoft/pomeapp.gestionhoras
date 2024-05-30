import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public mostrarNoHabilitado: boolean = false;
    public idCliente: number = -1;

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
    ) { }

    ngOnInit(): void {


        this.route.queryParams.subscribe((params: Params) => {
            if (params) {
                this.paramsKey = params.key;
                var dataKey = JSON.parse(window.atob(params.key));
                this.idCliente = dataKey.IdCliente;
            }

        });

    }

    async crearUsuario() {
        this.formSubmitted = true;
        console.log(this.registerForm.value);

        if (this.registerForm.invalid) {
            return;
        }

        const valido = await this.usuarioService.registroUsuario({
            Usuario: this.registerForm.get('email').value,
            Clave: this.registerForm.get('password').value,
            IdCliente: this.idCliente,
        });

        if (valido) {
            this.mostrarNoHabilitado = true;

        } else {
            Swal.fire('Error', 'Ya existe el Usuario o Email ingresado.', 'error');
        }

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

    mostrarLogin(event: any) {
        event.preventDefault();
        // const navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         key: this.paramsKey
        //     }
        // };
        this.router.navigate(['/login']);
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
