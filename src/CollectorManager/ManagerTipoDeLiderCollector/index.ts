import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CacheType } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { MISSIONFIVECOMPLETEOLEID } from "../../globals";
import { ErrorEmbed, SendArtistHackerOrLiderEmbed } from "../../Utils/Embeds";
import { CreateSettingButtonOptions } from "../../Utils/CreateButton/CreateButton";

const rolesToAdd: Record<string, string> = {
  'Artista': '1258825880549986305',
  'Hacker': '1258825900334518423',
  'Líder': '1258825914851131492'
};

export const TipoDeLiderButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const member = interaction.guild!.members.cache.get(interaction.user.id)!
  if(member.roles.cache.has(MISSIONFIVECOMPLETEOLEID)) {
    const embeds = await ErrorEmbed(':flag_es: **Ya completaste esta misión**\n:flag_br: **Você já completou esta missão**', member)
    return interaction.reply({ embeds, ephemeral: true })
  }
  const customId = interaction.customId.split(' ')[1].toLocaleLowerCase()
  const ButtonData = {
    customId: `${interaction.user.id}-${customId}`,
    label: 'Obtener puntos / Receber pontos'
  }
  const components = await CreateSettingButtonOptions(ButtonData) as ActionRowBuilder<ButtonBuilder>[]
  const embeds = await SendArtistHackerOrLiderEmbed(customId)
  interaction.reply({ embeds, components, ephemeral: true  })
}
