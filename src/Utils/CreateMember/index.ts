import { GuildMember, Role } from "discord.js";
import { EventItems, IBossMember } from "../../types";

export const CreateMember = (member: GuildMember, items: EventItems[]| []) : IBossMember => {
  const roles : string[] = []
  member.roles.cache.map((role: Role) => roles.push(role.id))
  
  return {
    discordId: member.id,
    usertag: member.displayName,
    username: member.displayName,
    discriminator: '#0',
    avatarUrl: member.avatar ? member!.avatar : `https://cdn.discordapp.com/embed/avatars/0.png`,
    roles,
    items
  }
}