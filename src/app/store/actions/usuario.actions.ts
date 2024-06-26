import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/entity.models';


export const cargarUsuario = createAction(
    '[Usuario] Cargar Usuario',
    props<{ id: number }>()
);

export const cargarUsuarioSuccess = createAction(
    '[Usuario] Cargar Usuario Success',
    props<{ usuario: Usuario }>()
);


export const cargarUsuarioError = createAction(
    '[Usuario] Cargar Usuario Error',
    props<{ payload: any }>()
);