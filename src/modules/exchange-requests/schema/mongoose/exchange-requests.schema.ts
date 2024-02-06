import mongoose, { Schema } from "mongoose";
import { ExchangeRequests, ExchangeRequestsModelType } from "../../interfaces/exchange-requests.interfaces";

export const ExchangeRequestsSchema = new Schema(
  {
    Date: String,
    Order: {
      type: String,
      unique: true,
    },
    FinalPrice: Number,
    Status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed"],
    },
    Products: [
      {
        Product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        Qty: {
          type: Number,
          default: 1,
        },
        TotalPrice: {
          type: Number,
        },
      },
    ],
  },
  {
    virtuals: {
      ID: {
        get() {
          return this._id;
        },
      },
    },
  }
);

ExchangeRequestsSchema.set("toJSON", { virtuals: true });

export default function BootstrapSchema(dbClient: typeof mongoose, schema: Schema) {
  return dbClient.model<ExchangeRequests, ExchangeRequestsModelType>("ExchangeRequests", schema);
}
