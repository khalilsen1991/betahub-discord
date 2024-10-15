import { ButtonInteraction, CacheType } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { KEYMISSIONELEVENCOMPLETE, KEYMISSIONTENCOMPLETE, MISSIONELEVENCOMPLETEROLEID, MISSIONTENCOMPLETEOLEID } from "../../globals";
import { GetHubKeys, PostHubKeys } from "../../Utils/ApiConnections";
import { commandMiddleware } from "../../Functions/CommandMiddleware";
require('dotenv').config()

const rolesToAdd: Record<string, string> = {
  'malicioso': '1258199448052306013',
  'detector': '1258199736725274757',
  'seguro': MISSIONTENCOMPLETEOLEID,
  'virus': MISSIONTENCOMPLETEOLEID,
  'experto': MISSIONELEVENCOMPLETEROLEID
};

export const LinksButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  try {
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    for (const role in rolesToAdd) {
      if (interaction.customId.split('-')[1] === role) {
        if(interaction.customId.includes('detector-1')){
          member.roles.add('1258199828362432678')
          if(member.roles.cache.has('1258199828362432678')) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
        } else {
          member.roles.add(rolesToAdd[role]).then(async (newMember) => {
            if(rolesToAdd[role] === MISSIONTENCOMPLETEOLEID || rolesToAdd[role] === MISSIONELEVENCOMPLETEROLEID){
              const keyId = rolesToAdd[role] === MISSIONTENCOMPLETEOLEID ? KEYMISSIONTENCOMPLETE : KEYMISSIONELEVENCOMPLETE
              await GetHubKeys(member, keyId)
                .then(async ({ data }) => {
                  if(data === 'Key aviable'){                
                    fetch('https://api.fitchin.gg/gamification/challenge-player/complete', {
                      headers: {
                        'Content-Type': 'application/json' ,
                          'x-api-key': process.env.TOKEN_FITCHIN!
                        },
                      method: 'POST',
                      body: JSON.stringify({ "key": keyId, "discordId":  member.id }) 
                    }) 
                    .then(async (res) => {
                        console.log(res)
                        if(res.statusText === 'Accepted') await  PostHubKeys(member, keyId)
                      })
                      .catch((err) => console.error(err))
                  }
                })
                .catch(async ({ response }) => { if(response?.data?.message === 'GuildMember not found') await commandMiddleware(newMember) })
              }
          })
          .catch((err) => console.log(err))
          if(member.roles.cache.has(rolesToAdd[role])) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
        }
      }
    }
    return interaction.reply({ content: `GENIAL :white_check_mark: Mira el canal que te aparece a la izquierda.\nÓTIMO :white_check_mark: Veja o canal que aparece à esquerda.`, ephemeral: true })
  } catch (error) {
    console.log('Error in LinksButtons', error)
  }
}