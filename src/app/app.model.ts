// import { DatosGeograficosResponse } from "./api/gestiones-administrativas/models";
// import { DocumentoInternoResponse, Recurrente } from "./api/mesa-departes-presencial/models";

export interface Data {
	idaplicativo: string;
	idsistema: string;
	idmodulo?: string;
}

export interface ParamsModule {
	code: string;
	data: Data | string | null;
	session_state: string;
}

// export interface DocumentoInterno extends DocumentoInternoResponse {
// 	activo?: boolean;
// }

export interface AdministradoGrilla {
  codigoRecurrente: string;
  tipoAdministrado: string;
  dni?: string;
  ruc?: string;
  descripcion: string;
  domicilio: string;
  recCorreo: string;
  esNuevo: boolean;
}

// export interface DatosGeograficos extends DatosGeograficosResponse {
// 	esNuevo: boolean;
// }
