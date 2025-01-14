import { Embed } from "discord.js"

export const DestructuringEmbeds = async (embeds: Embed) => {
  const embed = embeds.toJSON()
  return embed
}