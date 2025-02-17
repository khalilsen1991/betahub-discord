import { ChannelType, Guild, GuildBasedChannel, Message, PartialMessage } from 'discord.js'
import { config } from 'dotenv'
import { ClientWithCommands, GuildDocument } from '../../types'
import { KEYMISSIONNINECOMPLETE, MESSAGESHAREACHIEVEMENTCHANNELID, MISSIONNINETEMPTWOCOMPLETEROLEID } from '../../globals'
import { GetHubKeys, PostHubKeys } from '../../Utils/ApiConnections'
import { SuccessfullyEmbed } from '../../Utils/Embeds'
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
  if(message.channelId === MESSAGESHAREACHIEVEMENTCHANNELID){
    if(message.author.bot) return
    if(guild.members.cache.get(message.author.id)?.roles.cache.has(MISSIONNINETEMPTWOCOMPLETEROLEID)) return
    await guild.members.cache.get(message.author.id)?.roles.add(MISSIONNINETEMPTWOCOMPLETEROLEID)
    message.react(`🎊`)
    const keyId = KEYMISSIONNINECOMPLETE
    await GetHubKeys(guild.members.cache.get(message.author.id)!, keyId)
      .then(async ({ data }) => {
        if(data === 'Key aviable'){                
          await fetch('https://api.fitchin.gg/gamification/challenge-player/complete', {
            headers: {
              'Content-Type': 'application/json' ,
                'x-api-key': process.env.TOKEN_FITCHIN || ''
              },
            method: 'POST',
            body: JSON.stringify({ "key": keyId, "discordId":  message.author.id }) 
          }) 
            .then(async (res) => {
              if(res.statusText === 'Accepted') await PostHubKeys(guild.members.cache.get(message.author.id)!, keyId)
              const embeds = await SuccessfullyEmbed(`🏆 ¡MISIÓN COMPLETADA Y CURSO TERMINADO!  🏆\n\nPuedes quedarte en el canal <#1331662547887063103> participando y ayudando`, guild.members.cache.get(message.author.id)!)
              await message.reply({ embeds })
                .then(async (msg) => {
                  setTimeout(() => msg.delete(), 60000)
                })
            })
            .catch((err) => console.log(err))
        }
      })
  }
}

export const MessageUpdateEventManager = async (oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage, client: ClientWithCommands, guild: Guild, serverConfigs: GuildDocument) => {
  try {
    if(newMessage.author!.bot) return
    if(newMessage.guildId !== guild.id) return
    if(newMessage.channelId === serverConfigs.messagesLogsChannelId) return
    const channelLogs = guild.channels.cache.get(serverConfigs.messagesLogsChannelId) as GuildBasedChannel | undefined
    const messageChannel = guild.channels.cache.get(newMessage.channelId)
    if (!channelLogs || !messageChannel || !newMessage || channelLogs.type !== ChannelType.GuildText) return
    channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}> ✏ <@!${newMessage.author!.id}> (**${newMessage.author!.username || newMessage.author!.displayName}**, \`${newMessage.author!.id}\`) edited their message (\`${newMessage.id}\`) in <#${newMessage.channelId}> (**#${messageChannel.name}**, \`${messageChannel.id}\`):\n**Before:**\`\`\`${oldMessage.content}\`\`\`**After:**\`\`\`${newMessage.content}\`\`\``)
  } catch (error) {
   console.log('Error in message logs') 
  }
}

export const MessagDeleteEventManager = async (message: Message<boolean> | PartialMessage, client: ClientWithCommands, guild: Guild, serverConfigs: GuildDocument) => {
  try {
    if(message.author!.bot) return
    if(message.guildId !== guild.id) return
    if(message.channelId === serverConfigs.messagesLogsChannelId) return
    const channelLogs = guild.channels.cache.get(serverConfigs.messagesLogsChannelId) as GuildBasedChannel | undefined
    const messageChannel = guild.channels.cache.get(message.channelId)
    if (!channelLogs || !messageChannel || !message || channelLogs.type !== ChannelType.GuildText) return
    channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}>  🗑 Message (\`${message.id}\`) from <@!${message.author!.id}> (**${message.author!.username || message.author!.displayName}**, \`${message.author!.id}\`) deleted in <#${message.channelId}> (**#${messageChannel.name}**, \`${messageChannel.id}\`) (originally posted at **<t:${message.createdTimestamp/1000}>**):\n\`\`\`${message.content}\`\`\``)
  } catch (error) {
   console.log('Error in message logs') 
  }
}