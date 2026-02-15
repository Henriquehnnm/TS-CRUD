import { Command } from "commander"

import { getUserByUsername, getUserById } from "../utils/readers/catcher"
import { getLoggedUsers, getUsersWithSudo, getUsersByRole } from "../utils/readers/filters"

export function cliArgs() {
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
          const user = await getUserByUsername(options.name)

          if (user) {
            console.table(user)
          } else {
            console.error("Usuario nao encontrado!")
          }
        }

        if (options.identifier) {
          const user = await getUserById(Number(options.identifier))

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
          const users = await getLoggedUsers()

          if (users.length > 0) {
            console.table(users)
          } else {
            console.error("Nao a usuarios logados no momento")
          }
        }

        if (options.sudo) {
          const users = await getUsersWithSudo()

          if (users.length > 0) {
            console.table(users)
          } else {
            console.error("Nao a usuarios com acesso a root")
          }
        }

        if (options.role) {
          const users = await getUsersByRole(options.role)

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
    .command("creator")
    .description("Cria um novo usario")
    .action(() => {
      console.log("LOGDEVTEST: Importar aqui a funcao de criacao de usuarios")
    })

  program.parse()

}
