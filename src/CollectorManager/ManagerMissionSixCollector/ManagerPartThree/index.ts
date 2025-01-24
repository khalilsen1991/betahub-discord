import { ActionRowBuilder, ButtonBuilder, CacheType, ChannelType, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { SuccessfullyEmbed } from "../../../Utils/Embeds";
import { CreateButtonLink } from "../../../Utils/CreateButton";
import { KEYMISSIONSIXCOMPLETE, MISSIONSIXLOGSCHANNELID, MISSIONSIXTEMPTWOCOMPLETEROLEID } from "../../../globals";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { GetHubKeys, PostHubKeys } from "../../../Utils/ApiConnections";
import { commandMiddleware } from "../../../Functions/CommandMiddleware";

const responses = { 
  '0': 'Sí', 
  '1': 'No lo sé...',
}

export const ManagerMissionSixPartThree = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += '¡Gran noticia! Y tiene todo el sentido del mundo que así sea: tener un plan y apegarnos al mismo nos acerca a nuestras metas.\n\n'
  if(interaction.values[0] === '1') description += 'No tengas dudas de que el plan te acerca a tus metas. Todavía falta para conseguirlas, pero ya has dado los primeros pasos que son súper importantes.\n¡Sigue así!\n\n'
    
  const channelLogs = interaction.guild?.channels.cache.get(MISSIONSIXLOGSCHANNELID)
  if(channelLogs && channelLogs.type === ChannelType.GuildText) channelLogs.send(`**${interaction.guild?.members.cache.get(interaction.user.id)?.user.username}** ha seleccionado la opción **${responses[interaction.values[0] as keyof typeof responses]}** en la pregunta **Ahora que tienes el presupuesto, ¿te sientes que estás más cerca de tus metas?**`)
  
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
  await client.guilds.cache.get(interaction.guildId!)?.members.cache.get(interaction.user.id)?.roles.add(MISSIONSIXTEMPTWOCOMPLETEROLEID)
  .then(async (newMember) => {
    const keyId = KEYMISSIONSIXCOMPLETE
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