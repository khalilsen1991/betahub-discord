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
        .addChoices(['malicioso', 'detector', 'seguro', 'virus', 'experto'].map((type) => ({ name: type, value: type })))
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
            customId: `${channelId}-${messageType}-0`,
            buttonEmoji: '💪'
          }
        ],
        detector: [
          {
            customId: `${channelId}-${messageType}-0`,
            buttonLabel: 'A'
          },
          {
            customId: `${channelId}-${messageType}-1`,
            buttonLabel: 'B'
          },
          {
            customId: `${channelId}-${messageType}-2`,
            buttonLabel: 'C'
          },
          {
            customId: `${channelId}-${messageType}-3`,
            buttonLabel: 'D'
          }
        ],
        seguro: {
          customId: `${channelId}-${messageType}`,
          label: 'Obtener puntos / Receber pontos'
        },
        virus: {
          customId: `${channelId}-${messageType}`,
          label: 'Obtener puntos / Receber pontos'
        }
      }

      let components : ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'malicioso') components = await CreateLinkMaliciosoButtons(ButtonData['malicioso']) as ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'detector') components = await CreateLinkDetectorButtons(ButtonData['detector']) as ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'seguro' || messageType === 'virus') components = await CreateSettingButtonOptions(ButtonData[messageType]) as ActionRowBuilder<ButtonBuilder>[]
      if(messageType === 'experto') components = await CreateLinkMaliciosoButtons(ButtonData['experto']) as ActionRowBuilder<ButtonBuilder>[]
      
      const embeds = await SendEndMissionEmbedWithPoints(messageType)
      if(messageType ===  'detector') {
        await channel.send({ embeds }).catch((error) => {})
        await channel.send({ content: '### :flag_es: [Em português 🇧🇷 abaixo]\na. Haces click en el botón COMPRAR, abres la página, copias el enlace desde el navegador y lo analizas.\nb. Copias la url del botón COMPRAR con el botón derecho del mouse y lo pegas en los sitios de verificación.\nc. Abres el enlace en una ventana nueva y verificas su contenido en los sitios que te dimos arriba.\nd. Ignoras el enlace y borras el correo o mensaje que lo contiene.\n\n### :flag_br:\n\na. Você clica no botão COMPRAR, abre a página, copia o link do navegador e o analisa.\nb. Você copia a URL do botão COMPRAR com o botão direito do mouse.\nc. Você abre o link em uma nova janela e verifica o conteúdo no site que compartilhamos acima.\nd. Você ignora o link e apaga o e-mail ou mensagem que o contém.', components: components! }).catch((error) => {})
        interaction.reply({ content:  `Message sent to ${channel}`, ephemeral: true })
      } else {
        channel.send({ embeds, components: components! }).catch((error) => {})
        interaction.reply({ content:  `Message sent to ${channel}`, ephemeral: true })
      }
    } catch (error) {
      console.log(`Error ${interaction.commandName} command`, error)
    }
	},

	async run(client: Client, message: Message, args: string[], guild: Guild, serverConfig: GuildDocument, command: string) {
    const embeds = await ErrorEmbed(`Para utilizar este comando utiliza /${command}`, guild.members.cache.get(message.author.id)!)
    message.reply({ embeds }).catch((error) => {})
  }
}
