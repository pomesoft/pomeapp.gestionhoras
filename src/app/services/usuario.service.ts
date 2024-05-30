import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

import { interval, Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { ResponseApiLogin, Usuario, UsuarioLogin } from '../models/entity.models';
import { ResponseApi } from '../models/api.model';

const base_url = environment.base_url;

declare const gapi: any;

const headers = new HttpHeaders({
    //'X-Api-key': 'apiKey',
    'Content-Type': 'application/json'
});


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public auth2: any;
    //public usuario: Usuario;

    constructor(private http: HttpClient,
        private router: Router,
        private ngZone: NgZone) {

    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get uid(): string {
        return this.usuario.Id.toString() || '';
    }

    get usuario(): Usuario {
        let usr: Usuario;
        if (localStorage.getItem('usuarioService') != null) {
            usr = JSON.parse(localStorage.getItem('usuarioService'));
        }
        return usr;
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    googleInit() {

        return new Promise<void>(resolve => {
            gapi.load('auth2', () => {
                this.auth2 = gapi.auth2.init({
                    client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                });

                resolve();
            });
        })

    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('usuarioService');


        this.ngZone.run(() => {
            this.router.navigateByUrl('/login');
        })

        // this.auth2.signOut().then(() => {

        // });

    }

    validarToken(): Observable<boolean> {

        const obs$ = new Observable<boolean>(subs => {
            subs.next(true);
        });

        return obs$.pipe(
            map((resp: any) => {
                var token = localStorage.getItem('token');
                if (token == 'P0M3L0S0FTW4R3@2023') {
                    this.logout();
                }

                return (token != null);
            }),
        );
    }

    validarUsuarioKey(
        paramsKey: string
    ): Observable<boolean> {

        const obs$ = new Observable<boolean>(subs => {
            subs.next(true);
        });

        return obs$.pipe(
            map((resp: any) => {
                if (this.token == '' || this.token == 'P0M3L0S0FTW4R3@2023') {
                    this.logoutKey(paramsKey);
                    return false;
                }

                var paramsKeyData = JSON.parse(window.atob(paramsKey));
                var tokenData = JSON.parse(window.atob(this.token));

                if (paramsKeyData.IdCliente != tokenData.IdCliente || paramsKeyData.IdUsuario != tokenData.IdUsuario) {
                    this.logoutKey(paramsKey);
                    return false;
                }

                return true;
            }),
        );
    }

    logoutKey(paramsKey: string) {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');

        const navigationExtras: NavigationExtras = {
            queryParams: { key: paramsKey }
        };

        this.ngZone.run(() => {
            this.router.navigate(['/login'], navigationExtras);
        });
    }

    validaRolUserAdministrador(): Observable<boolean> {

        const obs$ = new Observable<boolean>(subs => {
            subs.next(true);
        });

        return obs$.pipe(
            map((resp: any) => {
                var userInfo = this.usuario;
                return (userInfo && userInfo.Rol && userInfo.Rol.Id == 1);
            }),
        );
    }

    generaToken(user: Usuario): string {
        var data = {
            IdUsuario: user.Id,
            Login: user.LoginUsuario,
        };
        return window.btoa(JSON.stringify(data));
    }



    login(data: UsuarioLogin) {

        return this.http.post<ResponseApiLogin>(`${base_url}Usuario/Login`, data)
            .pipe(
                tap((resp: ResponseApiLogin) => {
                    if (resp.Usuario.Id > 0) {
                        localStorage.setItem('usuarioService', JSON.stringify(resp.Usuario));
                        localStorage.setItem('token', this.generaToken(resp.Usuario));
                    }
                })
            );
    }

    register(formData: LoginForm) {

        return this.http.post(`${base_url}Login/register`, formData)
            .pipe(
                tap((resp: Usuario) => {
                    console.log('login', resp);
                })
            );

    }

    registroUsuario(
        datos: UsuarioLogin
    ) {
        let params = JSON.stringify(datos);

        return new Promise(resolve => {
            return this.http.post<Usuario>(`${base_url}Usuario/Registro`, datos)
                .subscribe({
                    next: (user) => {

                        if (user) {
                            localStorage.setItem('usuarioService', JSON.stringify(user));
                            localStorage.setItem('token', this.generaToken(user));
                            resolve(true);
                        } else {
                            resolve(false);
                        }

                    },
                    error: (error) => {
                        console.log(error);
                        resolve(false);
                    },
                });

        });
    }

    cambioClaveUsuario(
        datos: UsuarioLogin
    ) {
        let params = JSON.stringify(datos);

        return new Promise(resolve => {

            return this.http.post(`${base_url}Usuario/CambioClave`, params, { headers: headers })
                .subscribe({
                    next: (resp) => {
                        if (resp) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (error) => {
                        console.log(error);
                        resolve(false);
                    },
                });

        });
    }


    restablecerClaveUsuario(
        datos: UsuarioLogin
    ) {
        let params = JSON.stringify(datos);

        return new Promise(resolve => {
            return this.http.post<Usuario>(`${base_url}Usuario/Restablecer`, params, { headers: headers })
                .subscribe({
                    next: (resp) => {
                        if (resp) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (error) => {
                        console.log(error);
                        resolve(false);
                    },
                });
        });
    }



    loginGoogle(token) {

        return this.http.post(`${base_url}/login/google`, { token })
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token)
                })
            );

    }


    listar() {

        const url = `${base_url}usuario`;
        return this.http.get<Usuario[]>(url, this.headers);
    }

    listarPorCliente(idCliente: number) {

        const url = `${base_url}usuario`;
        return this.http.get<Usuario[]>(url, this.headers)
            .pipe(
                map(heroes => heroes.filter(user => user.Vigente && user.Habilitado))
            );
    }


    obtener(id: number) {

        const url = `${base_url}usuario/${id}`;
        return this.http.get<Usuario>(url, this.headers);

    }

    eliminarUsuario(usuario: Usuario) {
        const url = `${base_url}Usuario/eliminar?id=${usuario.Id}`;
        return this.http.post(url, this.headers);
    }

    guardarUsuario(usuario: Usuario) {
        console.log('base_url', base_url);
        return this.http.post(`${base_url}usuario`, usuario, this.headers);

    }

}


