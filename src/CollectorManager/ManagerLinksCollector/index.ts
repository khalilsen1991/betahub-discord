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
    'experto': [
      {
        customId: `${userId}-${messageType}-0`,
        buttonEmoji: '💪'
      }
    ],
    'detector': [
      {
        customId: `${userId}-virus-0`,
        buttonLabel: 'A'
      },
      {
        customId: `${userId}-seguro-1`,
        buttonLabel: 'B'
      },
      {
        customId: `${userId}-virus-2`,
        buttonLabel: 'C'
      },
      {
        customId: `${userId}-virus-3`,
        buttonLabel: 'D'
      }
    ],
    'seguro': [{
      customId: `${userId}-${messageType}`,
      label: 'Obtener puntos'
    }],
    'virus': [{
      customId: `${userId}-${messageType}`,
      label: 'Obtener puntos'
    }]
  }
  return data[messageType]
}

const rolesToAdd: Record<string, string> = {
  'detector': '1333819750505255005',
  'seguro': MISSIONTENCOMPLETEOLEID,
  'virus': MISSIONTENCOMPLETEOLEID,
  'experto': MISSIONELEVENCOMPLETEROLEID
};

export const LinksButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  try {
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    for (const role in rolesToAdd) {
      console.log('interaction.customId.split(-)[1]', interaction.customId.split('-')[1])
      console.log('role', role)
      console.log('rolesToAdd[role]', rolesToAdd[role])
      if (interaction.customId.split('-')[1] === role) {
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
                      if(res.statusText === 'Accepted') {
                        await PostHubKeys(member, keyId)
                        const embedEndMissionRole = await SendEndMissionEmbedWithPoints(role)
                        const embedEndMission = await SendEndMissionEmbed()
                        interaction.reply({ embeds: [embedEndMissionRole[0], embedEndMission[0]], ephemeral: true })
                      }
                    })
                    .catch((err) => console.log(err))
                }
              })
              .catch(async ({ response }) => { if(response?.data?.message === 'GuildMember not found') await commandMiddleware(newMember) })
            } else {
              const embeds = await SendEndMissionEmbedWithPoints(role) as EmbedBuilder[]
              const data = ButtonData(interaction.user.id, role)
              const components = await CreateLinkDetectorButtons(data) as ActionRowBuilder<ButtonBuilder>[]
              interaction.reply({ embeds, components, ephemeral: true  })  
            }
          })
        .catch((err) => console.log(err))
        const embeds = await SendEndMissionEmbedWithPoints(role) as EmbedBuilder[]
        const data = ButtonData(interaction.user.id, role)
        const components = await CreateLinkDetectorButtons(data) as ActionRowBuilder<ButtonBuilder>[]
        interaction.reply({ embeds, components, ephemeral: true  })      
      } else {
        const embeds = await SendEndMissionEmbedWithPoints(role) as EmbedBuilder[]
        const data = ButtonData(interaction.user.id, role)
        const components = await CreateLinkDetectorButtons(data) as ActionRowBuilder<ButtonBuilder>[]
        interaction.reply({ embeds, components, ephemeral: true  })      
      }
    }
  } catch (error) {
    console.log('Error in LinksButtons', error)
  }
}