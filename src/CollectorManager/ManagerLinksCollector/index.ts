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
  'seguro': MISSIONTENCOMPLETEOLEID,
  'virus': MISSIONTENCOMPLETEOLEID,
  'experto': MISSIONELEVENCOMPLETEROLEID
};

export const LinksButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  try {
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    if(interaction.customId.split('-')[1] === 'malicioso'){
      if(member.roles.cache.has(MISSIONTENCOMPLETEOLEID) ) {
        const embeds = await ErrorEmbed(':flag_es: **Ya completaste esta misión**\n:flag_br: **Você já completou esta missão**', member)
        return interaction.reply({ embeds, ephemeral: true })
      } else {
        const components = await CreateLinkDetectorButtons(ButtonData(interaction.user.id!, 'detector')) as ActionRowBuilder<ButtonBuilder>[]
        const embeds =await SendEndMissionEmbedWithPoints('detector') as EmbedBuilder[]
        if(!components || !embeds) return
        await interaction.reply({ embeds, ephemeral: true });
        await interaction.followUp({ content: '### :flag_es: [Em português 🇧🇷 abaixo]\na. Haces click en el botón COMPRAR, abres la página, copias el enlace desde el navegador y lo analizas.\nb. Copias la url del botón COMPRAR con el botón derecho del mouse y lo pegas en los sitios de verificación.\nc. Abres el enlace en una ventana nueva y verificas su contenido en los sitios que te dimos arriba.\nd. Ignoras el enlace y borras el correo o mensaje que lo contiene.\n\n### :flag_br:\n\na. Você clica no botão COMPRAR, abre a página, copia o link do navegador e o analisa.\nb. Você copia a URL do botão COMPRAR com o botão direito do mouse.\nc. Você abre o link em uma nova janela e verifica o conteúdo no site que compartilhamos acima.\nd. Você ignora o link e apaga o e-mail ou mensagem que o contém.', components: components!, ephemeral: true });
        return
      }
    }
    if(interaction.customId.split('-')[1] === 'detector' && interaction.customId.split('-')[0] === interaction.user.id){
      const components = interaction.customId.split('-')[2] != '1' ? await CreateSettingButtonOptions(ButtonData(interaction.user.id!, 'seguro')[0]) as ActionRowBuilder<ButtonBuilder>[] : await CreateSettingButtonOptions(ButtonData(interaction.user.id!, 'virus')[0]) as ActionRowBuilder<ButtonBuilder>[] 
      const embeds = interaction.customId.split('-')[2] != '1' ? await SendEndMissionEmbedWithPoints('seguro') as EmbedBuilder[] : await SendEndMissionEmbedWithPoints('virus') as EmbedBuilder[]
      if(!components || !embeds) return
      await interaction.update({ content: '', embeds, components })
      return
    }

    if(member.roles.cache.has(MISSIONELEVENCOMPLETEROLEID) && interaction.customId.split('-')[1] === 'experto') {
      const embeds = await ErrorEmbed(':flag_es: **Ya completaste esta misión**\n:flag_br: **Você já completou esta missão**', member)
      return interaction.reply({ embeds, ephemeral: true })
    }
    if(interaction.customId.split('-')[1] === 'seguro' && interaction.customId.split('-')[0] === interaction.user.id || interaction.customId.split('-')[1] === 'virus' && interaction.customId.split('-')[0] === interaction.user.id || interaction.customId.split('-')[1] === 'experto'){
      member.roles.add(rolesToAdd[interaction.customId.split('-')[1]])
        .then(async (newMember) => {
          const keyId = rolesToAdd[interaction.customId.split('-')[1]] === MISSIONTENCOMPLETEOLEID ? KEYMISSIONTENCOMPLETE : KEYMISSIONELEVENCOMPLETE
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
        })
        .catch((err) => console.log(err))
      const embeds = await SendEndMissionEmbed()
      if(!embeds) return
      interaction.customId.split('-')[1] === 'seguro' || interaction.customId.split('-')[1] === 'virus' ? await interaction.update({ embeds, components: [] }) : await interaction.reply({ embeds, ephemeral: true })
      return
    }
  } catch (error) {
    console.log('Error in LinksButtons', error)
  }
}