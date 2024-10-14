import { buttonOptions, buttonOptionsEmoji } from ".."

export const BUTTON_STYLE_PRIMARY = 1
export const BUTTON_STYLE_GREY = 2
export const BUTTON_STYLE_SUCCESS = 3
export const BUTTON_STYLE_DANGER = 4
export const BUTTON_STYLE_LINK = 5

export const SettingButtonsOptions = (data: any[]) : buttonOptions[] => {
  const options: buttonOptions[] = []
	
  for (let i = 0; i < data.length; i++) {
    const option = {
      customId: data[i].customId ? data[i].customId : data[i].buttonLabel,
      label: data[i].buttonLabel ? data[i].buttonLabel : data[i],
      style:  data[i].buttonColor ? data[i].buttonColor : BUTTON_STYLE_GREY
    }
    options.push(option)
  }
	
  return options
}

export const SettingButtonOption = (data: any) : buttonOptions => {
  return {
		customId: data.customId ? data.customId : data,
		label: data.label ? data.label : data,
		style:  BUTTON_STYLE_GREY
	}
}

export function PaginationButtons(actuallyPage: number, totalPage: number, identificator: string): buttonOptionsEmoji[] {
	return [
		{
			customId: `${identificator}-first`,
			emoji: '⏮️',
			style: BUTTON_STYLE_GREY, 
			disabled: actuallyPage == 0 ? true : false
		},
		{
			customId: `${identificator}-previous`,
			emoji: '◀',
			style: BUTTON_STYLE_GREY,
			disabled: actuallyPage == 0 ? true : false
		},
		{
			customId: `${identificator}-next`,
			emoji: '▶',
			style: BUTTON_STYLE_GREY,
			disabled: actuallyPage == totalPage - 1 ? true : false
		},
		{
			customId: `${identificator}-last`,
			emoji: '⏭️',
			style: BUTTON_STYLE_GREY,
			disabled: actuallyPage == totalPage - 1 ? true : false
		},
	]
}


export function AcceptOrCancelButtons(identificator: string): buttonOptions[] {
	return [
		{
			customId: `${identificator}-accept`,
			label: 'Aceptar',
			style: BUTTON_STYLE_SUCCESS, 
			disabled: false
		},
		{
			customId: `${identificator}-cancel`,
			label: 'Cancelar',
			style: BUTTON_STYLE_DANGER,
			disabled: false
		}
	]
}

export function TipoDeLiderButtons(data: any[]): buttonOptionsEmoji[] {
	const options: buttonOptionsEmoji[] = []
	
  for (let i = 0; i < data.length; i++) {
    const option = {
			customId: data[i].buttonLabel ? data[i].buttonLabel : data[i],
			style: BUTTON_STYLE_GREY,
			emoji: data[i].buttonEmoji ? data[i].buttonEmoji : '🔵',
			disabled: false
    }
    options.push(option)
  }
	
  return options
}

export function LinkMaliciosoButtons(data: any[]): buttonOptionsEmoji[] {
	const options: buttonOptionsEmoji[] = []
	
  for (let i = 0; i < data.length; i++) {
    const option = {
			customId: data[i].customId ? data[i].customId : data[i],
			style: BUTTON_STYLE_GREY,
			emoji: data[i].buttonEmoji ? data[i].buttonEmoji : '🔵',
			disabled: false
    }
    options.push(option)
  }
	
  return options
}