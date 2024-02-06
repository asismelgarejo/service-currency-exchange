import { IsEnum, validateSync, IsNumber } from "class-validator";

// Define the UserStatus enum
export enum TipoDeCambio {
  compra = "compra",
  venta = "venta",
}
export class ExchangeRequestsDTO {
  @IsNumber()
  MontoEnviar: number;

  @IsEnum(TipoDeCambio)
  TipoDeCambio?: TipoDeCambio;
}
export const ValidateExchangeRequestDTO = (data: any) => {
  const payload = data as ExchangeRequestsDTO;
  const record = new ExchangeRequestsDTO();
  record.MontoEnviar = payload.MontoEnviar;
  record.TipoDeCambio = payload.TipoDeCambio;
  return validateSync(record);
};
