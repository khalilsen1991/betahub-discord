import { ButtonInteraction, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { MISSIONSIXTEMPTWOCOMPLETEROLEID } from "../../globals";
import { ManagerMissionSixPartOne } from "./ManagerPartOne";
import { ManagerMissionSixPartTwo } from "./ManagerPartTwo";
import { ManagerMissionSixPartThree } from "./ManagerPartThree";

export const ManagerMissionSixCollector = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
}

export const ManagerMissionSixSelectMenuCollector = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  if(interaction.customId.split('-')[2] === 'part1'){
    if(interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(MISSIONSIXTEMPTWOCOMPLETEROLEID)){
      const embeds = await ErrorEmbed('¡Ya completaste esta misión!', interaction.guild?.members.cache.get(interaction.user.id)!)
      return interaction.reply({ embeds, ephemeral: true })
    }
    await ManagerMissionSixPartOne(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part2'){
    await ManagerMissionSixPartTwo(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part3'){
    await ManagerMissionSixPartThree(interaction, client, serverConfigs)
  }
}
