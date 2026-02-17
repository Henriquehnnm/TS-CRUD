import {userParser} from "./parser.ts"
import type {User} from "../../types/user.ts";

export async function getLoggedUsers(): Promise<User[]> {
  try {
    const data: User[] = await userParser()

    return data.filter((u: any): boolean => u.isLoggedIn)
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}

export async function getUsersWithSudo(): Promise<User[]> {
  try {
    const data: User[] = await userParser()

    return data.filter((u: any): boolean => u.hasSudo)
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}

export async function getUsersByRole(role: string): Promise<User[]> {
  try {
    const data: User[] = await userParser()

    return data.filter((u: any): boolean => {
      return u.role === role
    })
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}
