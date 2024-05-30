import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/entity.models';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';

export interface UsuarioState {
    id: number,
    usuario: Usuario,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const UsuarioInitialState: UsuarioState = {
    id: -1,
    usuario: null,
    loaded: false,
    loading: false,
    error: null
}

const _UsuarioReducer = createReducer(UsuarioInitialState,

    on(cargarUsuario, (state, { id }) => ({
        ...state,
        loading: true,
        id: id
    })),

    on(cargarUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        loading: false,
        loaded: true,
        usuario: { ...usuario }
    })),

    on(cargarUsuarioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

);

export function UsuarioReducer(state, action) {
    return _UsuarioReducer(state, action);
}