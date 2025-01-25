import { ActionRowBuilder, ButtonBuilder, CacheType, ChannelType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { SuccessfullyEmbed } from "../../../Utils/Embeds";
import { CreateButtonLink } from "../../../Utils/CreateButton";
import { KEYMISSIONFOURCOMPLETE, MISSIONFOURLOGSCHANNELID, MISSIONFOURTEMPTWOCOMPLETEROLEID } from "../../../globals";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { GetHubKeys, PostHubKeys } from "../../../Utils/ApiConnections";
import { commandMiddleware } from "../../../Functions/CommandMiddleware";

const responses = { 
  '0': 'Puede ayudarme', 
  '1': 'No es para mí',
  '2': 'Debe ser demasiado complicado'
}

export const ManagerMissionFourPartFive = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += 'Nos gusta esa respuesta. Tal cual. Sigamos adelante con la misión número 4.\n\n'
  if(interaction.values[0] === '1') description += 'Mmmm, esta herramienta es para todas las personas. Sigue avanzando con la misión 4 que seguro cambiarás de opinión.\n\n'
  if(interaction.values[0] === '2') description += 'Obviamente a algunas personas les puede resultar más difícil que a otras, pero todas lo pueden lograr. Sigue ahora por la misión 4 que sumaras cada vez más herramientas para que sea cada vez más fácil para ti.\n\n'
  
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONFOURLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **¿Qué opinas sobre la planificación financiera personal?**`).catch(() => { null })
      
  const buttonData = {
    label: 'OBTENER PUNTOS',
    link: 'https://fitchin.gg/communities/mundo-beta/challenges',
    style: 5
  }
  const components = await CreateButtonLink(buttonData) as ActionRowBuilder<ButtonBuilder>
  const embed = await SuccessfullyEmbed(description, interaction.guild?.members.cache.get(interaction.user.id)!)

  const embeds: any = []

  for (let i = 0; i < interaction.message.embeds.length; i++) {
    embeds.push(await DestructuringEmbeds(interaction.message.embeds[i]))
  }
  embeds.push(embed[0])

  await client.guilds.cache.get(interaction.guildId!)?.members.cache.get(interaction.user.id)?.roles.add(MISSIONFOURTEMPTWOCOMPLETEROLEID)
  .then(async (newMember) => {
  const keyId = KEYMISSIONFOURCOMPLETE
  await GetHubKeys(newMember, keyId)
    .then(async ({ data }) => {
      if(data === 'Key aviable'){                
        await fetch('https://api.staging.fitchin.gg/gamification/challenge-player/complete', {
          headers: {
            'Content-Type': 'application/json' ,
            'x-api-key': process.env.TOKEN_FITCHIN || ''
          },
          method: 'POST',
          body: JSON.stringify({ "key": keyId, "discordId":  newMember.id }) 
        }) 
          .then(async (res) => {
            if(res.statusText === 'Accepted') await PostHubKeys(newMember, keyId)
            await interaction.update({ embeds, components: [components] })
          })
          .catch((err) => console.log(err))
      }
    })
    .catch(async ({ response }) => { if(response?.data?.message === 'GuildMember not found') await commandMiddleware(newMember) })
  })
  .catch((err) => console.log(err))
}