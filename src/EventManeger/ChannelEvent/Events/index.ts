import { Client, VoiceState } from "discord.js";
import { GetMember, PostMember/* , UpdateVoiceChannelMember */ } from "../../../Utils/ApiConnections";
import { GuildDocument } from "../../../types";

const voiceChannelUsers = new Map()

export const VoiceChannelEvents = async (client: Client, serverConfig: GuildDocument, oldState: VoiceState, newState: VoiceState) => {
 /*  {
    const userId = newState.member!.id;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    if (oldChannel !== null) {
      const timeSpent =  Date.now() - voiceChannelUsers.get(userId)
      voiceChannelUsers.set(userId, Date.now());
      await UpdateVoiceChannelMember(newState.member!, timeSpent)
      voiceChannelUsers.delete(userId)
    }

    if (newChannel !== null) {
      const member = newState.guild.members.cache.get(newState.member!.id)
      if(!newState.member || !member) return
      const { data: memberDB} = await GetMember(member)
      if(memberDB.message === 'User not exist' || memberDB === 'User not exist'){
        await PostMember(member)
          .then(async ({data: memberResponsePost }) => {
            console.log(`El usuario ${memberResponsePost.username} se guardo con exito !`)
          })
      }        

      voiceChannelUsers.set(userId, Date.now());

      const intervalHandle = setInterval(async() => {
        if(voiceChannelUsers.has(userId)){

          if(member.voice.selfMute || member.voice.selfDeaf){
            voiceChannelUsers.set(userId, Date.now())
          } else {
            const timeSpent =  Date.now() - voiceChannelUsers.get(userId)
            voiceChannelUsers.set(userId, Date.now())
            await UpdateVoiceChannelMember(newState.member!, timeSpent)
          }
        }
        if(!voiceChannelUsers.has(userId)) clearInterval(intervalHandle)
      }, 3000)
    }
  } */
}