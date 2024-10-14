import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js'
import { SelectMenuOptionsRaw } from '../../types'

export const CreateSelectMenu = (data: SelectMenuOptionsRaw): ActionRowBuilder => {

	const selectMenuRaw = new StringSelectMenuBuilder()
		.setCustomId(data.customId)
		.setPlaceholder(data.placeholder)
		.addOptions(data.options)

	const selectMenu = new ActionRowBuilder()
		.addComponents(selectMenuRaw)

	return selectMenu
}
