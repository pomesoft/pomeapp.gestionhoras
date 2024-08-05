import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../models/entity.models';

//**************************************************************************** */
//gestion de un cliente
export const cargarCliente = createAction(
    '[Cliente] Cargar Cliente',
    props<{ id: number }>()
);

export const cargarClienteSuccess = createAction(
    '[Cliente] Cargar Cliente Success',
    props<{ cliente: Cliente }>()
);

export const cargarClienteError = createAction(
    '[Cliente] Cargar Cliente Error',
    props<{ payload: any }>()
);

//**************************************************************************** */
//gestion del listdo de clientes
export const cargarClientes = createAction(
    '[Clientes] Cargar Clientes',
    props<{ listarVigentes: boolean }>()
);

export const cargarClientesSuccess = createAction(
    '[Clientes] Cargar Clientes Success',
    props<{ clientes: Cliente[] }>()
);

export const cargarClientesError = createAction(
    '[Clientes] Cargar Clientes Error',
    props<{ payload: any }>()
);