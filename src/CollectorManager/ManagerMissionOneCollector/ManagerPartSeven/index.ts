import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONLOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'Corto plazo', 
  '1': 'Largo plazo',
  '2': 'Corto plazo y largo plazo'
}

export const ManagerMissionOnePartSeven = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const embed = await WarningEmbed(`🔮Pensar a largo plazo es excelente porque construyes un futuro sólido.\n\n🎯Pensar en corto plazo es clave para disfrutar y aprovechar las oportunidades actuales.\n\nEl desafío está en combinar ambas miradas: no vivir solamente en el presente sin pensar en el futuro y no vivir solamente en el futuro, sin disfrutar de nuestra actualidad ✨\n\nSé sincero contigo, ¿sientes que sabes cómo manejar dinero? 👀 `, interaction.guild?.members.cache.get(interaction.user.id)!)
  const embeds: any = []
  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Sientes que piensas en el dinero para el corto plazo o para el largo plazo?**`)
  
  embeds.push(embed[0])

  const data = {
    customId: `${interaction.user.id}-missionone-part8`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Sí',
        value: `0`
      },
      {
        label: 'No',
        value: `1`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}