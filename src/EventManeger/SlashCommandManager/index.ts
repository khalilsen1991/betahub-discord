import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { ErrorEmbed } from "../../Utils/Embeds";
import { commandMiddleware } from "../../Functions/CommandMiddleware";

export const SlashCommandManager = async (interaction: ChatInputCommandInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
	if(interaction.user.bot || interaction.guildId !== serverConfigs.guildId) return
	const guild = interaction.guild	
	await commandMiddleware(guild?.members.cache.get(interaction.user.id)!)
	if(interaction.channelId === '1237486602255728700') {
		const embeds = ErrorEmbed('No puedes usar comandos en este canal.', guild?.members.cache.get(interaction.user.id)!)
		return interaction.reply({
			embeds,
			ephemeral: true
		})
	}
	const command = client.commands.get(interaction.commandName)
	if (!command) {
		const embeds = await ErrorEmbed(`No command matching ${interaction.commandName} was found.`, await guild?.members.cache.get(interaction.user.id)!)
		await interaction.reply({ embeds, ephemeral: true })
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction, serverConfigs, client, guild)
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			const embeds = await ErrorEmbed(`'There was an error while executing this command!'`, await guild?.members.cache.get(interaction.user.id)!)
			await interaction.followUp({ embeds, ephemeral: true });
		} else {
			const embeds = await ErrorEmbed(`'There was an error while executing this command!'`, await guild?.members.cache.get(interaction.user.id)!)
			await interaction.reply({ embeds, ephemeral: true });
		}
	}
}
