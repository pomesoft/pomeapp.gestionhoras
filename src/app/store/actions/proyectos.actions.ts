import { createAction, props } from '@ngrx/store';
import { Proyecto } from '../../models/entity.models';

//**************************************************************************** */
//gestion de un proyecto
export const cargarProyecto = createAction(
    '[Proyecto] Cargar Proyecto',
    props<{ id: number }>()
);

export const cargarProyectoSuccess = createAction(
    '[Proyecto] Cargar Proyecto Success',
    props<{ proyecto: Proyecto }>()
);

export const cargarProyectoError = createAction(
    '[Proyecto] Cargar Proyecto Error',
    props<{ payload: any }>()
);

//**************************************************************************** */
//gestion del listdo de proyectos
export const cargarProyectos = createAction('[Proyectos] Cargar Proyectos');

export const cargarProyectosSuccess = createAction(
    '[Proyectos] Cargar Proyectos Success',
    props<{ proyectos: Proyecto[] }>()
);

export const cargarProyectosError = createAction(
    '[Proyectos] Cargar Proyectos Error',
    props<{ payload: any }>()
);