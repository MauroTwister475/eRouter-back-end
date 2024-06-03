export interface LoginRequestBody {
  email: string;
  password: string;
  userType: "admin" | "driver" | "responsible";
}