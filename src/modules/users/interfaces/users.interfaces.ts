import { Document, Model } from "mongoose";
import { UserDTO } from "./users.dto";

//#region ORDER
export interface UserDocument extends Document<any, any, any>, UserDTO {}
export type UserModelType = Model<UserDocument>;
//#endregion ORDER
