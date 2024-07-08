import { createReducer, on } from '@ngrx/store';
import { clearTareaRegistroHoras, setTareaRegistroHoras } from '../actions';


export interface RegistroHorasState {
    tareaId: number,
    proyectoId: number,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const regsitroHorasInitialState: RegistroHorasState = {
    tareaId: -1,
    proyectoId: -1,
    loaded: false,
    loading: false,
    error: null
}


const _RegistroHorasReducer = createReducer(regsitroHorasInitialState,

    on(clearTareaRegistroHoras, (state) => ({
        ...state,
        tareaId: -1,
        proyectoId: -1,
    })),

    on(setTareaRegistroHoras, (state, { tareaId, proyectoId }) => ({
        ...state,
        tareaId: tareaId,
        proyectoId: proyectoId,
    })),



);

export function RegistroHorasReducer(state, action) {
    return _RegistroHorasReducer(state, action);
}