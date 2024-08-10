import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { ProyectosService } from "../../services/proyectos.service";


@Injectable()
export class ProyectosEffects {

    constructor(
        private actions$: Actions,
        private datosService: ProyectosService,
    ) { }


    cargarProyectos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarProyectos),
            mergeMap(
                (action) => this.datosService.listar()
                    .pipe(
                        //tap(data => console.log('proyectos effect', data)),
                        map(data => datosActions.cargarProyectosSuccess({ proyectos: data })),
                        catchError(err => of(datosActions.cargarProyectosError({ payload: err })))
                    )
            )
        )
    })


    cargarProyecto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarProyecto),
            mergeMap(
                (action) => this.datosService.obtener(action.id)
                    .pipe(
                        //tap(oper => console.log('usuario effect 1º tap', oper)),
                        map(data => datosActions.cargarProyectoSuccess({ proyecto: data })),
                        catchError(err => of(datosActions.cargarProyectoError({ payload: err })))
                    )
            )
        )
    })
    
}