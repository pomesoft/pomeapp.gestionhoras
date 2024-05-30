import { createAction, props } from '@ngrx/store';

export type cargarDatosValidos = 'dashboard' | 'listado' | 'ctacte' | 'solicitudes';

export const setCargarDatos = createAction(
    '[PathReturn] Set Cargar Datos',
    props<{ cargarDatos: cargarDatosValidos }>()
);
