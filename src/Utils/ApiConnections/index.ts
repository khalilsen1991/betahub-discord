import axios from "axios";
import { GuildMember } from "discord.js";
const PORT = process.env.PORT || 9100

export const GetGuildsConfigs = () => axios.get(`http://localhost:${PORT}/guilds/configs`)
export const PostUser = (member: GuildMember) => axios.post(`http://localhost:${PORT}/user/${member.user.id}/guild/${member.guild.id}`, { user: member.user, guild: member.guild })
export const PutUser = (member: GuildMember) => axios.put(`http://localhost:${PORT}/user/${member.user.id}/guild/${member.guild.id}`, { user: member.user, guild: member.guild })
export const GetUser = (member: GuildMember) => axios.get(`http://localhost:${PORT}/user/${member.user.id}/guild/${member.guild.id}`)
export const PostMember = (member: GuildMember) => axios.post(`http://localhost:${PORT}/guild-member/${member.user.id}/guild/${member.guild.id}`, { guildMember: member })
export const PutMember = (member: GuildMember) => axios.put(`http://localhost:${PORT}/guild-member/${member.user.id}/guild/${member.guild.id}`, { guildMember: member })
export const GetMember = (member: GuildMember) => axios.get(`http://localhost:${PORT}/guild-member/${member.user.id}/guild/${member.guild.id}`)
export const PostHubKeys = (member: GuildMember, keys: string) => axios.post(`http://localhost:${PORT}/post-keys/guild-member/${member.user.id}/guild/${member.guild.id}`, { keys })
export const GetHubKeys = (member: GuildMember, keys: string) => axios.get(`http://localhost:${PORT}/get-keys/guild-member/${member.user.id}/guild/${member.guild.id}/keys/${keys}`)
