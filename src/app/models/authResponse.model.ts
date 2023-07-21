import { User } from "./user.model"

export type AuthReponse = {

  token: string,
  user: User
}
