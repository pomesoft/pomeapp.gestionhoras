import { createReducer, on } from '@ngrx/store';
import { DataFiltro } from '../../models/entity.models';
import { clearFiltros, setFiltros } from '../actions';


const filtroInicial: DataFiltro = {
    Meses: 0,
    PeriodoFechas: 1,
    PeriodoRegistro: null,
    FechaDesde: null,
    FechaHasta:null,
    Usuario: null,
    Cliente: null,
    Proyecto: null,
    Funcion: null,
    ClasificacionActividad: null,
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