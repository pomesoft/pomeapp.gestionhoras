import { createAction, props } from '@ngrx/store';
import { Funcion } from '../../models/entity.models';

//**************************************************************************** */
//gestion de un funcion
export const cargarFuncion = createAction(
    '[Funcion] Cargar Funcion',
    props<{ id: number }>()
);

export const cargarFuncionSuccess = createAction(
    '[Funcion] Cargar Funcion Success',
    props<{ funcion: Funcion }>()
);

export const cargarFuncionError = createAction(
    '[Funcion] Cargar Funcion Error',
    props<{ payload: any }>()
);

//**************************************************************************** */
//gestion del listdo de funciones
export const cargarFunciones = createAction('[Funciones] Cargar Funciones');

export const cargarFuncionesSuccess = createAction(
    '[Funciones] Cargar Funciones Success',
    props<{ funciones: Funcion[] }>()
);

export const cargarFuncionesError = createAction(
    '[Funciones] Cargar Funciones Error',
    props<{ payload: any }>()
);