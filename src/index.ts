require('dotenv').config()
import { Client, Collection, OAuth2Guild } from 'discord.js';
import { DiscordConfig } from './config/DiscordConfig';
import { GetGuildsConfigs } from './Utils/ApiConnections';
import { EventManager } from './EventManeger';
import { commandRegister } from './CommandsRegister';
import { ClientWithCommands, GuildDocument } from './types';


export const clients = new Collection<string, ClientWithCommands>();
let client = new Client({ intents: DiscordConfig.intents , partials: DiscordConfig.partials }) as ClientWithCommands

(async () => {
  const { data: configsServers } = await GetGuildsConfigs()
  client.commands = new Collection<string, any>()
  client.config = new Collection<string, GuildDocument>()
  for (let i = 0; i < configsServers.length; i++) {
    const configServer = configsServers[i];
    client.login(configServer.TOKEN)
    client.on('ready', async(clientDiscord: Client) => {
      console.log(`Logged in as ${clientDiscord.user?.tag}!`); 
      if(!client.config.get(configServer.guildId)) await client.config.set(configServer.guildId, configServer)
      clients.set(configServer.guildId, client)
      await clientDiscord.guilds.fetch(configServer.guildId)
      .then(async (guild) => {
        await guild.members.fetch()
          .then(async(members) => { 
              await EventManager(client, guild)
              await commandRegister(client) 
              console.log(`Members of ${guild.name} fetched! Total members: ${guild.memberCount}`) 
            })
            .catch((err) => { console.log(`Error fetching members of ${guild.name}!`, err) })
        }) 
      .catch((err) => { console.log('Error fetching guilds!', err) })
    })
  }
})()