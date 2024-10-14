import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js'
import { ErrorEmbed, SendTipoDeLiderEmbed } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'
import { commandMiddleware } from '../../Functions/CommandMiddleware'
import { GetMember } from '../../Utils/ApiConnections'
import { CreateTipoDeLiderButtons } from '../../Utils/CreateButton/CreateButton'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tpd')
		.setDescription('Enviar mensaje tipo de lider')
    .addStringOption(option =>
      option.setName('channel')
        .setDescription('mention a channel or write id to send message in a channel')
        .setRequired(true)
    ),
	
	async execute(interaction: ChatInputCommandInteraction, serverConfigs: GuildDocument, client: ClientWithCommands, guild: Guild) {
    try {
      if(!interaction.guildId) return interaction.reply({ embeds: await ErrorEmbed('Error to use command', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const channelId = interaction.options.getString('channel')?.replace(/[^\d]/g, '')! || interaction.options.getString('user')!    
      const data = [
        {
          buttonLabel: 'Tipo-de-lider Artista',
          buttonEmoji: '🎨'
        },
        {
          buttonLabel: 'Tipo-de-lider Hacker',
          buttonEmoji: '🔍' 
        },
        {
          buttonLabel: 'Tipo-de-lider Líder ',
          buttonEmoji: '🧩' 
        }
      ]
      const channel = guild.channels.cache.get(channelId) as TextChannel

      if(!channel) return interaction.reply({ embeds: await ErrorEmbed('Channel not found', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})

      const components = await CreateTipoDeLiderButtons(data) as ActionRowBuilder<ButtonBuilder>[]
      const embeds = await SendTipoDeLiderEmbed()

      interaction.reply({ content:  `Message sent to ${channel}`, ephemeral: true })
      await channel.send({ embeds, components }).catch((error) => {})
    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
