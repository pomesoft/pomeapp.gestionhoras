import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { ClientesService } from "../../services/clientes.service";


@Injectable()
export class ClientesEffects {

    constructor(
        private actions$: Actions,
        private datosService: ClientesService,
    ) { }


    cargarClientes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarClientes),
            mergeMap(
                (action) => this.datosService.listar()
                    .pipe(
                        //tap(oper => console.log('usuarios effect', oper)),
                        map(data => datosActions.cargarClientesSuccess({ clientes: data })),
                        catchError(err => of(datosActions.cargarClientesError({ payload: err })))
                    )
            )
        )
    })


    cargarCliente$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarCliente),
            mergeMap(
                (action) => this.datosService.obtener(action.id)
                    .pipe(
                        //tap(oper => console.log('usuario effect 1º tap', oper)),
                        map(data => datosActions.cargarClienteSuccess({ cliente: data })),
                        catchError(err => of(datosActions.cargarClienteError({ payload: err })))
                    )
            )
        )
    })
    
}