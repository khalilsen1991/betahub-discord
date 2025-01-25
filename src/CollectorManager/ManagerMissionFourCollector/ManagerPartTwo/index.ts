import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONFOURLOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Ordenar y planificar mejor mis gastos', 
  '1': 'Disminuir los riesgos de mis finanzas personales',
  '2': 'Cambiar mis hábitos de gastos (deseos y necesidades)'
}

export const ManagerMissionFourPartTwo = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'Es bueno reconocer eso. Aprenderás cómo hacerlo a lo largo de las misiones. Mientras tanto, es importante que seas muy consciente acerca de en qué gastas tu dinero.\n\n'
  if(interaction.values[0] === '1') description += 'Wow! Gran conclusión. Es importante detectar cuáles son los peligros de tus comportamientos actuales para estar atentos a dónde tenemos los riesgos. Lo lograremos. \n\n'
  if(interaction.values[0] === '2') description += 'Perfecto. Para cambiar los hábitos de gastos, el primer paso es decidirlo conscientemente. Y es lo que estás haciendo ahora. Necesitas de un plan al cual apegarte. Lo haremos a lo largo de las misiones.\n\n'
    
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONFOURLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿qué sientes que necesitas?**`).catch(() => { null })
      
  description += 'Fondo de emergencia: ¿lo crearías para evitar riesgos?'
  const embed = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)
  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0].data)

  const data = {
    customId: `${interaction.user.id}-missionfour-part3`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'No creo que sea necesario',
        value: `0`
      },
      {
        label: 'Sí, lo voy a hacer ya',
        value: `1`
      },
      {
        label: 'Lo haría pero no sé bien cómo',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}