import { CacheType, StringSelectMenuInteraction } from "discord.js"
import { ClientWithCommands, GuildDocument } from "../../types"
import { GetMember, PostMember } from "../../Utils/ApiConnections"
import { ErrorEmbed } from "../../Utils/Embeds"
import { commandMiddleware } from "../../Functions/CommandMiddleware"

export const SelectorMenuInteractionManager = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument, questions?: any[]) => {
	if(interaction.user.bot || interaction.guildId !== serverConfigs.guildId) return
  await GetMember(interaction.guild?.members.cache.get(interaction.user.id)!)
    .then(async ({ data : memberDB }) => {
      if(memberDB === "User not found" || memberDB === 'User not exist') {
        await PostMember(interaction.guild?.members.cache.get(interaction.user.id)!)
        const embeds = ErrorEmbed('Por favor intentelo nuevamente', interaction.guild?.members.cache.get(interaction.user.id)!)
        return interaction.reply({ embeds, ephemeral: true })
      }
      if(interaction.user.id == interaction.customId.split('-')[1]) {
        const question = questions?.find((q) => q.id === interaction.values[0])
        if(question) {
          const embed = await ErrorEmbed(question.question, interaction.guild?.members.cache.get(interaction.user.id)!)
          return interaction.reply({ embeds: embed, ephemeral: true })
        }
      }
    }) 
    .catch((err) => { commandMiddleware(interaction.guild?.members.cache.get(interaction.user.id)!) })
}