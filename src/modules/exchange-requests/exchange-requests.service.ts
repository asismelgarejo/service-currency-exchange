import { ExchangeRequestsDTO, ExchangeRequestsModelType } from "./interfaces";


export default class UsersService {
  constructor(private model: ExchangeRequestsModelType) {}

  async getExchanges(): Promise<ExchangeRequestsDTO[]> {
    try {
      return this.model.find();
    } catch (error) {
      console.log("UsersService: ", error);
      throw error;
    }
  }

  // async createProduct(payload: Omit<ExchangeRequestsDTO, "ID">): Promise<void> {
  //   try {
  //     await this.model.create(payload);
  //   } catch (error) {
  //     console.log("UsersService: createProduct", error);
  //     throw error;
  //   }
  // }

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
