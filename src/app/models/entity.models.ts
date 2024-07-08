
export interface FechaNgDateStruct {
    year: number;
    month: number;
    day: number;
}


export interface UsuarioLogin {
    Usuario: string;
    Clave: String;
    IdCliente?: number;
    ProveedorAuth?: number;
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
    LoginUsuario: string;
    Apellido?: string;
    Nombre?: string;
    Email?: any;
    Celular?: any;
    ProveedorAuth?: number;
    Habilitado?: boolean;
    Vigente?: boolean;
    Rol?: Rol;
    Funcion?: Funcion;    
    NombreCompleto?: string;
}


export interface Rol {
    Id: number;
    Descripcion: string;
}

export interface Funcion {
    Id: number;
    Descripcion: string;
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
}

export interface Tarea {
    Id: number;
    Descripcion: string;
    Profesional: Profesional;
    FechaInicio: Date;
    FechaFin: Date;
    Entregado?: boolean;
    FechaEntrega?: Date;
    HorasPlanificadas?: number;
    Periodo?: number;
    FechaRegistro?: string;
    HorasRegistro?: number;
}

export interface Profesional {
    Id: number;
    Apellido: string;
    Nombre: string;
}

export interface Cliente {
    Id: number;
    Nombre: string;
}


export interface RolFuncion{
    Id: number;    
    Rol: Rol;
    HorasAsignadas?: number;
    Periodo?: number;
    RegistroFecha?: string;
    RegistroHoras?: number;
}


export interface Proyecto {
    Id: number;
    Descripcion: string;
    Cliente?: Cliente;
    Tipo?: TipoProyecto;
    TipoDescripcion?: string;
    Producto?: Producto;
    ProductoDescripcion?: string;
    FechaInicio?: Date;
    FechaFin?: Date;
    RolesAsignados?: RolFuncion[];
    RolesAsignadosFULL?: RolFuncion[];
}


export interface RegistroHora {
    Id: number;
    Profesional: Profesional;
    Cliente: Cliente;
    Proyecto: Proyecto;
    Tarea: Tarea;
    Fecha?: Date;
    FechaFormat?: string;
    Horas?: number;
}