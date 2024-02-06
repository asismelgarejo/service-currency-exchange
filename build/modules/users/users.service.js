export default class UsersService {
    model;
    constructor(model) {
        this.model = model;
    }
    async getUsers() {
        // try {
        //   const accessToken = jwt.sign({ user: userDto.Email }, ACCESS_TOKEN);
        //   return this.model.find();
        // } catch (error) {
        //   console.log("UsersService: ", error);
        //   throw error;
        // }
    }
    async findUser(Email) {
        try {
            const response = await this.model.findOne({ Email });
            if (!response) {
                throw new Error("the user does not exist");
            }
            return response?.toJSON();
        }
        catch (error) {
            console.log("UsersService: findUser", error);
            throw error;
        }
    }
}
