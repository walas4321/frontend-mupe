// import { ZonasRegistralesBdResponse } from "../api/interoperatibilidad/models";
import { ErrorDetalleModel } from "./error-detalle.model";

export interface Alerta {
  message?: string;
  classname?: string;
  delay?: number;
  title?: string;
  errores?: ErrorDetalleModel[];
}


// export interface ZonasRegistralesResponseList extends ZonasRegistralesBdResponse {
//   zonaOfina?: string
//   conexionBDID?: string
// }

