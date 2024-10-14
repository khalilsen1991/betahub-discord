import { Client, GuildMember, Message } from "discord.js"
import { GetMember, PostMember } from "../ApiConnections"
import { GetGuildMember, GetGuildMemberForId } from "../DiscordFunctions"

export const GuildCommandMiddleware = async (client: Client, message: Message<boolean>): Promise<boolean> => {
	const guildMember = await GetGuildMember(client, message) as GuildMember
	const { data: userDB } = await GetMember(guildMember)
	if(userDB == 'User not exist') {
		const roles: string[] = []
		const getMemberRoles = guildMember.roles.valueOf()
		getMemberRoles.map(rol => roles.push(rol.id))
		await PostMember(guildMember)
	}
	return true
}

export const MemberCommandMiddleware = async (client: Client, message: Message<boolean>, discordId: string): Promise<boolean> => {
	const guildMember = await GetGuildMemberForId(client, message, discordId) as GuildMember
	const { data: userDB } = await GetMember(guildMember)
	if(userDB == 'User not exist') {
		const roles: string[] = []
		const getMemberRoles = guildMember.roles.valueOf()
		getMemberRoles.map(rol => roles.push(rol.id))
		await PostMember(guildMember)
	}
	return true
}