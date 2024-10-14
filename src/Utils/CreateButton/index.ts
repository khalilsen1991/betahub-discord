/* eslint-disable quotes */
import { ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, SelectMenuComponentOptionData, ButtonBuilder } from 'discord.js'

export type options = {
  customId: string;
  placeholder: string;
  options: SelectMenuComponentOptionData[];
};

export type buttonOptions = {
  customId: string;
  label: string;
  style: ButtonStyle;
	disabled?: boolean;
};

export type buttonLinkOptions = {
  link: string,
  label: string;
  style: ButtonStyle;
};

export type buttonOptionsEmoji = {
  customId?: string;
  style: ButtonStyle;
  emoji: string;
	disabled?: boolean;
};

export type buttonOptionsEmojiAndLabel = {
  customId: string;
  style: ButtonStyle;
  emoji: string;
	label: string;
	disabled?: boolean;
};


export const CreateButtons = (options: options): ActionRowBuilder => {
	return new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId(options.customId)
				.setPlaceholder(options.placeholder)
				.addOptions(options.options),
		)
}

export const CreateButton = (options: buttonOptions): ActionRowBuilder => {
	return new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId(options?.customId)
				.setLabel(options?.label)
				.setStyle(options?.style)
		)
}

export const CreateButtonLink = (options: buttonLinkOptions): ActionRowBuilder => {
	return new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setURL(options?.link)
				.setStyle(options?.style)
				.setLabel(options.label)
		)
}

export const CreateArrayButton = (options: buttonOptions[]): ActionRowBuilder<ButtonBuilder> => {
	const ArrowButtons = new ActionRowBuilder<ButtonBuilder>()
	for (let i = 0; i < options.length; i++) {
		const element = options[i]
		ArrowButtons.addComponents( 
			new ButtonBuilder()
				.setCustomId(element?.customId)
				.setLabel(element?.label)
				.setStyle(element?.style)
				.setDisabled(element?.disabled || false)
		)
	}
	return ArrowButtons 
}

export const CreateArrayButtonWithEmoji = (options: buttonOptionsEmoji[]): ActionRowBuilder => {
	const ArrowButtons = new ActionRowBuilder()
	for (let i = 0; i < options.length; i++) {
		const element = options[i]
		ArrowButtons.addComponents(
			new ButtonBuilder()
				.setCustomId(element?.customId!)
				.setStyle(element?.style)
				.setEmoji(element?.emoji)
				.setDisabled(element?.disabled)
		)
	}
	return ArrowButtons 
}

export const CreateArrayButtonWithEmojiAndLabel = (options: buttonOptionsEmojiAndLabel[]): ActionRowBuilder => {
	const ArrowButtons = new ActionRowBuilder()
	for (let i = 0; i < options.length; i++) {
		const element = options[i]
		ArrowButtons.addComponents(
			new ButtonBuilder()
				.setCustomId(element?.customId)
				.setStyle(element?.style)
				.setEmoji(element?.emoji)
				.setLabel(element?.label)
				.setDisabled(element?.disabled)
		)
	}
	return ArrowButtons 
}