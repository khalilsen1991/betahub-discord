import { Client, VoiceState } from "discord.js";
import { GuildDocument } from "../../types";
import { VoiceChannelEvents } from "./Events";

export const VoiceChannelManager = (client: Client, serverConfig: GuildDocument) => {
  client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => await VoiceChannelEvents(client, serverConfig, oldState, newState))
}