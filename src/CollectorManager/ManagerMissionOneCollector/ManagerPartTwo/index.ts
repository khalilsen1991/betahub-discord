import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { CreateEmbed, CreateEmbedArray } from "../../../Utils/Embeds/CreateEmbed";

export const ManagerMissionOnePartTwo = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const embed = await WarningEmbed(`Empecemos entonces por hablar sobre el dinero 💰\n\nCuando piensas en dinero...`, interaction.guild?.members.cache.get(interaction.user.id)!)
  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0])

  const data = {
    customId: `${interaction.user.id}-missionone-part3`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Tranquilidad',
        emoji: '😇',
        value: `0`
      },
      {
        label: 'Preocupación',
        emoji: '🫠',
        value: `1`
      },
      {
        label: 'Ansiedad',
        emoji: '🥲',
        value: `2`
      },
      {
        label: 'No lo tengo muy claro',
        emoji: '😳',
        value: `3`
      },
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })

}