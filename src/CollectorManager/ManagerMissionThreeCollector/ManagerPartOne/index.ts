import { ActionRowBuilder, CacheType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { WarningEmbed } from "../../../Utils/Embeds";
import { CreateSelectMenu } from "../../../Utils/CreateSelectMenu";

export const ManagerMissionThreePartOne = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'Es bueno reconocer eso. Aprenderás cómo hacerlo a lo largo de las misiones. Mientras tanto, es importante que seas muy consciente acerca de en qué gastas tu dinero.\n\n'
  if(interaction.values[0] === '1') description += 'Wow! Gran conclusión. Es importante detectar cuáles son los peligros de tus comportamientos actuales para estar atentos a dónde tenemos los riesgos. Lo lograremos. \n\n'
  if(interaction.values[0] === '2') description += 'Perfecto. Para cambiar los hábitos de gastos, el primer paso es decidirlo conscientemente. Y es lo que estás haciendo ahora. Necesitas de un plan al cual apegarte. Lo haremos a lo largo de las misiones.\n\n'
    
  description += 'Fondo de emergencia: ¿lo crearías para evitar riesgos?'
  const embeds = await WarningEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)
  
  const data = {
    customId: `${interaction.user.id}-missionthree-part2`,
    placeholder: 'Selecciona una opción',
    options: [
      {
        label: 'Responsabilidad por cumplirlo',
        value: `0`
      },
      {
        label: 'Miedo de no lograrlo',
        value: `1`
      },
      {
        label: 'Confianza en que voy a poder',
        value: `2`
      }
    ]
  }
  const components = await CreateSelectMenu(data) as ActionRowBuilder<StringSelectMenuBuilder>
  interaction.reply({ embeds, components: [components], ephemeral: true })
}