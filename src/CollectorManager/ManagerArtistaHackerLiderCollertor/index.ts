import { ButtonInteraction, roleMention } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { KEYMISSIONFIVECOMPLETE, MISSIONFIVECOMPLETEOLEID, ROLE_EVENT_MENTION } from "../../globals";
import { GetHubKeys, PostHubKeys } from "../../Utils/ApiConnections";
import { commandMiddleware } from "../../Functions/CommandMiddleware";
import { ErrorEmbed, SendEndMissionEmbed } from "../../Utils/Embeds";
require('dotenv').config()

export const ArtistaHackerLiderButtons = async (interaction: ButtonInteraction, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  try { 
    if(interaction.user.id === interaction.customId.split(' ')[0])  return
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    if(member.roles.cache.has(MISSIONFIVECOMPLETEOLEID)) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
    member.roles.add(MISSIONFIVECOMPLETEOLEID).then(async (newMember) => {
      await GetHubKeys(member, KEYMISSIONFIVECOMPLETE)
        .then(async ({ data }) => {
          console.log('data MISION 5 : ', data) 
          console.log('member.id : ', member.id) 
          console.log('TOKEN FITCHIN : ', process.env.TOKEN_FITCHIN) 
          if(data === 'Key aviable'){
            fetch('https://api.fitchin.gg/gamification/challenge-player/complete', {
              headers: { 
                'Content-Type': 'application/json',
                'x-api-key': process.env.TOKEN_FITCHIN!
              },
              method: 'POST',
              body: JSON.stringify({ "key": KEYMISSIONFIVECOMPLETE, "discordId": member.id })
            })
            .then(async (res) => {
              if(res.statusText === 'Accepted') await PostHubKeys(member, KEYMISSIONFIVECOMPLETE)
            })
            .catch((err) => console.error(err))
              
          }
        })
        .catch((err) => console.log(err))
    })
    const embeds = await SendEndMissionEmbed()
    return interaction.update({ embeds, components: [] })
  } catch (error) {
    console.log('Error in ArtistaHackerLiderButtons', error)
  }
}