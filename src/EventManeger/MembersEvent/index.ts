import { ChannelType, Client, Guild, GuildBasedChannel, GuildMember, PartialGuildMember } from "discord.js";
import { GuildDocument } from "../../types";

export const MembersEvents = (client: Client, serverConfig: GuildDocument) => {
  client.on('guildMemberRemove', async (member: GuildMember | PartialGuildMember) => {
    const guild: Guild = member.guild
    const channelLogs = guild.channels.cache.get(serverConfig.membersLogsChannelId) as GuildBasedChannel | undefined
    if (!channelLogs || channelLogs.type !== ChannelType.GuildText) return
    channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}> 📤  <@!${member.id}> (**${member.displayName || member.user.displayName || member.user.username}**, \`${member.id}\`) left the server`)
  })
  client.on('guildMemberAdd', async (member: GuildMember) => {
    const guild: Guild = member.guild
    const channelLogs = guild.channels.cache.get(serverConfig.membersLogsChannelId) as GuildBasedChannel | undefined
    if (!channelLogs || channelLogs.type !== ChannelType.GuildText) return
    channelLogs.send(`<t:${Math.round(new Date().getTime() / 1000)}> 📥  <@!${member.id}> (**${member.displayName || member.user.displayName || member.user.username}**, \`${member.id}\`) joined (created <t:${Math.round(member.user.createdTimestamp/1000)}:R>)`)
  })
}