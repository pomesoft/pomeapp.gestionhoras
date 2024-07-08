import { createReducer, on } from '@ngrx/store';
import { Proyecto } from '../../models/entity.models';
import { cargarProyectos, cargarProyectosSuccess, cargarProyectosError, cargarProyecto, cargarProyectoError, cargarProyectoSuccess } from '../actions';

export interface ProyectosState {
    proyectos: Proyecto[],
    proyecto: Proyecto,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const ProyectosInitialState: ProyectosState = {
    proyectos: [],
    proyecto: null,
    loaded: false,
    loading: false,
    error: null
}

const _ProyectosReducer = createReducer(ProyectosInitialState,

    //gestion de un proyecto
    on(cargarProyecto, state => ({ ...state, loading: true })),

    on(cargarProyectoSuccess, (state, { proyecto }) => ({
        ...state,
        loading: false,
        loaded: true,
        proyecto: proyecto,
    })),

    on(cargarProyectoError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    //gestion del listado de proyectos
    on(cargarProyectos, state => ({ ...state, loading: true })),

    on(cargarProyectosSuccess, (state, { proyectos }) => ({
        ...state,
        loading: false,
        loaded: true,
        proyectos: [...proyectos],
    })),

    on(cargarProyectosError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

);

export function ProyectosReducer(state, action) {
    return _ProyectosReducer(state, action);
}