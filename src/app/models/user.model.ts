export type User = {
  id: string,
  email: string,
  picture: string,
  roles: {
    id: number,
    name: string
  }[]
}
