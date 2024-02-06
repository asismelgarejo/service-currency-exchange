import { Document, Model, Schema } from "mongoose";
export interface ExchangeRequests extends Document {
  tipo_de_cambio: "compra" | "venta";
  tasa_de_cambio: {
    _id: Schema.Types.ObjectId;
    purchase_price: number;
    monto_enviar: number;
    monto_recibir: number;
    id_usuario: Schema.Types.ObjectId;
  };
}

export type ExchangeRequestsModelType = Model<ExchangeRequests>;
