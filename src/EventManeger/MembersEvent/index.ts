import { Client, Guild, GuildMember, PartialGuildMember } from "discord.js";
import { GuildDocument } from "../../types";

export const MembersEvents = (client: Client, serverConfig: GuildDocument) => {
  client.on('guildMemberRemove', async (member: GuildMember | PartialGuildMember) => {

  })
}