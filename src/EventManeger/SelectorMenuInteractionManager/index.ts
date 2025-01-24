import { CacheType, StringSelectMenuInteraction } from "discord.js"
import { ClientWithCommands, GuildDocument } from "../../types"
import { GetMember, PostMember } from "../../Utils/ApiConnections"
import { ErrorEmbed } from "../../Utils/Embeds"
import { commandMiddleware } from "../../Functions/CommandMiddleware"
import { ManagerMissionOneSelectMenuCollector } from "../../CollectorManager/ManagerMissionOneCollector"
import { ManagerMissionFourSelectMenuCollector } from "../../CollectorManager/ManagerMissionFourCollector"
import { ManagerMissionSixSelectMenuCollector } from "../../CollectorManager/ManagerMissionSixCollector"

export const SelectorMenuInteractionManager = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
	if(interaction.user.bot || interaction.guildId !== serverConfigs.guildId) return
  await GetMember(interaction.guild?.members.cache.get(interaction.user.id)!)
    .then(async ({ data : memberDB }) => {
      if(memberDB === "User not found" || memberDB === 'User not exist') {
        await PostMember(interaction.guild?.members.cache.get(interaction.user.id)!)
        const embeds = ErrorEmbed('Por favor intentelo nuevamente', interaction.guild?.members.cache.get(interaction.user.id)!)
        return interaction.reply({ embeds, ephemeral: true })
      }
      if(interaction.customId.split('-')[1] === 'missionone') await ManagerMissionOneSelectMenuCollector(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'missionfour') await ManagerMissionFourSelectMenuCollector(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'missionsix') await ManagerMissionSixSelectMenuCollector(interaction, client, serverConfigs)
            
    }) 
    .catch((err) => { commandMiddleware(interaction.guild?.members.cache.get(interaction.user.id)!) })
}