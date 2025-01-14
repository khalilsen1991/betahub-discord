import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, CacheType, EmbedBuilder } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";
import { KEYMISSIONELEVENCOMPLETE, KEYMISSIONTENCOMPLETE, MISSIONELEVENCOMPLETEROLEID, MISSIONTENCOMPLETEOLEID } from "../../globals";
import { GetHubKeys, PostHubKeys } from "../../Utils/ApiConnections";
import { commandMiddleware } from "../../Functions/CommandMiddleware";
import { CreateLinkDetectorButtons, CreateSettingButtonOptions } from "../../Utils/CreateButton/CreateButton";
import { ErrorEmbed, SendEndMissionEmbed, SendEndMissionEmbedWithPoints } from "../../Utils/Embeds";
require('dotenv').config()

type ButtonDataType = {
  [key: string]: { customId: string; buttonEmoji?: string; buttonLabel?: string; label?: string }[];
};

const ButtonData = (userId: string, messageType: string): { customId: string; buttonEmoji?: string; buttonLabel?: string; label?: string }[] => {
  const data: ButtonDataType = {
    'malicioso': [
      {
        customId: `${userId}-${messageType}-0`,
        buttonEmoji: '👹'
      },
      {
        customId: `${userId}-${messageType}-1`,
        buttonEmoji: '☠️'
      }
    ],
    'experto': [
      {
        customId: `${userId}-${messageType}-0`,
        buttonEmoji: '💪'
      }
    ],
    'detector': [
      {
        customId: `${userId}-${messageType}-0`,
        buttonLabel: 'A'
      },
      {
        customId: `${userId}-${messageType}-1`,
        buttonLabel: 'B'
      },
      {
        customId: `${userId}-${messageType}-2`,
        buttonLabel: 'C'
      },
      {
        customId: `${userId}-${messageType}-3`,
        buttonLabel: 'D'
      }
    ],
    'seguro': [{
      customId: `${userId}-${messageType}`,
      label: 'Obtener puntos / Receber pontos'
    }],
    'virus': [{
      customId: `${userId}-${messageType}`,
      label: 'Obtener puntos / Receber pontos'
    }]
  }
  return data[messageType]
}

const rolesToAdd: Record<string, string> = {
  'malicioso': '937504723035111444',
  'detector': '941831125888815105',
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
          member.roles.add('961300610026721372')
          if(member.roles.cache.has('961300610026721372')) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
        } else {
          member.roles.add(rolesToAdd[role]).then(async (newMember) => {
            if(rolesToAdd[role] === MISSIONTENCOMPLETEOLEID || rolesToAdd[role] === MISSIONELEVENCOMPLETEROLEID){
              const keyId = rolesToAdd[role] === MISSIONTENCOMPLETEOLEID ? KEYMISSIONTENCOMPLETE : KEYMISSIONELEVENCOMPLETE
              await GetHubKeys(member, keyId)
                .then(async ({ data }) => {
                  if(data === 'Key aviable'){                
                    fetch('https://api.staging.fitchin.gg/gamification/challenge-player/complete', {
                      headers: {
                        'Content-Type': 'application/json' ,
                          'x-api-key': process.env.TOKEN_FITCHIN || ''
                        },
                      method: 'POST',
                      body: JSON.stringify({ "key": keyId, "discordId":  member.id }) 
                    }) 
                      .then(async (res) => {
                        if(res.statusText === 'Accepted') await PostHubKeys(member, keyId)
                      })
                      .catch((err) => console.log(err))
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