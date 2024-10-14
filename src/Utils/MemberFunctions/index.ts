import { Client, Guild, Message } from "discord.js"
import { GetMember, PostMember, PutMember } from "../ApiConnections"

export const GetOrPostUser = async (id: string, guild: Guild) => {
  return new Promise(async (resolve, reject) => {
    const member = guild.members.cache.get(id)
    if(!member){
      reject(false)
    }
    await GetMember(member!)
      .then(async ({ data: memberData }) => {
        if(memberData === 'User not exist'){
          await PostMember(member!)
            .then(async ({ data: memberPost }) => {
              resolve(memberPost)
            })
            .catch(async (dataPost) => { 
              const { messagePost } = dataPost.response.data
              reject(messagePost)
            })
        } if(memberData === 'GuildMember not exist'){
            await PutMember(member!)
            .then(async ({ data: memberPut }) => {
              resolve(memberPut)
            })
            .catch(async (dataPut) => { 
              const { messagePost } = dataPut.response.data
              reject(messagePost)
            })
        } else {
          resolve(memberData)
        }
      })
      .catch(async (data) => { 
        const { message } = data.response.data      
        console.log('message', message)
      })
  })  
}
/*     if(message === 'GuildMember not exist'){
      await PutMember(member!)
    }       */  