import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONSIXLOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Responsabilidad por cumplirlo', 
  '1': 'Miedo de no lograrlo',
  '2': 'Confianza en que voy a poder'
}

export const ManagerMissionSixPartTwo = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'Perfecto, al comienzo necesitarás cierta disciplina para poder cumplir con tu presupuesto. Luego, será más fácil y natural. Recuerda que estás aprendiendo herramientas que te permitirán lograrlo.\n\n'
  if(interaction.values[0] === '1') description += 'Ok, es bastante normal, no te preocupes. Son tus primeras experiencias en el mundo de las finanzas. Es valioso que admitas lo que sientes. Úsalo a tu favor para prestar mucha atención y para apegarte al plan. Si sientes un poco de inseguridad, una buena opción puede ser plantearte metas que sean fáciles para ti (por ejemplo: proponerte ahorrar de a poquito en vez de a grandes cantidades). Ten confianza, disciplina y lo conseguirás.\n\n'
  if(interaction.values[0] === '2') description += '¡Excelente! Seguro que así será entonces. Mantente con foco y apégate al plan que vas a crear. Si bien la confianza es súper importante, no olvides que son tus primeras experiencias en finanzas y que necesitas prestar mucha atención.\n\n'
    
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONSIXLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **Te estás acercando mucho apoder crear tu propio presupuesto... ¿qué sientes?**`).catch(() => { null })
       
  description += '¿Sientes que cuando tengas tu presupuesto estarás más cerca de tus metas?'
  const embed = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)

  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0])

  const data = {
    customId: `${interaction.user.id}-missionsix-part3`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Sí',
        value: `0`
      },
      {
        label: 'No lo sé...',
        value: `1`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds , components: [components] })
}