type UserStatus = "Active" | "Suspended";
export interface ExchangeRequestsDTO {
  ID: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Status: UserStatus;
}


