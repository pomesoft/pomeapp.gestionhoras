import { Usuario } from '../models/entity.models';

export interface CargarUsuario {
    total: number;
    usuarios: Usuario[];
}