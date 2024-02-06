import axios, { AxiosResponse } from "axios";
import {
  ExchangeRequestsDTO,
  TipoDeCambio,
  ExchangeRequestsModelType,
} from "./interfaces";
import { CambioSeguroResponse, HttpResponse } from "../../constants/interfaces";
import { Types } from "mongoose";

export default class UsersService {
  constructor(private model: ExchangeRequestsModelType) {}

  async getExchanges(userId: string): Promise<ExchangeRequestsDTO[]> {
    try {
      return this.model.find({
        "tasa_de_cambio.id_usuario": new Types.ObjectId(userId),
      });
    } catch (error) {
      console.log("UsersService: ", error);
      throw error;
    }
  }

  async requestExchange(
    exchangeRequestsDTO: ExchangeRequestsDTO,
    userId: string
  ): Promise<void> {
    try {
      const { data } = await axios.get<CambioSeguroResponse>(
        "https://api.test.cambioseguro.com/api/v1.1/config/rates"
      );

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
      } else if (exchangeRequestsDTO.TipoDeCambio === "venta") {
        payload.tasa_de_cambio.monto_recibir =
          exchangeRequestsDTO.MontoEnviar / data.data.sale_price;
      }

      await this.model.create(payload);
    } catch (error) {
      console.log("UsersService: createProduct", error);
      throw error;
    }
  }

  // async updateProduct(ID: string, payload: ExchangeRequestsDTO): Promise<void> {
  //   try {
  //     const response = await this.model.updateOne({ _id: ID }, payload);
  //     if (response.modifiedCount === 0) {
  //       throw new Error("the product does not exist. No document was updated");
  //     }
  //   } catch (error) {
  //     console.log("UsersService: updateProduct", error);
  //     throw error;
  //   }
  // }
  // async findProduct(ID: string): Promise<ExchangeRequestsDTO> {
  //   try {
  //     const response = await this.model.findOne({ _id: ID });
  //     if (!response) {
  //       throw new Error("the product does not exist");
  //     }
  //     return response?.toJSON();
  //   } catch (error) {
  //     console.log("UsersService: findProduct", error);
  //     throw error;
  //   }
  // }
  // async deleteProduct(ID: string): Promise<void> {
  //   try {
  //     const response = await this.model.deleteOne({ _id: ID });
  //     if (response.deletedCount === 0) {
  //       throw new Error("the product does not exist. No document was deleted");
  //     }
  //   } catch (error) {
  //     console.log("UsersService: findProduct", error);
  //     throw error;
  //   }
  // }
}
