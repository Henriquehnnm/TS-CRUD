import path from "node:path"

import type {User} from "../../types/user"

export async function userParser() {
  try {

    const filePath: string = path.join(process.cwd(), "src", "data", "users.json")
    const file = Bun.file(filePath)

    const content: string = await file.text()
    const users: User[] = JSON.parse(content)

    return users
  } catch (error) {
    console.error(`ERROR: ${error}`)
    return []
  }
}
