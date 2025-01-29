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

export const MISSIONFIVECOMPLETEOLEID = '1258262996896190485'
export const MISSIONTENCOMPLETEOLEID = '1258276346300203030'
export const MISSIONELEVENCOMPLETEROLEID = '1258200784143646854'
export const MISSIONONETEMPTWOCOMPLETEROLEID = '1331656918313205800'
export const MISSIONFOURTEMPTWOCOMPLETEROLEID = '1331657095703035936'
export const MISSIONSIXTEMPTWOCOMPLETEROLEID = '1331657346421620746'
export const MISSIONNINETEMPTWOCOMPLETEROLEID = '1331657454651572347'
export const MESSAGESHAREACHIEVEMENTCHANNELID = '1288203258204000338'

export const KEYMISSIONFIVECOMPLETE = '4201'
export const KEYMISSIONTENCOMPLETE = '4215'
export const KEYMISSIONELEVENCOMPLETE = '4216'
export const KEYMISSIONONECOMPLETE = '4326'
export const KEYMISSIONFOURCOMPLETE = '4329'
export const KEYMISSIONSIXCOMPLETE = '4331'
export const KEYMISSIONNINECOMPLETE = '4334'

export const MISSIONONELOGSCHANNELID = '1331666019705688094'
export const MISSIONFOURLOGSCHANNELID = '1332063523856973895'
export const MISSIONSIXLOGSCHANNELID = '1332063579993800767'

export const DISMISSEDDISCORDIDS = [
  '980163837846224946',
  '968189892926517330',
  '958362096947580958',
  '885341766331559986',
  '881243646454796309',
  '819351032873222164',
  '812131967201443870',
  '757614281201156146',
  '754125507141828708',
  '736625367770464377',
  '723566333660364890',
  '722095233935999036',
  '721228211782025316',
  '716693559721459735',
  '699704765805756677',
  '696788834020622378',
  '677196360356855828',
  '607035852161286164',
  '591360860820078596',
  '578377484203065384',
  '568424244887683074',
  '550578870487613440',
  '549943780145627137',
  '544616433603182632',
  '535603050866409492',
  '515320048160866304',
  '506748672671744011',
  '484110279844560896',
  '472347892728987658',
  '470011681368440842',
  '444635643415363614',
  '410556590878359553',
  '407225049691717642',
  '399275611840970754',
  '314081192548761600',
  '199633307833466884',
  '1312170255375925338',
  '1306754405348937769',
  '1301387605207941134',
  '1300790846953623592',
  '1295754314471702542',
  '1294486842279858369',
  '1293727704981438525',
  '1292857858051936389',
  '1292615835038519377',
  '1291471939373764742',
  '1289627215088324662',
  '1285591728761602109',
  '1284937237083197540',
  '1281053135376355441',
  '1279092917276905600',
  '1270202139234537524',
  '1268731059227463702',
  '1256346739682709678',
  '1255970855045959680',
  '1254655056888987701',
  '1234576781902614588',
  '1223411551206379553',
  '1212101527091679282',
  '1202461724574351420',
  '1198944582054977558',
  '1161408124759068754',
  '1132140529233182812',
  '1128117495753093140',
  '1058802560695275611',
  '1053871725558890516',
  '1041756862040780851',
  '1001921982490738770'
]