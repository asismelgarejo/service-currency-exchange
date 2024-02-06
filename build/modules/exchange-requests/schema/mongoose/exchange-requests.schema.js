import { Schema } from "mongoose";
export const ExchangeRequestsSchema = new Schema({
    tipo_de_cambio: {
        type: String,
        enum: ["compra", "venta"],
    },
    tasa_de_cambio: {
        _id: {
            type: Schema.Types.ObjectId,
        },
        purchase_price: {
            type: Number,
        },
        monto_enviar: {
            type: Number,
        },
        monto_recibir: {
            type: Number,
        },
        id_usuario: {
            type: Schema.Types.ObjectId,
        },
    },
}, {
    virtuals: {
        ID: {
            get() {
                return this._id;
            },
        },
    },
});
ExchangeRequestsSchema.set("toJSON", { virtuals: true });
export default function BootstrapSchema(dbClient, schema) {
    return dbClient.model("ExchangeRequests", schema);
}
