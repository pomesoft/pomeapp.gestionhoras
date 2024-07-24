import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    cargarDatos: reducers.CargarDatosState,
    clasificacionesActividades: reducers.ClasificacionesActividadesState,
    clientes: reducers.ClientesState,
    dashboardInfo: reducers.DashboardInfoState,
    filtros: reducers.FiltroState,
    funciones: reducers.FuncionesState,
    profesionales: reducers.ProfesionalesState,
    proyectos: reducers.ProyectosState,
    registroHoras: reducers.RegistroHorasState,
    usuario: reducers.UsuarioState,
    usuarios: reducers.UsuariosState,
}

export const appReducers: ActionReducerMap<AppState> = {
    cargarDatos: reducers.CargarDatosReducer,
    clasificacionesActividades:reducers.ClasificacionesReducer,
    clientes: reducers.ClientesReducer,
    dashboardInfo: reducers.dashboardInfoReducer,
    filtros: reducers.FiltroReducer,
    funciones: reducers.FuncionesReducer,
    profesionales: reducers.ProfesionalesReducer,
    proyectos: reducers.ProyectosReducer,
    registroHoras: reducers.RegistroHorasReducer,
    usuario: reducers.UsuarioReducer,
    usuarios: reducers.UsuariosReducer,
}