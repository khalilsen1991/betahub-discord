import { Guild, REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import { config } from "dotenv"
import { ClientWithCommands } from "./types";
config();

/* 
PROD
const clientId = process.env.CLIENT_ID
const token = process.env.TOKEN
*/

 // DEV
 /**/
const clientId = process.env.CLIENT_ID as string
const token = process.env.TOKEN as string
 
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync(foldersPath);
let commands = [] as Object[]

export const commandRegister = async (client: ClientWithCommands) => {
  commands = []
  if(!clientId || !token) return console.log('Missing required environment variables. Please check your .env file.')
  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'))
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        const findCommand = client.commands.find((cmd) => cmd.data.name === command.data.name)
        if(!findCommand) {
          client.commands.set(command.data.name, command);
          commands.push(command.data.toJSON());
        }
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);

  // and deploy your commands!
  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await client.guilds.fetch(process.env.GUILD_ID as string).then(async (guild: Guild) => {
        return await rest.put(
          Routes.applicationGuildCommands(clientId, guild.id),
          { body: commands },
        ) as Object[]
      })
      if(data) console.log(`Successfully reloaded application (/) commands for ${data.length} guilds.`)
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}
