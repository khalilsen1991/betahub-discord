import { Guild, Message } from 'discord.js'
import { config } from 'dotenv'
import { ClientWithCommands, GuildDocument } from '../../types'
config()

export const MessageEventManager = async (message: Message, client: ClientWithCommands, guild: Guild, serverConfigs: GuildDocument) => {
  if(message.guildId !== guild.id) return
  if(message.author.bot || !process.env.PREFIX) return
  if(message.content.startsWith(process.env.PREFIX)){
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g) as string[]
    const command = args.shift()!.toLowerCase()
    const cmd = client.commands.get(command)
    if(!cmd) return
    cmd.run(client, message, args, guild, serverConfigs, command)
  }
}
