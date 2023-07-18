export type AuthResponse = {
  token: string,
  user: {
    id: string,
    email: string,
    picture: string,
    role: {
      id: number,
      name: string
    }[]
  }
}
