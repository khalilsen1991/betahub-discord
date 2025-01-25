import { ActionRowBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { MISSIONFOURLOGSCHANNELID } from "../../../globals";

const responses = { 
  '0': 'No creo que sea necesario', 
  '1': 'Sí, lo voy a hacer ya',
  '2': 'Lo haría pero no sé bien cómo'
}

export const ManagerMissionFourPartThree = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'Tener un fondo de emergencia es totalmente necesario para cualquier plan de finanzas que nos pueda dar tranquilidad. \n\n'
  if(interaction.values[0] === '1') description += 'Genial, esto se está poniendo bueno. \n\n'
  if(interaction.values[0] === '2') description += 'Ok, hagamos un repaso: calcula el equivalente a tus gastos de uno a tres meses y separa esa cantidad de dinero. La cantidad la eliges tú. Es importante dejarlo a salvo y usarlo solamente antes casos imprevistos y urgentes.\n\n'
    
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONFOURLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **Fondo de emergencia: ¿lo crearías para evitar riesgos?**`).catch(() => { null })
     
  description += '¿Cuál de estos es un deseo disfrazado de necesidad?\nOpciones:\n1= Comprar un auto para ir al trabajo porque no tienes transporte público que te sirva\n2= Comprar un auto de lujo cuando ya tienes uno que funciona bien\n3= Pagar el mantenimiento de tu casa'
  const embed = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)
  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0].data)

  const data = {
    customId: `${interaction.user.id}-missionfour-part4`,
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
  interaction.update({ embeds, components: [components] })
}