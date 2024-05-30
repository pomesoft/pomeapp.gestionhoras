import { createAction, props } from '@ngrx/store';
import { DataFiltro } from '../../models/entity.models';


export const setFiltros = createAction(
    '[Filtro] Set Filtros Operaciones',
    props<{
        filtros: DataFiltro
    }>()
);

export const setFiltro = createAction(
    '[Filtro] Set Filtro',
    props<{
        cargarDatos: boolean,
    }>()
);


export const clearFiltros = createAction('[Filtro] Clear Filtros Operaciones');
