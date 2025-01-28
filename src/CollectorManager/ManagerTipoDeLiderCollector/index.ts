import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CacheType } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { MISSIONFIVECOMPLETEOLEID } from "../../globals";
import { ErrorEmbed, SendArtistHackerOrLiderEmbed } from "../../Utils/Embeds";
import { CreateSettingButtonOptions } from "../../Utils/CreateButton/CreateButton";

export const TipoDeLiderButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const member = interaction.guild!.members.cache.get(interaction.user.id)!
  if(member.roles.cache.has(MISSIONFIVECOMPLETEOLEID)) {
    const embeds = await ErrorEmbed(':flag_es: **Ya completaste esta misión**', member)
    return interaction.reply({ embeds, ephemeral: true })
  }
  const customId = interaction.customId.split(' ')[1].toLocaleLowerCase()
  const ButtonData = {
    customId: `${interaction.user.id}-${customId}`,
    label: 'Obtener puntos'
  }
  const components = await CreateSettingButtonOptions(ButtonData) as ActionRowBuilder<ButtonBuilder>[]
  const embeds = await SendArtistHackerOrLiderEmbed(customId)
  interaction.reply({ embeds, components, ephemeral: true  })
}
