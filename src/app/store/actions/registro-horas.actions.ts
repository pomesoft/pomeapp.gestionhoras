import { createAction, props } from '@ngrx/store';


export const setTareaRegistroHoras = createAction(
    '[Filtro] Set Tarea para registro de horas',
    props<{
        tareaId: number,
        proyectoId: number,
    }>()
);

export const clearTareaRegistroHoras = createAction(
    '[Filtro] Clear Tarea para registro de horas',
);
