import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { Usuario, UsuarioLogin } from '../../models/entity.models';
import { UsuarioService } from '../../services/usuario.service';
import { SwalhelperService } from '../../services/swalhelper.service';

import { PasswordValidators } from '../validators/password.validators';


@Component({
    selector: 'app-restablecer',
    templateUrl: './restablecer.component.html',
    styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent {
    public mostrarNoHabilitado: boolean = false;

    public ingresaUsuario: boolean = true;

    public showClave: boolean = false;
    public showPassword: boolean = false;
    public showPassword2: boolean = false;

    private paramsKey: string = '';

    public formSubmitted = false;

    public registerForm = this.fb.group({
        clave: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required],
    }, {
        validators: this.passwordsIguales('password', 'password2')
    });


    get password() {
        return this.registerForm.get('password').value;
    }

    get isMinimoCaracteres() {        
        return PasswordValidators.tieneMinimoCaracteres(this.password);
    }

    get hasSimbolo() {
        return PasswordValidators.tieneSimbolo(this.password);
    }

    get hasNumber() {
        return PasswordValidators.tieneNumero(this.password);
    }

    get hasMayuscula() {
        return PasswordValidators.tieneMayuscula(this.password);
    }

    get hasMinuscula() {
        return PasswordValidators.tieneMinuscula(this.password);
    }

    get isValidCaracteresComunes() {
        return PasswordValidators.evitarCaracteresComunes(this.password);
    }


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        public usuarioService: UsuarioService,
        private swalService: SwalhelperService,
    ) { }

    ngOnInit(): void {

        this.route.queryParams.subscribe((params: Params) => {
            if (params) {
                this.paramsKey = params.key;
            }
        });

    }

    async restablecerPassword() {
        this.formSubmitted = true;

        if (this.registerForm.invalid) return;
        if (!this.passwordNoValido()) return;
        if (this.contrasenaNuevaNoValida()) return;
        

        let userLogin: UsuarioLogin = {
            Usuario: this.usuarioService.usuario.LoginUsuario,
            Clave: this.registerForm.get('clave').value,
            ClaveNueva: this.registerForm.get('password').value,
        };

        if (userLogin.Clave != this.usuarioService.usuario.Clave) {
            Swal.fire('Error', 'Ocurrió un error al restablecer tu contraseña. Comunicate con el adminsitrador', 'error');
            return;
        }

        const valido = await this.usuarioService.cambioClaveUsuario(userLogin);

        if (valido) {
            Swal.fire('', 'La contraseña se cambió correctamente!', 'success')
                .then((result) => {
                    this.usuarioService.logout();
                });

        } else {
            Swal.fire('Error', 'Ocurrió un error al restablecer tu contraseña. Comunicate con el adminsitrador', 'error');
        }

    }

    passwordNoValido() {
        return this.isMinimoCaracteres ||
            this.hasSimbolo ||
            this.hasNumber ||
            this.hasMayuscula ||
            this.hasMinuscula ||
            this.isValidCaracteresComunes;
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
        }
        else {
            return false;
        }

    }

    contrasenaNuevaNoValida() {
        const pass1 = this.registerForm.get('password').value;
        const claveACtual = this.registerForm.get('clave').value;

        if ((pass1 != '') && (pass1 === claveACtual) && this.formSubmitted) {
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

    passwordValidator(control: any) {
        const password = control.value;

        // Expresión regular para validar la contraseña
        const regex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{12,}$/;

        // Si la contraseña no cumple con el patrón, retornamos un error
        if (!regex.test(password)) {
            return { invalidPassword: true };
        }

        // Si la contraseña es válida, retornamos null (sin errores)
        return null;
    }

}
