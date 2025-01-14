import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js'
import { ErrorEmbed, SendArtistHackerOrLiderEmbed, SendEndMissionEmbedWithPoints } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'
import { CreateLinkDetectorButtons, CreateLinkMaliciosoButtons, CreateSettingButtonOptions } from '../../Utils/CreateButton/CreateButton'
import { CreateArrayButtonWithEmoji } from '../../Utils/CreateButton'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Enviar mensaje Artusta Rebelde, hacker o lider al canal que menciones')
    .addStringOption(option =>
      option.setName('channel')
        .setDescription('mention a channel or write id to send message in a channel')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('message-type')
        .setDescription('select the type of message you want to send')
        .addChoices(['malicioso', 'experto'].map((type) => ({ name: type, value: type })))
        .setRequired(true)
    ),
	
	async execute(interaction: ChatInputCommandInteraction, serverConfigs: GuildDocument, client: ClientWithCommands, guild: Guild) {
    try {
      if(!interaction.guildId) return interaction.reply({ embeds: await ErrorEmbed('Error to use command', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      const channelId = interaction.options.getString('channel')?.replace(/[^\d]/g, '')! || interaction.options.getString('user')!    
      const messageType = interaction.options.getString('message-type')!
      const channel = guild.channels.cache.get(channelId) as TextChannel
      if(!channel || !messageType) return interaction.reply({ embeds: await ErrorEmbed('Channel not found or select a choise', guild.members.cache.get(interaction.user.id)!) , ephemeral: true})
      
      const ButtonData = {
        malicioso: [
          {
            customId: `${channelId}-${messageType}-0`,
            buttonEmoji: '👹'
          },
          {
            customId: `${channelId}-${messageType}-1`,
            buttonEmoji: '☠️'
          }
        ],
        experto: [
          {
            customId: `${channelId}-${messageType}`,
            buttonEmoji: '💪'
          }
        ]
      }

      let components : ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'malicioso') components = await CreateLinkMaliciosoButtons(ButtonData['malicioso']) as ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'experto') components = await CreateLinkMaliciosoButtons(ButtonData['experto']) as ActionRowBuilder<ButtonBuilder>[]
      
      const embeds = await SendEndMissionEmbedWithPoints(messageType)
      channel.send({ embeds, components: components! }).catch((error) => {})
      interaction.reply({ content:  `Message sent to ${channel}`, ephemeral: true })

    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
