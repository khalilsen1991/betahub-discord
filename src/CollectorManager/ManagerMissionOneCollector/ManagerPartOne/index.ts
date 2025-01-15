import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";

export const ManagerMissionOnePartOne = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const embeds = await WarningEmbed(`📢 [Importante] Antes de seguir, ten en cuenta que si interrumpes la misión antes de terminarla tendrás que iniciarla de nuevo.\n\nAhora sí, avancemos...\n\nNo importa dónde estés hoy, este curso te propone misiones individuales en las que:\n\n\`🤔\` Reflexionarás sobre tu relación con el dinero\n\`💲\`Aprenderás herramientas para organiza tus finanzas\n\`🎯\`Fijarás metas a futuro y planificarás cómo lograrlas\nAh, y es muy importante que sepas que esta conversación es privada (los otros usuarios no la verán).\n\ny todo eso mientras te diviertes...\n¿Estás ready? 😎`, interaction.guild?.members.cache.get(interaction.user.id)!)
      const data = {
        customId: `${interaction.user.id}-missionone-part2`,
        placeholder: 'Selecciona una opción',
        options: [
          {
            label: 'Sí',
            value: `0`
          },
          {
            label: 'Súper sí',
            value: `1`
          }
        ]
      }
    const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
    interaction.reply({ embeds: embeds, components: [components], ephemeral: true })
}