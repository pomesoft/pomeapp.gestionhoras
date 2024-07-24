import { createAction, props } from '@ngrx/store';
import { ClasificacionActividad } from '../../models/entity.models';

//**************************************************************************** */
//gestion de un clasificacionActividad
export const cargarClasificacionActividad = createAction(
    '[ClasificacionActividad] Cargar ClasificacionActividad',
    props<{ id: number }>()
);

export const cargarClasificacionActividadSuccess = createAction(
    '[ClasificacionActividad] Cargar ClasificacionActividad Success',
    props<{ clasificacionActividad: ClasificacionActividad }>()
);

export const cargarClasificacionActividadError = createAction(
    '[ClasificacionActividad] Cargar ClasificacionActividad Error',
    props<{ payload: any }>()
);

//**************************************************************************** */
//gestion del listdo de clasificacionActividades
export const cargarClasificacionesActividades = createAction('[ClasificacionActividades] Cargar ClasificacionesActividades');

export const cargarClasificacionesActividadesSuccess = createAction(
    '[ClasificacionActividades] Cargar ClasificacionesActividades Success',
    props<{ clasificacionesActividades: ClasificacionActividad[] }>()
);

export const cargarClasificacionesActividadesError = createAction(
    '[ClasificacionActividades] Cargar ClasificacionesActividades Error',
    props<{ payload: any }>()
);