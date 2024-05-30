import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/entity.models';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';

export interface UsuariosState {
    usuarios: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const UsuariosInitialState: UsuariosState = {
    usuarios: [],
    loaded: false,
    loading: false,
    error: null
}

const _UsuariosReducer = createReducer(UsuariosInitialState,

    on(cargarUsuarios, state => ({ ...state, loading: true })),

    on(cargarUsuariosSuccess, (state, { usuarios }) => ({
        ...state,
        loading: false,
        loaded: true,
        usuarios: [...usuarios]
    })),

    on(cargarUsuariosError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

);

export function UsuariosReducer(state, action) {
    return _UsuariosReducer(state, action);
}