import { ActionRowBuilder, ButtonBuilder } from 'discord.js'
import { CreatePaginationButtons } from '../CreateButton/CreateButton'
import { PaginationBuilder } from '../PaginationBuilder'
import { PaginationComponents } from '../../types'

export const ComponentPagination = async (paginationBuilder: PaginationBuilder, identificator: string): Promise<PaginationComponents> => {
	const currentPage = paginationBuilder.getCurrentPage()
	const objectsInPage = paginationBuilder.getObjectsCurrentPage()
	const totalPage = paginationBuilder.getPagesNumber()
	const paginationButtons = await CreatePaginationButtons(parseInt(identificator.split('-')[5]), totalPage, identificator) as ActionRowBuilder<ButtonBuilder>
	
	return {
		currentPage,
		objectsInPage,
		totalPage,
		components: paginationButtons,
	}
}
