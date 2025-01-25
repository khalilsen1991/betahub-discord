import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONONELOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Si', 
  '1': 'No',
}

export const ManagerMissionOnePartEight = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let embed
  if(interaction.values[0] === '0') embed = await WarningEmbed(`¡Genial! Avancemos juntos en las misiones que seguramente sumarás más herramientas 💪\n\n¡Nos acercamos al final de la primera misión! 🎉\n\nMuchas veces nuestra familia puede darnos tips e ideas para tener una buena relación con el dinero ¿Tienes conversaciones con tu familia o personas cercanas sobre cómo gestionar el dinero? 💰 `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '1') embed = await WarningEmbed(`¡No te preocupes! Estás a tiempo de aprender, para eso existe esta aventura 💪\n\n¡Nos acercamos al final de la primera misión! 🎉\n\nMuchas veces nuestra familia puede darnos tips e ideas para tener una buena relación con el dinero ¿Tienes conversaciones con tu familia o personas cercanas sobre cómo gestionar el dinero? 💰 `, interaction.guild?.members.cache.get(interaction.user.id)!)
  
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONONELOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Sientes que sabes cómo manejar dinero?**`).catch(() => { null })
    
  const embeds: any = []
  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed![0])

  const data = {
    customId: `${interaction.user.id}-missionone-part9`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Sí, hablamos mucho',
        value: `0`
      },
      {
        label: 'A veces (cuando sucede algo puntual)',
        value: `1`
      },
      {
        label: 'No hablamos nunca del tema',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}