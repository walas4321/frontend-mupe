import { Modal } from "./components/shared/modal/modal";


export class CommonConstants {
  public static TIMEOUT = 20000;
	public static readonly EMPTY = '';

  public static STORAGE = {
    AUTH: 'sbnAuthMPP',
    CHANGEFORM: 'sbnChangeMPP',
    MODULOSUSER: 'modUserMPP',
    MENU: 'menuMPP',
    TOKEN: 'tokenMPP',
    REFRESH: 'refresh_tokenMPP',
  };
  public static readonly FORMATO_FECHA_SLASH_DD_MM_YYYY = "DD/MM/YYYY";
  public static readonly SLASH = "/";
  public static readonly GUION = "-";
  public static readonly FORMATO_FECHA_ISO = 'YYYY-MM-DD';

}


export enum ModalOpciones {
  CONFIRMAR,
  CONFIRMARENVIO,
  CONFIRMARELIMINACION,
  CONFIRMARELIMINACIONMODIFICACION,
  CONFIRMARELIMINACIONDETALLE,
  CONFIRMARMODIFICACION,
  CONFIRMARREGISTRO,
  CONFIRMARACTUALIZACION,
  CANCELAR,
  CANCELARNAVEGACION,
  CONFIRMARSESION,
  CANCELARREGISTRO
}


export class VariablesIniciales {
	public static readonly EMPTY = '';
	public static readonly REFERENCIA = '00';
	public static readonly DISPOSITIVO = '0000';
	public static readonly TIPOCAMBIO = '0.000000000000000';
	public static readonly MONTO = '0.00';
	public static readonly MONTO_NUMBER = 0;
}

export class ModalConstants {

  public static readonly MODALEDITAR = 'editar';
  public static readonly MODALAGREGAR = 'agregar';

  public static Default: Modal = {
    id: 'modal',
    title: '',
    subtitle: '',
    ok: '',
    bad: '',
  };

  public static readonly CerrarSesion: Modal = {
    title: 'Su sesión está a punto de cerrarse',
    subtitle: 'Para continuar presione el botón "Sigo aquí"',
    ok: 'Sigo aquí',
    closeable: false,
    backdrop: true,
    index: 2,
    id: "modalchange"
  };

  public static readonly ConfirmarNuevo: Modal = {
    title: '¿Está seguro(a) de registrar los datos?',
    ok: 'Aceptar',
    bad: 'Cancelar',
    backdrop: true,
    loading: 'Se están procesando los datos',
    closeable: false
  };

  public static readonly ConfirmarModificacion: Modal = {
    title: '¿Está seguro(a) de modificar los datos?',
    ok: 'Aceptar',
    bad: 'Cancelar',
    backdrop: true,
    loading: 'Se están procesando los datos',
    closeable: false
  };

  public static readonly ConfirmarEliminacion: Modal = {
    title: '¿Está seguro(a) de eliminar los datos?',
    ok: 'Aceptar',
    bad: 'Cancelar',
    backdrop: true,
    loading: 'Se están procesando los datos',
    closeable: false
  };
}

export const TIPOS_ADMINISTRADO = [
  { id: '', nombre: ':: Seleccione Opción ::' },
  { id: 'J', nombre: 'PERSONA JURÍDICA' },
  { id: 'N', nombre: 'PERSONA NATURAL' },
  { id: 'E', nombre: 'ENTIDAD' },
  { id: 'O', nombre: 'OTROS' }
] as const;