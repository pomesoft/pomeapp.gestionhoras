import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from '../../models/entity.models';

import { UsuarioService } from '../../services/usuario.service';
import { SwalhelperService } from '../../services/swalhelper.service';

declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario;
    public ingresaUsuario: boolean = true;
    public recuperaClaveOK: boolean = false;
    public procesando: boolean = false;

    public showPassword: boolean = false;

    private paramsKey: string = '';

    public formSubmitted = false;
    public auth2: any;

    public loginForm = this.fb.group({
        usuario: [localStorage.getItem('usuario') || '', Validators.required],
        clave: ['', Validators.required],
        remember: [localStorage.getItem('password') || true]
    });


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private swalService: SwalhelperService,
        private ngZone: NgZone
    ) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params) {

                    if (params.key) {
                        this.paramsKey = params.key;

                        var dataKey = JSON.parse(window.atob(params.key));

                        var idCliente = dataKey.IdCliente;
                        var idUsuario = dataKey.IdUsuario;

                        if (idUsuario > 0) {
                            this.cargarDatos(idUsuario);
                        } else {
                            this.registroUsurio();
                        }
                    }
                }

            }
            );
    }

    async cargarDatos(idUsuario: number) {
        this.ingresaUsuario = true;
        await this.obtenerUsuario(idUsuario)
            .then(resp => {
                if (resp) {
                    this.usuario = resp;
                    this.loginForm.get('usuario').setValue(this.usuario.LoginUsuario, { onlySelf: true, });
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


    login() {

        if (this.loginForm.invalid) return;

        this.usuarioService.login({
            Usuario: this.loginForm.get('usuario').value,
            Clave: this.loginForm.get('clave').value,
        }).subscribe({
            next: (userLogin) => {

                if (this.loginForm.get('remember').value) {
                    localStorage.setItem('usuario', this.loginForm.get('usuario').value);
                    localStorage.setItem('password', this.loginForm.get('clave').value);
                    localStorage.setItem('remember', 'true');
                } else {
                    localStorage.removeItem('usuario');
                    localStorage.removeItem('password');
                    localStorage.removeItem('remember');
                }

                if (userLogin) {

                    if (userLogin.CambiarClave) {
                        this.router.navigateByUrl('/cambiopass');
                    } else {
                        this.router.navigateByUrl('/');
                    }

                } else {
                    this.swalService.setSwalFireWarning('Ocurrió un error. Puede solicitar su contraseña ó consulte con el administrador del sistema.');
                }



            },
            error: (err) => {
                console.log('error login', err);
                this.swalService.setSwalFireError('Ocurrió un error. Puede solicitar su contraseña ó consulte con el administrador del sistema.');
            },
        });

    }

    attachSignin(element) {

        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
                const id_token = googleUser.getAuthResponse().id_token;
                // console.log(id_token);
                this.usuarioService.loginGoogle(id_token)
                    .subscribe(resp => {
                        // Navegar al Dashboard
                        this.ngZone.run(() => {
                            this.router.navigateByUrl('/');
                        })
                    });

            }, (error) => {
                alert(JSON.stringify(error, undefined, 2));
            });
    }

    mostrarRegistro(event: any) {
        event.preventDefault();
        this.registroUsurio();
    }

    registroUsurio() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                key: this.paramsKey
            }
        };
        this.router.navigate(['/register'], navigationExtras);
    }

    recuperarClave(event: any) {
        event.preventDefault();

        console.log('this.loginForm.get(usuario).value', this.loginForm.get('usuario').value);
        if (this.loginForm.get('usuario').value == '') return;

        this.procesando = true;

        this.usuarioService.recuperarClave({
            Usuario: this.loginForm.get('usuario').value,
            Clave: this.loginForm.get('clave').value,
        })
            .then(result => {                
                this.recuperaClaveOK = result;
            })
            .catch(err => this.swalService.setToastError(err))
            .finally(() => this.procesando = false);


    }


    togglePasswordVisibility() {
        this.showPassword = !this.showPassword; // Cambia el estado de visibilidad
      }

}
