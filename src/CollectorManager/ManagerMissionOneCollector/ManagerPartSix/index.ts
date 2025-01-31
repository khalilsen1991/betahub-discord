import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONONELOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'La uso para lo que quiero ahora', 
  '1': 'La guardo tal como la recibí',
  '2': 'Investigo para saber bien qué me conviene hacer' 
}

export const ManagerMissionOnePartSix = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let embed
  if(interaction.values[0] === '0') embed = await WarningEmbed(`Bueno... usar el dinero para lo que uno desee siempre puede ser una buena opción 🙃\n\nPero es importante que esto no te impida hacer otras cosas que necesitas o que te habías planteado como objetivos 🤔\n\nAprenderemos sobre dejar dinero “quieto” (ahorro) o dejar dinero “trabajando” (inversión) y también aprenderemos a priorizar para tomar buenas decisiones con dinero.\n\nHablando de tiempo... ¿sabías que en finanzas existe la categoría de CORTO PLAZO y de LARGO PLAZO?\n\n👉 Corto plazo se refiere a metas o inversiones de dinero que se logren en menos de un año.\n\n👉 Largo plazo se refiere a metas o inversiones que toman más de dos años.\n\n¿Sientes que piensas en el dinero para el corto plazo o para el largo plazo`, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '1') embed = await WarningEmbed(`Ok, eso habla de que guardas para tener luego cuando necesites. Sin embargo, es importante pensar otras opciones: ¿sabes que puedes usar el dinero para generar más dinero aún?\n\nPero es importante que esto no te impida hacer otras cosas que necesitas o que te habías planteado como objetivos 🤔\n\nAprenderemos sobre dejar dinero “quieto” (ahorro) o dejar dinero “trabajando” (inversión) y también aprenderemos a priorizar para tomar buenas decisiones con dinero.\n\nHablando de tiempo... ¿sabías que en finanzas existe la categoría de CORTO PLAZO y de LARGO PLAZO?\n\n👉 Corto plazo se refiere a metas o inversiones de dinero que se logren en menos de un año.\n\n👉 Largo plazo se refiere a metas o inversiones que toman más de dos años.\n\n¿Sientes que piensas en el dinero para el corto plazo o para el largo plazo? ⏱️ `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '2') embed = await WarningEmbed(`¡Tiene sentido! Aprenderemos sobre dejar dinero “quieto” (ahorro) o dejar dinero “trabajando” (inversión) y también aprenderemos a priorizar para tomar buenas decisiones con dinero.\n\nHablando de tiempo... ¿sabías que en finanzas existe la categoría de CORTO PLAZO y de LARGO PLAZO?\n\n👉 Corto plazo se refiere a metas o inversiones de dinero que se logren en menos de un año.\n\n👉 Largo plazo se refiere a metas o inversiones que toman más de dos años.\n\n¿Sientes que piensas en el dinero para el corto plazo o para el largo plazo? ⏱️`, interaction.guild?.members.cache.get(interaction.user.id)!)

  const channelLogs = interaction.guild?.channels.cache.get(MISSIONONELOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Qué harías si recibieras una cantidad muy grande de dinero ahora mismo?**`).catch(() => { null })

  const embeds: any = []
  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed![0])

  const data = {
    customId: `${interaction.user.id}-missionone-part7`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Corto plazo',
        value: `0`
      },
      {
        label: 'Largo plazo',
        value: `1`
      },
      {
        label: 'Corto plazo y largo plazo',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}