import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { FuncionesService } from "../../services/funciones.service";


@Injectable()
export class FuncionesEffects {

    constructor(
        private actions$: Actions,
        private datosService: FuncionesService,
    ) { }


    cargarFunciones$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarFunciones),
            mergeMap(
                (action) => this.datosService.listar(action.listarVigentes)
                    .pipe(
                        //tap(oper => console.log('usuarios effect', oper)),
                        map(data => datosActions.cargarFuncionesSuccess({ funciones: data })),
                        catchError(err => of(datosActions.cargarFuncionesError({ payload: err })))
                    )
            )
        )
    })


    cargarFuncion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarFuncion),
            mergeMap(
                (action) => this.datosService.obtener(action.id)
                    .pipe(
                        //tap(oper => console.log('usuario effect 1º tap', oper)),
                        map(data => datosActions.cargarFuncionSuccess({ funcion: data })),
                        catchError(err => of(datosActions.cargarFuncionError({ payload: err })))
                    )
            )
        )
    })
    
}