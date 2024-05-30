import { createReducer, on } from '@ngrx/store';
import { DataFiltro } from '../../models/entity.models';
import { clearFiltros, setFiltros } from '../actions';


const filtroInicial: DataFiltro = {
    Meses: 0,
    Periodo: 1,
    FechaDesde: null,
    FechaHasta: null,
    Pagina: 0,
    CantidadRegistros: 0,
    CargarDatos: false,
};

export interface FiltroState {
    filtros: DataFiltro
}

export const FiltroInitialState: FiltroState = {
    filtros: filtroInicial
}

const _FiltroReducer = createReducer(FiltroInitialState,

    on(clearFiltros, (state) => ({
        ...state,
        filtros: filtroInicial,
    })),

    on(setFiltros, (state, { filtros }) => ({
        ...state,
        filtros: filtros
    })),

    

);

export function FiltroReducer(state, action) {
    return _FiltroReducer(state, action);
}