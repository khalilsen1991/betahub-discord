import { ActionRowBuilder, ButtonBuilder, CacheType, StringSelectMenuInteraction } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../../types";
import { SuccessfullyEmbed } from "../../../Utils/Embeds";
import { CreateButtonLink } from "../../../Utils/CreateButton";
import { KEYMISSIONONECOMPLETE, MISSIONONETEMPTWOCOMPLETEROLEID } from "../../../globals";
import { DestructuringEmbeds } from "../../../Utils/DestructuringEmbeds";
import { GetHubKeys, PostHubKeys } from "../../../Utils/ApiConnections";
import { commandMiddleware } from "../../../Functions/CommandMiddleware";

export const ManagerMissionOnePartTen = async (interaction: StringSelectMenuInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  let description = ''
  if(interaction.values[0] === '0') description += `Genial. Te desafiamos a que a lo largo de las misiones puedas repensar tus propias opiniones. Tal vez encuentras muchas novedades y aprendes cosas interesantes que mejorarán tu salud financiera.`
  if(interaction.values[0] === '1') description += `¿Estás listo para seguir aprendiendo y compartir el conocimiento con tu familia?`
  if(interaction.values[0] === '2') description += `A lo largo de este curso vas a aprender y a reflexionar sobre el dinero, seguro te va a permitir tener conversaciones sobre estos temas 💪`

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

  await client.guilds.cache.get(interaction.guildId!)?.members.cache.get(interaction.user.id)?.roles.add(MISSIONONETEMPTWOCOMPLETEROLEID)
    .then(async (newMember) => {
      const keyId = KEYMISSIONONECOMPLETE
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