import { ChannelType, Guild, GuildBasedChannel, Message, PartialMessage } from 'discord.js'
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

export const MessageUpdateEventManager = async (oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage, client: ClientWithCommands, guild: Guild, serverConfigs: GuildDocument) => {
  if(newMessage.guildId !== guild.id) return
  const channelLogs = guild.channels.cache.get(serverConfigs.messagesLogsChannelId) as GuildBasedChannel | undefined
  const messageChannel = guild.channels.cache.get(newMessage.channelId)
  if (!channelLogs || !messageChannel || !newMessage || channelLogs.type !== ChannelType.GuildText) return
  channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}> ✏ <@!${newMessage.author!.id}> (**${newMessage.author!.username || newMessage.author!.displayName}**, \`${newMessage.author!.id}\`) edited their message (\`${newMessage.id}\`) in <#${newMessage.channelId}> (**#${messageChannel.name}**, \`${messageChannel.id}\`):\n**Before:**\`\`\`${oldMessage.content}\`\`\`**After:**\`\`\`${newMessage.content}\`\`\``)
}

export const MessagDeleteEventManager = async (message: Message<boolean> | PartialMessage, client: ClientWithCommands, guild: Guild, serverConfigs: GuildDocument) => {
  if(message.guildId !== guild.id) return
  const channelLogs = guild.channels.cache.get(serverConfigs.messagesLogsChannelId) as GuildBasedChannel | undefined
  const messageChannel = guild.channels.cache.get(message.channelId)
  if (!channelLogs || !messageChannel || !message || channelLogs.type !== ChannelType.GuildText) return
  channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}>  🗑 Message (\`${message.id}\`) from <@!${message.author!.id}> (**${message.author!.username || message.author!.displayName}**, \`${message.author!.id}\`) deleted in <#${message.channelId}> (**#${messageChannel.name}**, \`${messageChannel.id}\`) (originally posted at **<t:${message.createdTimestamp/1000}>**):\n\`\`\`${message.content}\`\`\``)
}