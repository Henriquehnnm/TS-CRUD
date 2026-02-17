import { Command } from "commander"

import { getUserByUsername, getUserById } from "../utils/readers/catcher"
import { getLoggedUsers, getUsersWithSudo, getUsersByRole } from "../utils/readers/filters"
import { createUser } from "../utils/writers/creator"
import type {User} from "../types/user.ts";

export function cliArgs(): void {
  const program = new Command()

  // TODO - Modularizar args em funcoes ou ate em arquivos separados

  // Leitores
  program
    .name("UserSys")
    .description("Uma cli simples de CRUD para estudos")
    .version("1.0.0")

  program
    .command("get")
    .description("Pega um usuario pelo ID ou pelo username")
    .option("-n, --name <name>", "Buscar pelo nome de usuario")
    .option("-i, --identifier <number>", "Buscar pelo ID")
    .action(
      async (options) => {
        if (options.name) {
          const user: User | null = await getUserByUsername(options.name)

          if (user) {
            console.table(user)
          } else {
            console.error("Usuario nao encontrado!")
          }
        }

        if (options.identifier) {
          const user: User | null = await getUserById(Number(options.identifier))

          if (user) {
            console.table(user)
          } else {
            console.error("Usuario nao encontrado!")
          }
        }
      }
    )

  program
    .command("find")
    .description("Procura e filtra os usuarios pelas suas informacoes")
    .option("-l, --logged", "Filtra os usuarios logados")
    .option("-s, --sudo", "Filtra os usuarios com asseso a root")
    .option("-r, --role <option>", "Filtra o usuario pelo role (root/normal)")
    .action(
      async (options) => {
        if (options.logged) {
          const users: User[] = await getLoggedUsers()

          if (users.length > 0) {
            console.table(users)
          } else {
            console.error("Nao a usuarios logados no momento")
          }
        }

        if (options.sudo) {
          const users: User[] = await getUsersWithSudo()

          if (users.length > 0) {
            console.table(users)
          } else {
            console.error("Nao a usuarios com acesso a root")
          }
        }

        if (options.role) {
          const users: User[] = await getUsersByRole(options.role)

          if (users.length > 0) {
            console.table(users)
          } else {
            console.error("Nao a usuarios com esse role")
          }
        }
      }
    )

  // Criadores
  program
    .command("create")
    .description("Cria um novo usario")
    .action(async (): Promise<void> => {
       await createUser()
    })

  program.parse()

}
