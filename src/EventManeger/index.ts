import { Events, Guild } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../types";
import { MessagDeleteEventManager, MessageEventManager, MessageUpdateEventManager } from "./MessageEvent";
import { MembersEvents } from "./MembersEvent";
import { ReadyEvent } from "./ReadyEvent";
import { SlashCommandManager } from "./SlashCommandManager";
import { ButtonInteractionManager } from "./ButtonInteractionManager";
import { SelectorMenuInteractionManager } from "./SelectorMenuInteractionManager";

export const EventManager = async (client: ClientWithCommands, guild: Guild) => {
  const config = client.config.get(guild.id) as GuildDocument
  await MembersEvents(client, config)
  await ReadyEvent(client, config)
  client.on(Events.InteractionCreate, async (interaction) => { if(interaction.isChatInputCommand() && !interaction.user.bot) await SlashCommandManager(interaction, client, config) })
  client.on(Events.InteractionCreate, async (interaction) => { if(interaction.isButton() && !interaction.user.bot) await ButtonInteractionManager(interaction, client, config) })
  client.on(Events.InteractionCreate, async (interaction) => { if(interaction.isStringSelectMenu() && !interaction.user.bot) await SelectorMenuInteractionManager(interaction, client, config) })
  client.on('messageCreate', async (message) => { await MessageEventManager(message, client, guild, config) }) 
  client.on('messageUpdate', async (oldMessage, newMessage) => { await MessageUpdateEventManager(oldMessage, newMessage, client, guild, config) })
  client.on('messageDelete', async (message) => { await MessagDeleteEventManager(message, client, guild, config) })
}
