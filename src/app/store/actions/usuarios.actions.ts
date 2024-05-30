import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/entity.models';


export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const procesarUsuariosSuccess = createAction(
    '[Usuarios] Procesar Usuarios',
    props<{ usuarios: Usuario[] }>()
);


export const cargarUsuariosSuccess = createAction(
    '[Usuarios] Cargar Usuarios Success',
    props<{ usuarios: Usuario[] }>()
);

export const cargarUsuariosError = createAction(
    '[Usuarios] Cargar Usuarios Error',
    props<{ payload: any }>()
);