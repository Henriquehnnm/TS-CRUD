import { userParser } from "../utils/parser"

export async function getLoggedUsers() {
  try {
    const data = await userParser()

    return data.filter((u: any) => u.isLoggedIn === true)
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}

export async function getUsersWithSudo() {
  try {
    const data = await userParser()

    return data.filter((u: any) => u.hasSudo === true)
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}

export async function getUsersByRole(role: string) {
  try {
    const data = await userParser()

    const filter = data.filter((u: any) => {
      return u.role === role
    })

    return filter
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return []
  }
}
