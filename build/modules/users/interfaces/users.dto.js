var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsString, IsEmail, IsEnum, IsOptional, validateSync } from "class-validator";
// Define the UserStatus enum
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "Active";
    UserStatus["Suspended"] = "Suspended";
})(UserStatus || (UserStatus = {}));
export class UserDTO {
    Email;
    Password;
    FirstName;
    LastName;
    Status;
}
__decorate([
    IsEmail()
], UserDTO.prototype, "Email", void 0);
__decorate([
    IsString()
], UserDTO.prototype, "Password", void 0);
__decorate([
    IsString()
], UserDTO.prototype, "FirstName", void 0);
__decorate([
    IsString()
], UserDTO.prototype, "LastName", void 0);
__decorate([
    IsOptional(),
    IsEnum(UserStatus)
], UserDTO.prototype, "Status", void 0);
export const ValidateUserDTO = (data) => {
    const payload = data;
    const user = new UserDTO();
    user.Email = payload.Email;
    user.Password = payload.Password;
    user.FirstName = payload.FirstName;
    user.LastName = payload.LastName;
    return validateSync(user);
};
