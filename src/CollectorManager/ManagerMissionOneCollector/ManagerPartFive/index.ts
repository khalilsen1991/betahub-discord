import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";

export const ManagerMissionOnePartFive = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let embed
  if(interaction.values[0] === '0') embed = await WarningEmbed(`Puedes tener la habilidad y estudiar para ayudarte a ganar dinero, ¡pero esto no quiere decir que sea fácil!\n\n⚠️¡Atención! las propuestas que incluyen una ganancia fácil, tienen trucos ocultos que pueden terminar lastimándonos. Ya veremos eso más adelante...\n\n💭Ahora anímate a imaginar...\n\n¿Qué harías si recibieras una cantidad muy grande de dinero ahora mismo? 😳 `, interaction.guild?.members.cache.get(interaction.user.id)!)
  if(interaction.values[0] === '1') embed = await WarningEmbed(`Ganar dinero requiere de trabajo, esfuerzo y planificación 💪\n\nA lo largo del curso veremos distintas estrategias para que puedas pensar qué es lo mejor para ti 💡\n\n💭 Ahora anímate a imaginar...\n\n¿Qué harías si recibieras una cantidad muy grande de dinero ahora mismo? 😳 `, interaction.guild?.members.cache.get(interaction.user.id)!)

  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }

  embeds.push(embed![0])

  const data = {
    customId: `${interaction.user.id}-missionone-part6`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'La uso para lo que quiero ahora',
        value: `0`
      },
      {
        label: 'La guardo tal como la recibí',
        value: `1`
      },
      {
        label: 'Investigo para saber bien qué me conviene hacer',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.update({ embeds, components: [components] })
}