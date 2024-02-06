import { Document, Model } from "mongoose";
export interface UserDocument extends Document {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Status: "Active" | "Suspended";
}

export type UserModelType = Model<UserDocument>;
