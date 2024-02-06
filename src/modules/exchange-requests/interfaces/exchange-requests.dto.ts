import { IsEnum, validateSync, IsNumber } from "class-validator";

// Define the UserStatus enum
export enum TipoDeCambio {
  compra = "compra",
  venta = "venta",
}
export class ExchangeRequestsDTO {
  @IsNumber()
  monto_enviar: number;

  @IsEnum(TipoDeCambio)
  tipo_de_cambio?: TipoDeCambio;
}
export const ValidateExchangeRequestDTO = (data: any) => {
  const payload = data as ExchangeRequestsDTO;
  const record = new ExchangeRequestsDTO();
  record.monto_enviar = payload.monto_enviar;
  record.tipo_de_cambio = payload.tipo_de_cambio;
  return validateSync(record);
};
