export type LoginRequestBody = {
  email: string;
  password: string;
  userType: "admin" | "driver" | "responsible";
}

export type UserLogin = {
  id: string;
  username: string;
  picture: string | null;
  email: string;
  userType: "admin" | "driver" | "responsible";
}


