import { Guild, GuildMember, Message, TextChannel } from "discord.js";
import { DuelEmbed, ErrorEmbed, FinishDuelEmbed } from "../Embeds";
import { getRandomNumber } from "../../globals";
import { PutDuel } from "../ApiConnections";
import { GuildDocument } from "../../types";

export const Duel = async (guild: Guild, attacker: GuildMember, fender: GuildMember, attackerLife: number, fenderLife: number, message: Message, description: string, duelId: string, serverConfigs: GuildDocument) => {
  if(attackerLife > 0 && fenderLife > 0){
    setTimeout(async () => {
      const damage = getRandomNumber(1, 30)
      if(description!.split('\n')[description!.split('\n').length - 2].includes(':arrow_right_hook:')){
        attackerLife = attackerLife - damage
      } else {
        fenderLife = fenderLife - damage
      }
      description!.split('\n')[description!.split('\n').length - 2].includes(':arrow_right_hook:') ?  description += `:leftwards_arrow_with_hook:  ${fender.nickname || fender.displayName} atacó a ${attacker.nickname || attacker.displayName} y le sacó ${damage}\n` : description += `:arrow_right_hook:  ${attacker.nickname || attacker.displayName} atacó a ${fender.nickname || fender.displayName} y le sacó ${damage}\n` 
      if(description!.split('\n').length > 4) description = description!.split('\n').splice(1, description!.split('\n').length -1).join('\n')
      const embeds =  description!.split('\n')[description!.split('\n').length - 2] && description!.split('\n')[description!.split('\n').length - 2].includes(':arrow_right_hook:') ? await DuelEmbed(attacker, fender, attackerLife, fenderLife, description!, true) : await DuelEmbed(attacker, fender, attackerLife, fenderLife, description!, false)
      await message.edit({ embeds, components: [] })
      await Duel(guild, attacker, fender,  attackerLife, fenderLife, message, description, duelId, serverConfigs)
    }, 2000) 
  } if(attackerLife <= 0 || fenderLife <= 0){
    const logChannel = guild.channels.cache.get(serverConfigs.channelEventLog!) as TextChannel
    const { data: duelFinishData } = attackerLife <= 0 ? await PutDuel(guild.id, fender, attacker, duelId) : await PutDuel(guild.id, attacker, fender, duelId)
    if(!duelFinishData) return message.edit({ embeds: await ErrorEmbed('Error al finalizar el duelo', attacker) })
    attackerLife <= 0 ?  description += `🏆** ${fender.nickname || fender.displayName} GANÓ EL DUELO**` : description += `🏆** ${attacker.nickname || attacker.displayName} GANÓ EL DUELO**` 
    if(description!.split('\n').length > 4) description = description!.split('\n').splice(1, description!.split('\n').length -1).join('\n')
    const embeds = await FinishDuelEmbed(attacker, fender, attackerLife, fenderLife, description!)
    await message.edit({ embeds })
    logChannel.send(`El duelo entre <@${attacker.id}> <@${fender.id}> terminó: **${attackerLife <= 0 ? fender.nickname || fender.displayName : attacker.nickname || attacker.displayName} GANÓ EL DUELO**`)
    return
  }
}