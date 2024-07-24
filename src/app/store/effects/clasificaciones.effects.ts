import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as datosActions from "../actions";

import { ClasificacionesService } from "../../services/clasificaciones.service";


@Injectable()
export class ClasificacionesActividadesEffects {

    constructor(
        private actions$: Actions,
        private datosService: ClasificacionesService,
    ) { }


    cargarClasificacionesActividades$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarClasificacionesActividades),
            mergeMap(
                (action) => this.datosService.listar()
                    .pipe(
                        //tap(oper => console.log('ClasificacionesActividadesEffects', oper)),
                        map(data => datosActions.cargarClasificacionesActividadesSuccess({ clasificacionesActividades: data })),
                        catchError(err => of(datosActions.cargarClasificacionesActividadesError({ payload: err })))
                    )
            )
        )
    })


    cargarClasificacionActividad$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(datosActions.cargarClasificacionActividad),
            mergeMap(
                (action) => this.datosService.obtener(action.id)
                    .pipe(
                        tap(data => console.log('ClasificacionesActividadesEffects', data)),
                        map(data => datosActions.cargarClasificacionActividadSuccess({ clasificacionActividad: data })),
                        catchError(err => of(datosActions.cargarClasificacionActividadError({ payload: err })))
                    )
            )
        )
    })
    
}