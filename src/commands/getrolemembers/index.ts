import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js'
import { ErrorEmbed, SendArtistHackerOrLiderEmbed, SendEndMissionEmbedWithPoints } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'
import { CreateLinkDetectorButtons, CreateLinkMaliciosoButtons, CreateSettingButtonOptions } from '../../Utils/CreateButton/CreateButton'
import { CreateArrayButtonWithEmoji } from '../../Utils/CreateButton'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getrolemembers')
		.setDescription('Obtener miembros de un rol')
    .addStringOption(option =>
      option.setName('select-role')
        .setDescription('select role to get members')
        .addChoices(['MISSIONFIVECOMPLETEOLEID', 'MISSIONTENCOMPLETEOLEID', ''].map((type) => ({ name: type, value: type })))
        .setRequired(true)
    ),
	
	async execute(interaction: ChatInputCommandInteraction, serverConfigs: GuildDocument, client: ClientWithCommands, guild: Guild) {
    try {
      if(!interaction.guildId) return interaction.reply({ embeds: await ErrorEmbed('Error to use command', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const selectRole = interaction.options.getString('select-role')!
      

    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
