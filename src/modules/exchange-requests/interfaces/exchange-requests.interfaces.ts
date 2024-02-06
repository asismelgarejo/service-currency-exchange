import { Document, Model } from "mongoose";
import { ExchangeRequestsDTO } from "./exchange-requests.dto";

//#region ORDER
export interface ExchangeRequests extends Document<any, any, any>, ExchangeRequestsDTO {}
export type ExchangeRequestsModelType = Model<ExchangeRequests>;
//#endregion ORDER
