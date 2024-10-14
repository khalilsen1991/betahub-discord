import { GuildMember } from "discord.js";
import { GetMember, GetUser, PostMember, PostUser } from "../../Utils/ApiConnections";

export const commandMiddleware = async (member: GuildMember) => {
  
    await GetUser(member)
      .then(async ({ data: getUserData }) => {
        if(!getUserData) {
          await PostUser(member)
            .then(async ({ data: postUserData }) => {
              await GetMember(member)
                .then(async ({ data: getMemberData }) => {
                  if(!getMemberData) {
                    await PostMember(member)
                      .then( ({ data: postMemberData }) => {})
                      .catch(({ data: postMemberError }) => {})
                  }
                })
                .catch(async (data_get_member_error) => {
                  await PostMember(member)
                    .then( ({ data: postMemberData }) => {})
                    .catch(({ data: postMemberError }) => {})
                })
            })
            .catch((data_post_user_error) =>{})
        }
        if(getUserData){
          await GetMember(member)
            .then(async ({ data: getMemberData }) => {
              if(!getMemberData) {
                await PostMember(member)
                  .then( ({ data: postMemberData }) => {})
                  .catch((data_post_member_error) => {})
              }
            })
            .catch(async (data_get_member_error) => {
              if(data_get_member_error.response.data.message === 'GuildMember not found' || data_get_member_error.response.data.message === 'GuildMember not exist'){
                await PostMember(member)
                  .then( ({ data: postMemberData }) => {})
                  .catch((data_post_member_error) => {})
              }
            })  
        }
      })
      .catch(async (data_get_user_error) => {
        if(data_get_user_error) {
          await PostUser(member)
            .then(async ({ data: postUserData }) => {
              await GetMember(member)
                .then(async ({ data: getMemberData }) => {
                  if(!getMemberData) {
                    await PostMember(member)
                      .then( ({ data: postMemberData }) => {})
                      .catch((data_post_member_error) => {})
                  }
                })
                .catch(async (data_get_member_error) => {
                  if(data_get_member_error.response.data.message === 'GuildMember not found' || data_get_member_error.response.data.message === 'GuildMember not exist'){
                    await PostMember(member)
                      .then( ({ data: postMemberData }) => {})
                      .catch((data_post_member_error) => {})
                  }
                })
            })
            .catch((data_post_user_error) => { })
        }
      })
}