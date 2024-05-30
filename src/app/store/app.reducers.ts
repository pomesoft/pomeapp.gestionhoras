import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    cargarDatos: reducers.CargarDatosState,
    dashboardInfo: reducers.DashboardInfoState,
    filtros: reducers.FiltroState,
    usuario: reducers.UsuarioState,
    usuarios: reducers.UsuariosState,
}

export const appReducers: ActionReducerMap<AppState> = {
    cargarDatos: reducers.CargarDatosReducer,
    dashboardInfo: reducers.dashboardInfoReducer,
    filtros: reducers.FiltroReducer,
    usuario: reducers.UsuarioReducer,
    usuarios: reducers.UsuariosReducer,
}