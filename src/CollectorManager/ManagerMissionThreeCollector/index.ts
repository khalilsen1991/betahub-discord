import { ButtonInteraction, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { MISSIONOTHREETEMPTWOCOMPLETEROLEID } from "../../globals";
import { ManagerMissionThreePartOne } from "./ManagerPartOne";
import { ManagerMissionThreePartTwo } from "./ManagerPartTwo";
import { ManagerMissionThreePartThree } from "./ManagerPartThree";

export const ManagerMissionThreeCollector = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
}

export const ManagerMissionThreeSelectMenuCollector = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  if(interaction.customId.split('-')[2] === 'part1'){
    if(interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(MISSIONOTHREETEMPTWOCOMPLETEROLEID)){
      const embeds = await ErrorEmbed('¡Ya completaste esta misión!', interaction.guild?.members.cache.get(interaction.user.id)!)
      return interaction.reply({ embeds, ephemeral: true })
    }
    await ManagerMissionThreePartOne(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part2'){
    await ManagerMissionThreePartTwo(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part3'){
    await ManagerMissionThreePartThree(interaction, client, serverConfigs)
  }
}
