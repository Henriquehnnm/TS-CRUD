import { userParser } from "../utils/parser"

export async function getUserById(num: number) {
  try {
    const data = await userParser()
    const user = data.find((u: any) => u.id === num)
    return user || null
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return null
  }
}

export async function getUserByUsername(name: string) {
  try {
    const data = await userParser()
    const user = data.find((u: any) => u.username === name)
    return user || null
  } catch (error) {
    console.error(`ERRO: ${error}`)
    return null
  }
}
