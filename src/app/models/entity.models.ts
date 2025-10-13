export interface ResponseApi {
    OK:      boolean;
    Mensaje: string;
    Data?:    null;
}


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
    CambiarClave?: boolean;
}

export interface Rol {
    Id: number;
    Descripcion: string;
    Vigente?: boolean;
    NivelAcceso?: number;
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
    Usuario?: Usuario;
    Cliente?: Cliente;
    Proyecto?: Proyecto;
    Funcion?: Funcion;
    ClasificacionActividad?: ClasificacionActividad;
    PeriodoFechas?: number;
    PeriodoRegistro?: string;
    Meses?: number;
    FechaDesde?: Date;
    FechaHasta?: Date;
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
    Descripcion2?: string;
    Valor?: number;
    Valor2?: number;
    Valor3?: number;
    SubItems?: SubItemNivel1[];
}

export interface SubItemNivel1 {
    Id: number;
    Descripcion: string;
    Valor?: number;
    Valor2?: number;
    Valor3?: number;
    SubItemsN2?: SubItemNivel2[],
}

export interface SubItemNivel2 {
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

export interface ProyectoFuncionDashboard {
    UsuarioId: number;
    Usuario: String;
    ProyectoId: number;
    Proyecto: string;
    FuncionId: number;
    Funcion: string;
    HorasAsignadas: number;
    HorasRegistradas: number;
    HorasRegistradasUsuario: number;
}

export interface ProyectoFuncion {
    Id: number;
    Funcion: Funcion;
    Horas: number;
    TotalRegistradas?: number;
    RegistroHoras?: RegistroHoraDTO[]
}

export interface Proyecto {
    Id: number;
    Codigo: string;
    Descripcion?: string;
    DiaCierre?: number;
    Vigente?: boolean;
    TotalRegistradas?: number;
    TipoProyecto?: TipoProyecto;
    Cliente?: Cliente;
    LiderProyecto?: Usuario;
    LiderProyectoBackup?: Usuario;
    FuncionesAsignadas?: ProyectoFuncion[];
    UsuariosAsignados?: Usuario[];
    FuncionIdSeleccionada?: number;
    TotalAsignadas?: number;
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
    Periodo?: string;
    Detalle?: string;
}

export interface RegistroHoraDTO {
    Id: number,
    Fecha: Date,
    FechaString: string;
    Horas: number,
    DiaCierre: number,
    Periodo: string;
    Detalle: string,
    UsuarioId: number,
    ProyectoId: number,
    FuncionAsignadaId: number,
    ClasificacionActividadId: number
}

export interface FiltroListadoRegistroDTO {
    UsuarioId?: number;
    ProyectoId?: number;
    ClienteId?: number
    FuncionaAsignadaId?: number;
    ClasificacionActividadId?: number;
    FechaDesde?: Date;
    FechaHasta?: Date;
    PeriodoFechas?: number;
    PeriodoRegistro?: string;
}

export interface ReporteItem {
    Id: number;
    Fecha: string;
    Horas: number;
    Periodo: string;
    UsuarioId: number;
    Usuario: string;
    ClienteId: number;
    CodigoCliente: string;
    Cliente: string;
    ProyectoId: number;
    CodigoProyecto: string;
    FuncionId: number;
    FuncionaAsignada: string;
    ClasificacionActividadId: number;
    ClasificacionDeActividad: string;
    DetalleYProducto: string;
}

export interface DashboardItem {
    Id: number;
    HorasAsignadas: number;
    HorasRegistradas: number;
    HorasRegistradasUsuario: number;
    Periodo: string;
    UsuarioId: number;
    Usuario: string;
    ClienteId: number;
    CodigoCliente: string;
    Cliente: string;
    ProyectoId: number;
    CodigoProyecto: string;
    FuncionId: number;
    FuncionaAsignada: string;
}

export interface DatosExportarExcel {
    NombreArchivo: string;
    NombreHoja: string;
    Titulo: string;
    Subtitulo: string;
    Parametros: string[];
    ReporteItems: string[];
    TotalesItems: string[];
}

export interface UsuarioProyecto {
    Id: number;
    UsuarioId: number;
    ProyectoId: number;
}