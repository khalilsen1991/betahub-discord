import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONONELOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Tranquilidad', 
  '1': 'Preocupación', 
  '2': 'Ansiedad', 
  '3': 'No lo tengo muy claro', 
}

export const ManagerMissionOnePartThree = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let embed
  if(interaction.values[0] === '0') embed = await WarningEmbed(`La tranquilidad financiera no necesariamente proviene de la cantidad de dinero que tienes, sino de una buena planificación y una relación saludable con él 😇\n\n¿Cómo es tu actual relación con el dinero?`, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '1') embed = await WarningEmbed(`Tener preocupación 🫠 es una señal para reflexionar sobre nuestras prioridades y tomar acciones para mejorar nuestra situación económica 🙌\n\n¿Cómo es tu actual relación con el dinero?`, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '2') embed = await WarningEmbed(`La ansiedad relacionada con el dinero es común, no te preocupes 🥲 Es importante que sepamos qué hacer con eso. Vamos a ir de a poquito, tomando decisiones pequeñas para tener todo bajo control.\n\n¿Cómo es tu actual relación con el dinero?`, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '3') embed = await WarningEmbed(`Perfecto, es una respuesta totalmente válida. Como las finanzas personales buscan que cumplamos nuestros objetivos, es importante que estemos atentos a qué nos pasa y a qué sentimos 🙌\n\n¿Cómo es tu actual relación con el dinero?`, interaction.guild?.members.cache.get(interaction.user.id)!)
  
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONONELOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **Cuando piensas en dinero...**`)
    
  const embeds: any = []
  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }

  embeds.push(embed![0])

  const data = {
    customId: `${interaction.user.id}-missionone-part4`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Todavía no nos conocemos mucho',
        value: `0`
      },
      {
        label: 'Recién nos estamos conociendo',
        value: `1`
      },
      {
        label: 'Nos llevamos muy bien',
        value: `2`
      },
      {
        label: 'Nos llevamos muy mal',
        value: `3`
      },
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}