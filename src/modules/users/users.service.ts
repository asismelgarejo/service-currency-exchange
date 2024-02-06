import { UserDTO, UserModelType } from "./interfaces/index.js";


export default class UsersService {
  constructor(private model: UserModelType) {}
  async getUsers(): Promise<void> {
    // try {
    //   const accessToken = jwt.sign({ user: userDto.Email }, ACCESS_TOKEN);
    //   return this.model.find();
    // } catch (error) {
    //   console.log("UsersService: ", error);
    //   throw error;
    // }
  }

  async findUser(Email: string): Promise<UserDTO> {
    try {
      const response = await this.model.findOne({ Email });
      if (!response) {
        throw new Error("the user does not exist");
      }
      return response?.toJSON();
    } catch (error) {
      console.log("UsersService: findUser", error);
      throw error;
    }
  }
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
