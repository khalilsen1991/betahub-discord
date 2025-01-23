import { ButtonInteraction, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { MISSIONFOURTEMPTWOCOMPLETEROLEID } from "../../globals";
import { ManagerMissionTwoPartOne } from "./ManagerPartOne";
import { ManagerMissionTwoPartTwo } from "./ManagerPartTwo";
import { ManagerMissionTwoPartThree } from "./ManagerPartThree";
import { ManagerMissionTwoPartFour } from "./ManagerPartFour";
import { ManagerMissionTwoPartFive } from "./ManagerPartFive";

export const ManagerMissionTwoCollector = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
}

export const ManagerMissionFourSelectMenuCollector = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  if(interaction.customId.split('-')[2] === 'part1'){
    if(interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(MISSIONFOURTEMPTWOCOMPLETEROLEID)){
      const embeds = await ErrorEmbed('¡Ya completaste esta misión!', interaction.guild?.members.cache.get(interaction.user.id)!)
      return interaction.reply({ embeds, ephemeral: true })
    }
    await ManagerMissionTwoPartOne(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part2'){
    await ManagerMissionTwoPartTwo(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part3'){
    await ManagerMissionTwoPartThree(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part4'){
    await ManagerMissionTwoPartFour(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part5'){
    await ManagerMissionTwoPartFive(interaction, client, serverConfigs)
  }
}
