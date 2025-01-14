import { RoleMention } from 'discord.js';

export const ROLE_EVENT_MENTION = '<@&1253465538911535124>' as RoleMention

export const getRandomNumber = (min: number, max: number) => Math.floor((Math.random() * (max - min + 1)) + min)

export const getRankMonster = (number: number): number | undefined => {
  if(number > 0 && number <= 30) return 1
  if(number > 30 && number <= 60) return 2
  if(number > 60 && number <= 75) return 3
  if(number > 75 && number <= 90) return 4
  if(number > 90 && number <= 99) return 5
  if(number === 100) return 6
}
export const MIN_MINUTES= 35 
export const MAX_MINUTES= 70 

export const INITIAL_HIT_BOSS = 0 as Number

export const intoRange = (from: number, to: number): boolean => {
  const ahora = new Date();
  const horas = ahora.getHours();
  return horas >= from || horas < to && ahora.getMinutes() >= 0
}

export const MISSIONFIVECOMPLETEOLEID = '1112779208905724014'
export const MISSIONTENCOMPLETEOLEID = '948297952634482708'
export const MISSIONELEVENCOMPLETEROLEID = '1115273136833839125'
export const MISSIONONETEMPTWOCOMPLETEROLEID = '1204872503424589897'
export const MISSIONTWOTEMPTWOCOMPLETEROLEID = '1127043779413671997'
export const MISSIONOTHREETEMPTWOCOMPLETEROLEID = '664932467383205889'
export const MISSIONOFOURTEMPTWOCOMPLETEROLEID = '961300513046036530'
export const MESSAGESHAREACHIEVEMENTCHANNELID = '1094777633528614932'

export const KEYMISSIONFIVECOMPLETE = '4201'
export const KEYMISSIONTENCOMPLETE = '4215'
export const KEYMISSIONELEVENCOMPLETE = '4216'
export const KEYMISSIONSTARTCOMPLETE = '4326'
export const KEYMISSIONONECOMPLETE = '4329'
export const KEYMISSIONTWOCOMPLETE = '4331'
export const KEYMISSIONETHREECOMPLETE = '4334'