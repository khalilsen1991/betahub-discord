import { ButtonInteraction, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { MISSIONONETEMPTWOCOMPLETEROLEID } from "../../globals";
import { ManagerMissionOnePartOne } from "./ManagerPartOne";
import { ManagerMissionOnePartTwo } from "./ManagerPartTwo";
import { ManagerMissionOnePartThree } from "./ManagerPartThree";
import { ManagerMissionOnePartFour } from "./ManagerPartFour";
import { ManagerMissionOnePartFive } from "./ManagerPartFive";
import { ManagerMissionOnePartSix } from "./ManagerPartSix";
import { ManagerMissionOnePartSeven } from "./ManagerPartSeven";
import { ManagerMissionOnePartEight } from "./ManagerPartEight";
import { ManagerMissionOnePartNine } from "./ManagerPartNine";
import { ManagerMissionOnePartTen } from "./ManagerPartTen";

export const ManagerMissionOneCollector = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
}

export const ManagerMissionOneSelectMenuCollector = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  if(interaction.customId.split('-')[2] === 'part1'){
    if(interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.has(MISSIONONETEMPTWOCOMPLETEROLEID)){
      const embeds = await ErrorEmbed('¡Ya completaste esta misión!', interaction.guild?.members.cache.get(interaction.user.id)!)
      return interaction.reply({ embeds, ephemeral: true })
    }
    await ManagerMissionOnePartOne(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part2'){
    await ManagerMissionOnePartTwo(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part3'){
    await ManagerMissionOnePartThree(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part4'){
    await ManagerMissionOnePartFour(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part5'){
    await ManagerMissionOnePartFive(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part6'){
    await ManagerMissionOnePartSix(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part7'){
    await ManagerMissionOnePartSeven(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part8'){
    await ManagerMissionOnePartEight(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part9'){
    await ManagerMissionOnePartNine(interaction, client, serverConfigs)
  }
  if(interaction.customId.split('-')[2] === 'part10'){
    await ManagerMissionOnePartTen(interaction, client, serverConfigs)
  }
}
