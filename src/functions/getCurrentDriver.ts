import { UserLogged } from "../controller/auth.controller";

export function getCurrentDriver(currentUser: UserLogged) {
  console.log(currentUser);
  return currentUser;
}