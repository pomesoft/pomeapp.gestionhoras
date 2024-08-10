
export interface FechaNgDateStruct {
    year: number;
    month: number;
    day: number;
}


export interface UsuarioLogin {
    Usuario: string;
    Clave: String;
    RecordarUser?: boolean;
    ClaveNueva?: String;
}

export interface ResponseApiLogin {
    OK: boolean;
    Mensaje: string;
    Usuario: Usuario;
}

export interface Usuario {
    Id: number;
    Apellido?: string;
    Nombre?: string;
    ItemList?: string;
    Email?: any;
    Celular?: any;
    LoginUsuario?: string;
    Clave?: string;
    Vigente?: boolean;
    Rol?: Rol;
    Funcion?: Funcion;
}

export interface Rol {
    Id: number;
    Descripcion: string;
    Vigente?: boolean;
}

export interface Funcion {
    Id: number;
    Descripcion: string;
    Vigente?: boolean;
}

export interface ClasificacionActividad {
    Id: number;
    Descripcion: string;
    Vigente?: boolean;
}

export interface DataFiltro {
    IdProfesional?: number;
    Profesional?: string;
    IdCliente?: number;
    Cliente?: string;
    IdProyecto?: number;
    Proyecto?: string;
    IdTipoProyecto?: number;
    Periodo?: number;
    Meses?: number;
    FechaDesde?: string;
    FechaHasta?: string;
    Pagina?: number;
    CantidadRegistros?: number;
    FechaDesdeNgDate?: FechaNgDateStruct;
    FechaHastaNgDate?: FechaNgDateStruct;
    CargarDatos?: boolean;
}


export interface DashboardInfo {
}


export interface ItemListado {
    Id: number;
    Descripcion: string;
    Valor?: number;
}

export interface Producto {
    Id: number;
    Descripcion: string;
}

export interface TipoProyecto {
    Id: number;
    Descripcion: string;
    Vigente?: boolean;
}

export interface Profesional {
    Id: number;
    Apellido: string;
    Nombre: string;
    Funcion: Funcion;
}

export interface Cliente {
    Id: number;
    Codigo: string;
    Nombre: string;
    Vigente?: boolean;
}


export interface RolFuncion {
    Id: number;
    Rol: Rol;
    HorasAsignadas?: number;
    Periodo?: number;
    RegistroFecha?: string;
    RegistroHoras?: number;
}


export interface ProyectoDTO {
    Id: number;
    Codigo: string;
    Descripcion: string;
    DiaCierre: number;
    Vigente: boolean;
    TipoProyectoId: number;
    ClienteId: number;
    LiderProyectoId: number;
    LiderProyectoBackupId: number;
}

export interface Proyecto {
    Id: number;
    Codigo: string;
    Descripcion?: string;
    DiaCierre?: number;
    Vigente?: boolean;
    TipoProyecto?: TipoProyecto;
    Cliente?: Cliente;
    LiderProyecto?: Usuario;
    LiderProyectoBackup?: Usuario;
    RolesAsignados?: RolFuncion[];
    RolesAsignadosFULL?: RolFuncion[];
}


export interface RegistroHora {
    Id: number;
    Profesional: Profesional;
    Cliente: Cliente;
    Proyecto: Proyecto;
    Funcion: Funcion;
    Fecha?: Date;
    FechaFormat?: string;
    Horas?: number;
    Detalle?: string;
}
