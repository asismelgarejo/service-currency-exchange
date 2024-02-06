var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEnum, validateSync, IsNumber } from "class-validator";
// Define the UserStatus enum
export var TipoDeCambio;
(function (TipoDeCambio) {
    TipoDeCambio["compra"] = "compra";
    TipoDeCambio["venta"] = "venta";
})(TipoDeCambio || (TipoDeCambio = {}));
export class ExchangeRequestsDTO {
    MontoEnviar;
    TipoDeCambio;
}
__decorate([
    IsNumber()
], ExchangeRequestsDTO.prototype, "MontoEnviar", void 0);
__decorate([
    IsEnum(TipoDeCambio)
], ExchangeRequestsDTO.prototype, "TipoDeCambio", void 0);
export const ValidateExchangeRequestDTO = (data) => {
    const payload = data;
    const record = new ExchangeRequestsDTO();
    record.MontoEnviar = payload.MontoEnviar;
    record.TipoDeCambio = payload.TipoDeCambio;
    return validateSync(record);
};
