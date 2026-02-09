import path from "node:path"

import { User } from "../types/user"

export async function userParser() {
  try {

    const filePath = path.join(process.cwd(), "src", "data", "users.json")
    const file = Bun.file(filePath)

    const content = await file.text()
    const users: User[] = JSON.parse(content)

    return users
  } catch (error) {
    console.error(`ERROR: ${error}`)
    return []
  }
}
