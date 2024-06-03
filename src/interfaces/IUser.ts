export interface Iuser  {
  id: string,
  username: string,
  email: string,
  password: string,
  userType: boolean,
  token?: string,
}

export type UserType = "Admin" | "Driver" | "Responsable";

export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  picture?: string | null;
  userType: UserType;
}