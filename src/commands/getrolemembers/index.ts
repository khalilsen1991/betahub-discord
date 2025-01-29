import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, TextChannel, Role, GuildMember } from 'discord.js'
import { ErrorEmbed, SendArtistHackerOrLiderEmbed, SendEndMissionEmbedWithPoints } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'
import { CreateLinkDetectorButtons, CreateLinkMaliciosoButtons, CreateSettingButtonOptions } from '../../Utils/CreateButton/CreateButton'
import { CreateArrayButtonWithEmoji } from '../../Utils/CreateButton'
import { DISMISSEDDISCORDIDS } from '../../globals'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getrolemembers')
		.setDescription('Obtener miembros de un rol')
    .addStringOption(option =>
      option.setName('role')
        .setDescription('mention a role or write id get members')
        .setRequired(true)
    ),
	
	async execute(interaction: ChatInputCommandInteraction, serverConfigs: GuildDocument, client: ClientWithCommands, guild: Guild) {
    try {
      if(!interaction.guildId) return interaction.reply({ embeds: await ErrorEmbed('Error to use command', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const roleId = interaction.options.getString('role')?.replace(/[^\d]/g, '')! || interaction.options.getString('role')!    
      const role = guild.roles.cache.get(roleId) as Role      
      if(!role) return interaction.reply({ embeds: await ErrorEmbed('Role not found', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const membersWithRole = role.members.filter(member => !DISMISSEDDISCORDIDS.includes(member.id)).map(member => member.id);
      const channel = interaction.channel as TextChannel;
      if (membersWithRole.length === 0) {
        return interaction.reply({ embeds: await ErrorEmbed('No members found with the specified role', guild.members.cache.get(interaction.user.id)!), ephemeral: true });
      }
      channel.send(`Members with role ${role.name}: ${membersWithRole.join(', ')}`);
      if(!role) return interaction.reply({ embeds: await ErrorEmbed('Role not found', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
