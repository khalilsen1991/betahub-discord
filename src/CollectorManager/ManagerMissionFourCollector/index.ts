import { ButtonInteraction, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { MISSIONFOURTEMPTWOCOMPLETEROLEID } from "../../globals";
import { ManagerMissionFourPartOne } from "./ManagerPartOne";
import { ManagerMissionFourPartTwo } from "./ManagerPartTwo";
import { ManagerMissionFourPartThree } from "./ManagerPartThree";
import { ManagerMissionFourPartFour } from "./ManagerPartFour";
import { ManagerMissionFourPartFive } from "./ManagerPartFive";

export const ManagerMissionFourCollector = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
}

export const ManagerMissionFourSelectMenuCollector = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  if(interaction.customId.split('-')[2] === 'part1'){
    if(interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(MISSIONFOURTEMPTWOCOMPLETEROLEID)){
      const embeds = await ErrorEmbed('¡Ya completaste esta misión!', interaction.guild?.members.cache.get(interaction.user.id)!)
      return interaction.reply({ embeds, ephemeral: true })
    }
    await ManagerMissionFourPartOne(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part2'){
    await ManagerMissionFourPartTwo(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part3'){
    await ManagerMissionFourPartThree(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part4'){
    await ManagerMissionFourPartFour(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part5'){
    await ManagerMissionFourPartFive(interaction, client, serverConfigs)
  }
}
