type UserRole = "root" | "normal"

export interface User {
  id: number
  username: string
  role: UserRole
  hasSudo: boolean
  isLoggedIn: boolean
}
