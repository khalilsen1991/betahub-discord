import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";

export const ManagerMissionOnePartNine = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += `¡Genial! Tener conversaciones en familia sobre temas como el dinero es una oportunidad para explorar qué experiencias ha atravesado la familia y qué aprendizajes se transmiten de generación en generación 💪\n\n¿Cómo crees que la relación de tu familia con el dinero ha influido en la forma en que tú lo ves? 👀`
  if(interaction.values[0] === '1') description += `Cuando no tenemos mucha seguridad sobre qué decisión tomar, está bueno buscar la opinión de personas con más experiencia. Y la familia o el entorno personal puede ser muy útil 💪\n\n¿Cómo crees que la relación de tu familia con el dinero ha influido en la forma en que tú lo ves? 👀`
  if(interaction.values[0] === '2') description += `Tener conversaciones en familia sobre temas como el dinero a veces puede ser difícil. Sobre todo cuando estos temas pueden incomodar a alguien de la familia 🥺\n\n¿Cómo crees que la relación de tu familia con el dinero ha influido en la forma en que tú lo ves? 👀`

  description += '\n\nOpciones:\n\n1- Tengo mis propias opiniones\n2- Creo que mi familia influencia mucho mis opiniones\n3- No tengo muy claro si haya una relación entre mi familia y el dinero'

  const embed = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)

  const embeds: any = []
  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0])

  const data = {
    customId: `${interaction.user.id}-missionone-part10`,
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