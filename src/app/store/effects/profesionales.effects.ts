import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { ProfesionalesService } from "../../services/profesionales.service";


@Injectable()
export class ProfesionalesEffects {

    constructor(
        private actions$: Actions,
        private datosService: ProfesionalesService,
    ) { }


    cargarProfesionales$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarProfesionales),
            mergeMap(
                (action) => this.datosService.listar()
                    .pipe(
                        //tap(oper => console.log('usuarios effect', oper)),
                        map(data => datosActions.cargarProfesionalesSuccess({ profesionales: data })),
                        catchError(err => of(datosActions.cargarProfesionalesError({ payload: err })))
                    )
            )
        )
    })


    cargarProfesional$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarProfesional),
            mergeMap(
                (action) => this.datosService.obtener(action.id)
                    .pipe(
                        //tap(oper => console.log('usuario effect 1º tap', oper)),
                        map(data => datosActions.cargarProfesionalSuccess({ profesional: data })),
                        catchError(err => of(datosActions.cargarProfesionalError({ payload: err })))
                    )
            )
        )
    })
    
}