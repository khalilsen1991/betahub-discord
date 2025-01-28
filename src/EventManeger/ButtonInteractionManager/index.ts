import { ButtonInteraction, CacheType } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { PaginationBuilder } from "../../Utils/PaginationBuilder";
import { GetMember, PostMember } from "../../Utils/ApiConnections";
import { ErrorEmbed } from "../../Utils/Embeds";
import { TipoDeLiderButtons } from "../../CollectorManager/ManagerTipoDeLiderCollector";
import { commandMiddleware } from "../../Functions/CommandMiddleware";
import { ArtistaHackerLiderButtons } from "../../CollectorManager/ManagerArtistaHackerLiderCollertor";
import { LinksButtons } from "../../CollectorManager/ManagerLinksCollector";
import { ManagerMissionOneCollector } from "../../CollectorManager/ManagerMissionOneCollector";

export const ButtonInteractionManager = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument, pagination?: PaginationBuilder, timestamp?: string) => {
	if(interaction.user.bot || interaction.guildId !== serverConfigs.guildId) return
  await GetMember(interaction.guild?.members.cache.get(interaction.user.id)!)
    .then(async ({ data : memberDB }) => {
      if(memberDB === "User not found" || memberDB === 'User not exist') {
        commandMiddleware(interaction.guild?.members.cache.get(interaction.user.id)!)
      }
      if(interaction.customId.includes('Tipo-de-lider')) TipoDeLiderButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'artista' || interaction.customId.split('-')[1] === 'hacker' || interaction.customId.split('-')[1] ==='lider') ArtistaHackerLiderButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'malicioso' || interaction.customId.split('-')[1] === 'detector' || interaction.customId.split('-')[1] === 'virus' || interaction.customId.split('-')[1] === 'seguro' || interaction.customId.split('-')[1] === 'experto' || interaction.customId.split('-')[1] === 'completeMissionTen') LinksButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'MissionOne') await ManagerMissionOneCollector(interaction, client, serverConfigs)
    }) 
    .catch(async (err) => { 
      await commandMiddleware(interaction.guild?.members.cache.get(interaction.user.id)!)
      if(interaction.customId.includes('Tipo-de-lider')) TipoDeLiderButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'artista' || interaction.customId.split('-')[1] === 'hacker' || interaction.customId.split('-')[1] ==='lider') ArtistaHackerLiderButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'malicioso' || interaction.customId.split('-')[1] === 'detector' || interaction.customId.split('-')[1] === 'virus' || interaction.customId.split('-')[1] === 'seguro' || interaction.customId.split('-')[1] === 'experto' || interaction.customId.split('-')[1] === 'completeMissionTen') LinksButtons(interaction, client, serverConfigs)
      if(interaction.customId.split('-')[1] === 'MissionOne') await ManagerMissionOneCollector(interaction, client, serverConfigs)
    })
}