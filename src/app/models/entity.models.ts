
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
    ClienteList?: string;
    NombreCompleto?: string;
}


export interface Rol {
    Id: number;
    Descripcion?: string;
    Vigente?: boolean;
    IdDescripcion?: string;
}


export interface DataFiltro {
    IdProfesional?: number;
    IdProyecto?: number;
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


export interface Producto {
    Id: number;
    Descripcion: string;
}

export interface TipoTarea {
    Id: number;
    Descripcion: string;
}

export interface Tarea {
    Id: number;
    Descripcion: string;
    Tipo: TipoTarea;
    TipoDescripcion: string;
    Profesional: Profesional;
    FechaInicio: Date;
    FechaFin: Date;
    Entregado?: boolean;
    FechaEntrega?: Date;
}

export interface Profesional {
    Id: number;
    Apellido: string;
    Nombre: string;
}


export interface Proyecto {
    Id: number;
    Descripcion: string;
    Producto?: Producto;
    ProductoDescripcion?: string;
    FechaInicio: Date;
    FechaFin: Date;
    Tareas: Tarea[];
    TareasFULL?: Tarea[];
}
