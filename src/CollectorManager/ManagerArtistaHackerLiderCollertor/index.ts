import { ButtonInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { KEYMISSIONFIVECOMPLETE, MISSIONFIVECOMPLETEOLEID } from "../../globals";
import { GetHubKeys, PostHubKeys } from "../../Utils/ApiConnections";
import { commandMiddleware } from "../../Functions/CommandMiddleware";
require('dotenv').config()

export const ArtistaHackerLiderButtons = async (interaction: ButtonInteraction, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  try { 
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    if(member.roles.cache.has(MISSIONFIVECOMPLETEOLEID)) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
    member.roles.add(MISSIONFIVECOMPLETEOLEID).then(async (newMember) => {
      await GetHubKeys(member, KEYMISSIONFIVECOMPLETE)
        .then(async ({ data }) => {
          if(data === 'Key aviable'){
            fetch('https://api.staging.fitchin.gg/gamification/challenge-player/complete', {
              headers: { 
                'Content-Type': 'application/json',
                'x-api-key': process.env.TOKEN_FITCHIN || ''
              },
              method: 'POST',
              body: JSON.stringify({ "key": KEYMISSIONFIVECOMPLETE, "discordId": member.id })
            })
              .then(async (res) => {
                if(res.statusText === 'Accepted') await PostHubKeys(member, KEYMISSIONFIVECOMPLETE)
              })
              .catch((err) => console.log(err))
          }
        })
        .catch(async ({ response }) => { if(response?.data?.message === 'GuildMember not found') await commandMiddleware(newMember) })
    })
    .catch((err) => console.log(err))
    return interaction.reply({ content: `GENIAL :white_check_mark: Mira el canal que te aparece a la izquierda.\nÓTIMO :white_check_mark: Veja o canal que aparece à esquerda.`, ephemeral: true })
  } catch (error) {
    console.log('Error in ArtistaHackerLiderButtons', error)
  }
}