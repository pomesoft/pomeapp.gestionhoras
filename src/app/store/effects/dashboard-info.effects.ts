import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, tap } from "rxjs";

import * as actions from "../actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducers";


@Injectable()
export class DashboardInfoEffects {

    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
    ) { }



    // cargarDashboardInfo$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(actions.cargarDashboardInfo),
    //         mergeMap(
    //             (action) => this.operacionesService.getDashboardInfo()
    //                 .pipe(                        
    //                     map(data => actions.cargarDashboardInfoSuccess({ dashboardInfo: data })),
    //                     catchError(err => of(actions.cargarDashboardInfoError({ payload: err })))
    //                 )
    //         )
    //     )
    // })



}