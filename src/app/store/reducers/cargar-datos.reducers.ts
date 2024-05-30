import { createReducer, on } from '@ngrx/store';
import { setCargarDatos, cargarDatosValidos } from '../actions';

export interface CargarDatosState {
    cargarDatos: cargarDatosValidos,
    idCliente?: number,
    idMoneda?: number,
}

export const CargarDatosInitialState: CargarDatosState = {
    cargarDatos: 'dashboard'
}

const _CargarDatosReducer = createReducer(CargarDatosInitialState,

    on(setCargarDatos, (state, { cargarDatos }) => ({
        ...state,
        cargarDatos: cargarDatos
    })),

);

export function CargarDatosReducer(state, action) {
    return _CargarDatosReducer(state, action);
}