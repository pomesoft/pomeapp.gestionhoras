import { createReducer, on } from '@ngrx/store';
import { Cliente } from '../../models/entity.models';
import { cargarClientes, cargarClientesSuccess, cargarClientesError, cargarCliente, cargarClienteError, cargarClienteSuccess } from '../actions';

export interface ClientesState {
    clientes: Cliente[],
    cliente: Cliente,
    loaded: boolean,
    loading: boolean,
    error: any,
    listarVigentes: boolean,
    usuarioId: number,
}

export const ClientesInitialState: ClientesState = {
    clientes: [],
    cliente: null,
    loaded: false,
    loading: false,
    error: null,
    listarVigentes: true,
    usuarioId: -1
}

const _ClientesReducer = createReducer(ClientesInitialState,

    //gestion de un cliente
    on(cargarCliente, state => ({ ...state, loading: true })),

    on(cargarClienteSuccess, (state, { cliente }) => ({
        ...state,
        loading: false,
        loaded: true,
        cliente: cliente,
    })),

    on(cargarClienteError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

    //gestion del listado de clientes
    on(cargarClientes, (state, { listarVigentes, usuarioId }) => ({
        ...state,
        loading: true,
        listarVigentes: listarVigentes,
        usuarioId: usuarioId,
    })),

    on(cargarClientesSuccess, (state, { clientes }) => ({
        ...state,
        loading: false,
        loaded: true,
        clientes: [...clientes],
    })),

    on(cargarClientesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    })),

);

export function ClientesReducer(state, action) {
    return _ClientesReducer(state, action);
}