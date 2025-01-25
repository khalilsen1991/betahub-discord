import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONONELOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Todavía no nos conocemos mucho', 
  '1': 'Recién nos estamos conociendo', 
  '2': 'Nos llevamos muy bien', 
  '3': 'Nos llevamos muy mal', 
}

export const ManagerMissionOnePartFour = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let embed
  if(interaction.values[0] === '0') embed = await WarningEmbed(`Perfecto! Esta aventura te servirá para entender cómo funciona el dinero 🙌\n\n¿Piensas que es fácil o difícil ganar dinero? `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '1') embed = await WarningEmbed(`¡Ok! En esta aventura podrán conocerse mejor y más rápido 🙌\n\n¿Piensas que es fácil o difícil ganar dinero? `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '2') embed = await WarningEmbed(`¡Buenísimo! Seguro en esta aventura encuentras cosas para que la relación sea aún mejor 🙌\n\n¿Piensas que es fácil o difícil ganar dinero? `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '3') embed = await WarningEmbed(`Ok. ¡¡Vamos a intentar revertir eso!! 🙌\n\n¿Piensas que es fácil o difícil ganar dinero? `, interaction.guild?.members.cache.get(interaction.user.id)!)

  const channelLogs = interaction.guild?.channels.cache.get(MISSIONONELOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Cómo es tu actual relación con el dinero?**`).catch(() => { null })
    
  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }

  embeds.push(embed![0])

  const data = {
    customId: `${interaction.user.id}-missionone-part5`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Fácil',
        value: `0`
      },
      {
        label: 'Dificil',
        value: `1`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}