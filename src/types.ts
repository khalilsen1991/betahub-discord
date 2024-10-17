import { ActionRowBuilder, ButtonBuilder, Client, Collection, ComponentEmojiResolvable, EmbedAuthorData, EmbedBuilder, EmbedField, EmbedFooterData, Guild, GuildMember, StringSelectMenuOptionBuilder } from 'discord.js'
/* import { PaginationBuilder } from './utils/PaginationBuilder'
 */

export interface ClientWithCommands extends Client {
  commands: Collection<string, any>
  config: Collection<string, GuildDocument>
}

export interface PaginationComponents {
  currentPage: number;
  objectsInPage: any[];
  totalPage: number;
  components: ActionRowBuilder<ButtonBuilder>,
}

export interface MessageBuilder {
  components?: ActionRowBuilder<ButtonBuilder>,
  embeds?: EmbedBuilder[]
}

export interface GuildDocument {
  guildName: string,
  guildId: string,
  roleStaffId: string,
  channelEventLog?: string,
  channelSpam?: string,
  generalChannelsIds: string[],
  allowChannelsIds: string[],
  channeleventembed: string,
  channelTabledDuelEmbeds: string,
  TOKEN: string,
  membersLogsChannelId: string,
  messagesLogsChannelId: string,
  CLIENT_ID: string,
  redeemChannelId: string,
}

export interface SelectMenuOptionsRaw {
  customId: string;
  placeholder: string;
  options: StringSelectMenuOption[]
}

export interface StringSelectMenuOption {
  default?: boolean;
  description?: string;
  emoji?: ComponentEmojiResolvable;
  label: string;
  value: string;
}

export interface EmbedRaw {
  author?: EmbedAuthorData;
  color?: number;
  url?: string;
  image?: string;
  footer?: EmbedFooterData;
  thumbnail?: string;
  description?: string;
  title?: string;
  timestamp?: boolean;
}

export interface EmbedWtihFieldsRaw {
  author?: EmbedAuthorData;
  color?: number;
  url?: string;
  image?: string;
  footer?: EmbedFooterData;
  thumbnail?: string;
  description?: string;
  title?: string;
  timestamp?: boolean;
  fields: EmbedField[],
}

export interface IUser {
  id: string,
  bot: boolean,
  system: boolean,
  flags: number,
  username: string,
  discriminator: string,
  avatar: string,
  guild: {
    id: string,
    name: string,
    icon: string,
    features: string[],
    available: boolean,
    shardId: number,
    banner: string,
    description: string,
    verificationLevel: number,
    vanityURLCode: string,
    memberCount: number,
    systemChannelId: string,
    joinedTimestamp: number,
  }
}

export interface PaginationComponents {
  currentPage: number,
  objectsInPage: any[],
  totalPage: number,
  components: ActionRowBuilder<ButtonBuilder>,
}

export interface IGuild {
	id: string,
	name: string,
	icon?: string,
	features?: [],
	available?: boolean,
	shardId?: number,
	banner?: string,
	description?: string,
	verificationLevel?: number,
	vanityURLCode?: string,
	memberCount?: number,
	systemChannelId?: string,
	joinedTimestamp?: number,
}

export interface IUserDB {
	id: string,
	bot?: boolean,
	system?: boolean,
	flags?: number,
	username: string,
	discriminator?: string ,
	avatar?: string,
}

export interface IMembers {
	guildId: string,
	enabled: boolean,
	guild: Guild,
	joinedTimestamp: number,
	premiumSinceTimestamp: number,
	nickname: string,
	pending: boolean,
	communicationDisabledUntilTimestamp: number,
	roles: string [],
	user: IUser,
	avatar: string,
	leftGuildDate: Date,
	createdAt: Date,
	updatedAt: Date
}

export interface ISelectOption {
  optionSelected?: string,
  ticketsCategory?: any
}
