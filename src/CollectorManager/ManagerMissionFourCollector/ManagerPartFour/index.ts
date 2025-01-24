import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONFOURLOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Comprar un auto para ir al trabajo porque no tienes transporte público que te sirva', 
  '1': 'Comprar un auto de lujo cuando ya tienes uno que funciona bien',
  '2': 'Pagar el mantenimiento de tu casa'
}

export const ManagerMissionFourPartFour = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'En este caso, comprar un auto es en realidad una necesidad. Ya que, sin él, no podrás ir a trabajar (no tienes la opción de ir en transporte público). El deseo disfrazado de necesidad es el de comprar un auto de lujo cuando ya tienes otro (en finanzas personales, esto se trata de un deseo y no de una necesidad).\n\n'
  if(interaction.values[0] === '1') description += '¡Correcto! Esto no es una necesidad sino un deseo.\n\n'
  if(interaction.values[0] === '2') description += 'En este caso, pagar el mantenimiento de tu casa es una necesidad. La vivienda es de las cosas más importantes que tenemos y, por eso, se trata sin dudas de una necesidad. El deseo disfrazado de necesidad es el de comprar un auto de lujo cuando ya tienes otro (en finanzas personales, esto se trata de un deseo y no de una necesidad).\n\n'
  
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONFOURLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Cuál de estos es un deseo disfrazado de necesidad?**`)
    
  description += '¿Qué opinas sobre la planificación financiera personal?'
  const embed = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)
  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0])

  const data = {
    customId: `${interaction.user.id}-missionfour-part5`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Puede ayudarme',
        value: `0`
      },
      {
        label: 'No es para mí',
        value: `1`
      },
      {
        label: 'Debe ser demasiado complicado',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds: [embeds!], components: [components] })
}