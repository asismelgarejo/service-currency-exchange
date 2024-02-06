import axios from "axios";
import { Types } from "mongoose";
import { ExchangeRequests, ExchangeRequestsDTO, ExchangeRequestsModelType } from "./interfaces/index.js";
import { CambioSeguroResponse, ErrorNotFound } from "../../constants/interfaces.js";

export default class ExchangeService {
  constructor(private model: ExchangeRequestsModelType) {}

  async getExchanges(userId: string): Promise<ExchangeRequests[]> {
    try {
      return this.model.find({
        "tasa_de_cambio.id_usuario": new Types.ObjectId(userId),
      });
    } catch (error) {
      console.log("ExchangeService: ", error);
      throw error;
    }
  }
  async getExchange(exchangeId: string, userId: string): Promise<ExchangeRequests> {
    try {
      const response = await this.model
        .findOne({
          _id: new Types.ObjectId(exchangeId),
          "tasa_de_cambio.id_usuario": new Types.ObjectId(userId),
        })
        .exec();
      if (!response) {
        throw new ErrorNotFound(`Exchange request with ID ${exchangeId} was not found`);
      }
      return response;
    } catch (error) {
      console.log("ExchangeService: ", error);
      throw error;
    }
  }
  async deleteExchange(exchangeId: string, userId: string): Promise<void> {
    try {
      const response = await this.model.deleteOne({ _id: new Types.ObjectId(exchangeId), "tasa_de_cambio.id_usuario": new Types.ObjectId(userId) });
      if (response.deletedCount === 0) {
        throw new ErrorNotFound("the order does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("OrderService: deleteExchange", error?.message);
      throw error;
    }
  }
  async requestExchange(exchangeRequestsDTO: ExchangeRequestsDTO, userId: string): Promise<void> {
    try {
      const { data } = await axios.get<CambioSeguroResponse>("https://api.test.cambioseguro.com/api/v1.1/config/rates");

      const payload = {
        tipo_de_cambio: exchangeRequestsDTO.tipo_de_cambio,
        tasa_de_cambio: {
          _id: data.data._id,
          purchase_price: data.data.purchase_price,
          monto_enviar: exchangeRequestsDTO.monto_enviar,
          monto_recibir: 0,
          id_usuario: userId,
        },
      };

      if (exchangeRequestsDTO.tipo_de_cambio === "compra") {
        payload.tasa_de_cambio.monto_recibir = exchangeRequestsDTO.monto_enviar * data.data.purchase_price;
      } else if (exchangeRequestsDTO.tipo_de_cambio === "venta") {
        payload.tasa_de_cambio.monto_recibir = exchangeRequestsDTO.monto_enviar / data.data.sale_price;
      }

      await this.model.create(payload);
    } catch (error) {
      console.log("ExchangeService: createProduct", error);
      throw error;
    }
  }
}
