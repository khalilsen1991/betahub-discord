import { Client, Guild, GuildMember, Message } from "discord.js";

export const GetGuildMember = (client: Client, message: Message): GuildMember => {
	const guild = client.guilds.cache.get(message.guildId!) as Guild
	return guild.members.cache.get(message.author.id) as GuildMember
}


export const GetGuildMemberForId = (client: Client, message: Message, discordId: string): GuildMember => {
	const guild = client.guilds.cache.get(message.guildId!) as Guild
	return guild.members.cache.get(discordId) as GuildMember
}