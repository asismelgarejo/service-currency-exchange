import axios from "axios";
import { Types } from "mongoose";
export default class UsersService {
    model;
    constructor(model) {
        this.model = model;
    }
    async getExchanges(userId) {
        try {
            return this.model.find({
                "tasa_de_cambio.id_usuario": new Types.ObjectId(userId),
            });
        }
        catch (error) {
            console.log("UsersService: ", error);
            throw error;
        }
    }
    async requestExchange(exchangeRequestsDTO, userId) {
        try {
            const { data } = await axios.get("https://api.test.cambioseguro.com/api/v1.1/config/rates");
            const payload = {
                tipo_de_cambio: exchangeRequestsDTO.TipoDeCambio,
                tasa_de_cambio: {
                    _id: data.data._id,
                    purchase_price: data.data.purchase_price,
                    monto_enviar: exchangeRequestsDTO.MontoEnviar,
                    monto_recibir: 0,
                    id_usuario: userId,
                },
            };
            if (exchangeRequestsDTO.TipoDeCambio === "compra") {
                payload.tasa_de_cambio.monto_recibir =
                    exchangeRequestsDTO.MontoEnviar * data.data.purchase_price;
            }
            else if (exchangeRequestsDTO.TipoDeCambio === "venta") {
                payload.tasa_de_cambio.monto_recibir =
                    exchangeRequestsDTO.MontoEnviar / data.data.sale_price;
            }
            await this.model.create(payload);
        }
        catch (error) {
            console.log("UsersService: createProduct", error);
            throw error;
        }
    }
}
