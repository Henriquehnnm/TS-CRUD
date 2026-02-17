import { join } from "node:path"

import type {User} from "../../types/user.ts";

function getUserName(): string | null {
    const name: string | null = prompt('Digite seu nome:');
    return name ? name : null;
}

export async function createUser(): Promise<void> {
    try {

        const path = join(import.meta.dir, "..", "..", "data", "users.json");

        const file = Bun.file(path)

        const list: any = await file.json()

        const name: string | null = getUserName()

        const exist: boolean = list.some((u: User): boolean => u.username.toLowerCase() === name?.toLowerCase())


        if (!name) {
            console.error("O nome e obrigatorio")
            process.exit(1)
        }

        if (exist) {
            console.error("O usuario ja existe")
            process.exit(1)
        }

        const data: User = {
            id: 0,
            username: `${name}`,
            role: "normal",
            hasSudo: false,
            isLoggedIn: true,
        }

        data.id = list.length > 0 ? list[list.length - 1].id + 1 : 1

        list.push(data)

        await Bun.write(path, JSON.stringify(list, null, 2))
    } catch (error) {
        console.error(error)
    }
}