export type TipoDeCambio = "compra" | "venta";

export interface ExchangeRequestsDTO {
  TipoDeCambio: TipoDeCambio;
  MontoEnviar: number;
}


