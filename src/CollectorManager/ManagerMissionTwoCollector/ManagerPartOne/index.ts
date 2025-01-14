import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";

export const ManagerMissionTwoPartOne = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const embeds = await WarningEmbed(`Empecemos entonces...\n\nEn base a la misión anterior, ¿qué sientes que necesitas?\n\nOpciones:\n1= Ordenar y planificar mejor mis gastos\n2= Disminuir los riesgos de mis finanzas personales\n3= Cambiar mis hábitos de gastos (deseos y necesidades)`, interaction.guild?.members.cache.get(interaction.user.id)!)
  const data = {
    customId: `${interaction.user.id}-missiontwo-part2`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Opción 1',
        value: `0`
      },
      {
        label: 'Opción 2',
        value: `1`
      },
      {
        label: 'Opción 3',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.reply({ embeds, components: [components], ephemeral: true })
}