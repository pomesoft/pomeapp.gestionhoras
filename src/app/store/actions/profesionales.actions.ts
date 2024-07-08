import { createAction, props } from '@ngrx/store';
import { Profesional } from '../../models/entity.models';

//**************************************************************************** */
//gestion de un profesional
export const cargarProfesional = createAction(
    '[Profesional] Cargar Profesional',
    props<{ id: number }>()
);

export const cargarProfesionalSuccess = createAction(
    '[Profesional] Cargar Profesional Success',
    props<{ profesional: Profesional }>()
);

export const cargarProfesionalError = createAction(
    '[Profesional] Cargar Profesional Error',
    props<{ payload: any }>()
);

//**************************************************************************** */
//gestion del listdo de profesionales
export const cargarProfesionales = createAction('[Profesionales] Cargar Profesionales');

export const cargarProfesionalesSuccess = createAction(
    '[Profesionales] Cargar Profesionales Success',
    props<{ profesionales: Profesional[] }>()
);

export const cargarProfesionalesError = createAction(
    '[Profesionales] Cargar Profesionales Error',
    props<{ payload: any }>()
);