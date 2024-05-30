import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "../../services/usuario.service";

import * as usuariosActions from "../actions";


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService,
    ) { }


    cargarUsuarios$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
                (action) => this.usuariosService.listar()
                    .pipe(
                        //tap(oper => console.log('usuarios effect', oper)),
                        map(data => usuariosActions.cargarUsuariosSuccess({ usuarios: data })),
                        catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
                    )
            )
        )
    })


    cargarUsuario$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            mergeMap(
                (action) => this.usuariosService.obtener(action.id)
                    .pipe(
                        //tap(oper => console.log('usuario effect 1º tap', oper)),
                        map(data => usuariosActions.cargarUsuarioSuccess({ usuario: data })),
                        catchError(err => of(usuariosActions.cargarUsuarioError({ payload: err })))
                    )
            )
        )
    })
    
}