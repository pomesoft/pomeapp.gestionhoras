import { createReducer, on } from '@ngrx/store';
import { Funcion } from '../../models/entity.models';
import { cargarClasificacionesActividades, cargarClasificacionesActividadesSuccess, cargarClasificacionesActividadesError, cargarClasificacionActividad, cargarClasificacionActividadSuccess, cargarClasificacionActividadError } from '../actions';

export interface ClasificacionesActividadesState {
    clasificacionesActividades: Funcion[],
    clasificacionActividad: Funcion,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const ClasificacionesInitialState: ClasificacionesActividadesState = {
    clasificacionesActividades: [],
    clasificacionActividad: null,
    loaded: false,
    loading: false,
    error: null
}

const _ClasificacionesReducer = createReducer(ClasificacionesInitialState,

    //gestion de un clasificacionActividad
    on(cargarClasificacionActividad, state => ({ ...state, loading: true })),

    on(cargarClasificacionActividadSuccess, (state, { clasificacionActividad }) => ({
        ...state,
        loading: false,
        loaded: true,
        clasificacionActividad: clasificacionActividad,
    })),

    on(cargarClasificacionActividadError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    //gestion del listado de clasificacionesActividades
    on(cargarClasificacionesActividades, state => ({ ...state, loading: true })),

    on(cargarClasificacionesActividadesSuccess, (state, { clasificacionesActividades }) => ({
        ...state,
        loading: false,
        loaded: true,
        clasificacionesActividades: [...clasificacionesActividades],
    })),

    on(cargarClasificacionesActividadesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

);

export function ClasificacionesReducer(state, action) {
    return _ClasificacionesReducer(state, action);
}