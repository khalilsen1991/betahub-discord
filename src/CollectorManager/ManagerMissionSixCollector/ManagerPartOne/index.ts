import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";

export const ManagerMissionSixPartOne = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {

  const embeds = await WarningEmbed('📢 Ahora el aviso de siempre: recuerda que si interrumpes la misión antes de terminarla tendrás que iniciarla de nuevo.\n\nAvancemos...\n\nTe estás acercando mucho apoder crear tu propio presupuesto... ¿qué sientes?', interaction.guild?.members.cache.get(interaction.user.id)!)
  
  const data = {
    customId: `${interaction.user.id}-missionsix-part2`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Responsabilidad por cumplirlo',
        value: `0`
      },
      {
        label: 'Miedo de no lograrlo',
        value: `1`
      },
      {
        label: 'Confianza en que voy a poder',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.reply({ embeds, components: [components], ephemeral: true })
}