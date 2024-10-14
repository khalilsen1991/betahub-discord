import { ActionRowBuilder, GuildMember } from 'discord.js'
import { CreateArrayButton, CreateArrayButtonWithEmoji, CreateButton, CreateButtons, buttonOptions, buttonOptionsEmoji } from '../CreateButton'
import { AcceptOrCancelButtons, LinkMaliciosoButtons, PaginationButtons, SettingButtonOption, SettingButtonsOptions, TipoDeLiderButtons } from './ButtonsOptions'

export const CreateAcceptOrCancelButton = async (identificator: string): Promise<ActionRowBuilder> => {
	try {
		const options : buttonOptions[] = AcceptOrCancelButtons(identificator)
		return CreateArrayButton(options)
	} catch (e) {
		console.log(e)
		throw e
	}
}

export const CreateLinkMaliciosoButtons = async (data: any[]): Promise<ActionRowBuilder[]> => {
	try {
		const options : buttonOptionsEmoji[] = await LinkMaliciosoButtons(data) 
		return [CreateArrayButtonWithEmoji(options)]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export const CreateTipoDeLiderButtons = async (data: any[]): Promise<ActionRowBuilder[]> => {
	try {
		const options : buttonOptionsEmoji[] = await TipoDeLiderButtons(data) 
		return [CreateArrayButtonWithEmoji(options)]
	} catch (e) {
		console.log(e)
		throw e
	}
}


export const CreateSettingButtonOptions = async (data: any): Promise<ActionRowBuilder[]> => {
	try {
		const options : buttonOptions = await SettingButtonOption(data) 
		return [CreateButton(options)]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export const CreatePaginationButtons = async (index: number, totalPage: number, identificator: string): Promise<ActionRowBuilder> => {
	try {
		const options : buttonOptionsEmoji[] = PaginationButtons(index, totalPage, identificator)
		return CreateArrayButtonWithEmoji(options)
	} catch (e) {
		console.log(e)
		throw e
	}
}

export const CreateLinkDetectorButtons = async (data: any[]): Promise<ActionRowBuilder[]> => {
	try {
		const options : buttonOptions[] = await SettingButtonsOptions(data) 
		return [CreateArrayButton(options)]
	} catch (e) {
		console.log(e)
		throw e
	}
}
