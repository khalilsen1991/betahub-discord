import { StringSelectMenuOptionBuilder, SelectMenuComponentOptionData } from 'discord.js'
import { CreateSelectMenu } from '.'
import { SelectMenuOptionsRaw, StringSelectMenuOption } from '../../types'

export const SelectMenu = async (data: SelectMenuOptionsRaw) => {
	const options = [] as StringSelectMenuOption[]
	for (let i = 0; i < data.options.length; i++) {
		options.push( data.options[i])
	}

	if (options.length > 0){
		const selectMenuRawOptions = {
			customId : data.customId,
			placeholder : data.placeholder,
			options
		}

		const selectMenu = await CreateSelectMenu(selectMenuRawOptions)
		return selectMenu
	} else {
		return false
	}
}

