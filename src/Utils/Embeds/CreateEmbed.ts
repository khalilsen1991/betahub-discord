import { EmbedBuilder } from 'discord.js'
import { EmbedRaw, EmbedWtihFieldsRaw } from '../../types'

export const CreateEmbed = (embedRaw: EmbedRaw): EmbedBuilder => {
	try {
		const embed = new EmbedBuilder()
		if (embedRaw.author) embed.setAuthor(embedRaw.author)
		if (embedRaw.color) embed.setColor(embedRaw.color)
		if (embedRaw.url) embed.setURL(embedRaw.url)
		if (embedRaw.image) embed.setImage(embedRaw.image)
		if (embedRaw.footer) embed.setFooter(embedRaw.footer)
		if (embedRaw.thumbnail) embed.setThumbnail(embedRaw.thumbnail)
		if (embedRaw.description) embed.setDescription(embedRaw.description)
		if (embedRaw.title) embed.setTitle(embedRaw.title)
		if (embedRaw.timestamp) embed.setTimestamp()

		return embed
	} catch (e) {
		console.log(e)
		throw(e)
	}
}

export const CreateEmbedWithFields = (embedRaw: EmbedWtihFieldsRaw): EmbedBuilder => {
	try {
		const embed = new EmbedBuilder()
		if (embedRaw.author) embed.setAuthor(embedRaw.author)
		if (embedRaw.color) embed.setColor(embedRaw.color)
		if (embedRaw.url) embed.setURL(embedRaw.url)
		if (embedRaw.fields) embed.setFields(embedRaw.fields)
		if (embedRaw.image) embed.setImage(embedRaw.image)
		if (embedRaw.footer) embed.setFooter(embedRaw.footer)
		if (embedRaw.thumbnail) embed.setThumbnail(embedRaw.thumbnail)
		if (embedRaw.description) embed.setDescription(embedRaw.description)
		if (embedRaw.title) embed.setTitle(embedRaw.title)
		if (embedRaw.timestamp) embed.setTimestamp()

		return embed
	} catch (e) {
		console.log(e)
		throw(e)
	}
}