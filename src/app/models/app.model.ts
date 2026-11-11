import { AreaResponse, BrigadaResponse, DerivacionDto } from "../api/mesa-departes-presencial/models";

export interface Area extends AreaResponse {
    descripcionCompleta?: string;
}

export interface BrigadaExtendida extends BrigadaResponse {
  textoFormateado?: string;
}

export interface Derivacion extends DerivacionDto {
  destinoAbreviado?: string;
  destinoDescripcion?: string;
  dirigidoA?: string;
}

export enum ModoSeleccion {
  INDIVIDUAL = 'individual',
  MULTIPLE = 'multiple',
  RANGO = 'rango'
}

export interface EstadoSeleccion {
  documentosSeleccionados: Set<string>;
  ultimoSeleccionado: number | null;
  modoActual: ModoSeleccion;
  seleccionActiva: boolean;
}
