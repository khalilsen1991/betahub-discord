import { Message, Client, Guild, SlashCommandBuilder, ChatInputCommandInteraction, Role } from 'discord.js'
import { ErrorEmbed, WarningEmbed } from '../../Utils/Embeds'
import { ClientWithCommands, GuildDocument } from '../../types'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give-role')
		.setDescription('Da rol mencionado a una lista de miembtros')
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
      const embeds = await WarningEmbed(`Por favor ingrese la lista de discord ids de los miembros separados por una , para entregarles el rol: **${role.name}**.`, guild.members.cache.get(interaction.user.id)!)
      if (interaction.channel) {
        interaction.channel.send({ embeds })
          .then((message: Message) => {
            const filter = (m: Message) => m.author.id === interaction.user.id
            message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
              .then(async (collected) => {
                const membersIds = collected.first()?.content.split(',').map((id) => id.trim())
                if (membersIds) {
                  membersIds.forEach((id, index) => {
                    setTimeout(() => {
                      const member = guild.members.cache.get(id)
                      if (member) {
                        member.roles.add(role)
                        .then(() => {
                          message.channel.send({ content: `Role ${role.name} added to ${member.user.username}` })
                        })
                        .catch((error) => {
                          message.channel.send({ content: `Error to add role ${role.name} to ${member.user.username}` })
                        })
                      } else {
                        message.channel.send({ content: `El usuario con el id  ${id} no forma parte de este servidor` })
                      }
                    }, index * 2000)
                  })
                }
              })
              .catch((error) => {})
          })
          .catch((error) => {})
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
