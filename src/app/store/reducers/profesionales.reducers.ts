import { createReducer, on } from '@ngrx/store';
import { Profesional } from '../../models/entity.models';
import { cargarProfesionales, cargarProfesionalesSuccess, cargarProfesionalesError, cargarProfesional, cargarProfesionalError, cargarProfesionalSuccess } from '../actions';

export interface ProfesionalesState {
    profesionales: Profesional[],
    profesional: Profesional,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const ProfesionalesInitialState: ProfesionalesState = {
    profesionales: [],
    profesional: null,
    loaded: false,
    loading: false,
    error: null
}

const _ProfesionalesReducer = createReducer(ProfesionalesInitialState,

    //gestion de un profesional
    on(cargarProfesional, state => ({ ...state, loading: true })),

    on(cargarProfesionalSuccess, (state, { profesional }) => ({
        ...state,
        loading: false,
        loaded: true,
        profesional: profesional,
    })),

    on(cargarProfesionalError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    //gestion del listado de profesionales
    on(cargarProfesionales, state => ({ ...state, loading: true })),

    on(cargarProfesionalesSuccess, (state, { profesionales }) => ({
        ...state,
        loading: false,
        loaded: true,
        profesionales: [...profesionales],
    })),

    on(cargarProfesionalesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

);

export function ProfesionalesReducer(state, action) {
    return _ProfesionalesReducer(state, action);
}