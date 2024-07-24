import { createReducer, on } from '@ngrx/store';
import { Funcion } from '../../models/entity.models';
import { cargarFunciones, cargarFuncionesSuccess, cargarFuncionesError, cargarFuncion, cargarFuncionError, cargarFuncionSuccess } from '../actions';

export interface FuncionesState {
    funciones: Funcion[],
    funcion: Funcion,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const FuncionesInitialState: FuncionesState = {
    funciones: [],
    funcion: null,
    loaded: false,
    loading: false,
    error: null
}

const _FuncionesReducer = createReducer(FuncionesInitialState,

    //gestion de un funcion
    on(cargarFuncion, state => ({ ...state, loading: true })),

    on(cargarFuncionSuccess, (state, { funcion }) => ({
        ...state,
        loading: false,
        loaded: true,
        funcion: funcion,
    })),

    on(cargarFuncionError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    //gestion del listado de funciones
    on(cargarFunciones, state => ({ ...state, loading: true })),

    on(cargarFuncionesSuccess, (state, { funciones }) => ({
        ...state,
        loading: false,
        loaded: true,
        funciones: [...funciones],
    })),

    on(cargarFuncionesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

);

export function FuncionesReducer(state, action) {
    return _FuncionesReducer(state, action);
}