import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { ProyectoService } from "../../services/proyecto.service";


@Injectable()
export class ProyectosEffects {

    constructor(
        private actions$: Actions,
        private datosService: ProyectoService,
    ) { }


    cargarProyectos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarProyectos),
            mergeMap(
                (action) => this.datosService.listar()
                    .pipe(
                        //tap(oper => console.log('usuarios effect', oper)),
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