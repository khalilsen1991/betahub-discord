import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, TextChannel } from 'discord.js'
import { ErrorEmbed, SendEndMissionEmbed } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('end-mission')
		.setDescription('Enviar mensaje end mission')
    .addStringOption(option =>
      option.setName('channel')
        .setDescription('mention a channel or write id to send message in a channel')
        .setRequired(true)
    ),
	
	async execute(interaction: ChatInputCommandInteraction, serverConfigs: GuildDocument, client: ClientWithCommands, guild: Guild) {
    try {
      if(!interaction.guildId) return interaction.reply({ embeds: await ErrorEmbed('Error to use command', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const channelId = interaction.options.getString('channel')?.replace(/[^\d]/g, '')! || interaction.options.getString('user')!    
      const channel = guild.channels.cache.get(channelId) as TextChannel
      if(!channel) return interaction.reply({ embeds: await ErrorEmbed('Channel not found', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const embeds = await SendEndMissionEmbed()
      interaction.reply({ content:  `Message sent to ${channel}`, ephemeral: true })
      await channel.send({ embeds }).catch((error) => {})
    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
