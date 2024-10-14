/* import { GuildMember } from "discord.js"
import { GuildConfig } from "../../types"
import { GetLastGame } from "../../Utils/ApiConnections"
import { ErrorEmbed } from "../../Utils/Embeds"

export const CommandAvailable = async (game: string, member: GuildMember, serverConfig: GuildConfig) => {
	const { data } = await GetLastGame(game, member)
	if(data.createdAt){
		const dateLastGame = new Date(data.updatedAt)
		const today = new Date()
		const diferenciaMinutos = Math.round(Math.abs(dateLastGame.getTime() - today.getTime()) / (1000 * 60))
		const rtf1 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })
		if (game === 'penalty' && diferenciaMinutos < 45 || game === 'blackjack' && diferenciaMinutos < 45){
			const totalMinutes = 45 - diferenciaMinutos
			const embeds = await ErrorEmbed(`\`\`${rtf1.format(totalMinutes, 'minutes').charAt(0).toUpperCase()}${rtf1.format(totalMinutes, 'minutes').slice(1)}\`\` podrás volver a patear un penal`, member)
			return { available: false, embeds }
		}  
		if (game === 'penalty' && diferenciaMinutos >= 45 || game === 'blackjack' && diferenciaMinutos >= 45) {
			return { available: true }
		}
		if (game === 'preguntados' && diferenciaMinutos < 30){
			const totalMinutes = 30 - diferenciaMinutos
			const embeds = await ErrorEmbed(`\`\`${rtf1.format(totalMinutes, 'minutes').charAt(0).toUpperCase()}${rtf1.format(totalMinutes, 'minutes').slice(1)}\`\` podrás volver a jugar al juego \`\`${game}\`\``, member)
			return { available: false, embeds }
		}  
		if (game === 'preguntados' && diferenciaMinutos >= 30) {
			return { available: true }
		}
	} if (data.message && data.message === 'Game available') {
		return { available: true }
	} else {
		return { available: true }
	}
}


export const CommandCooldown = async (member: GuildMember, serverConfig: GuildConfig) => {
	const { data: penalty } = await GetLastGame('penalty', member)
	const { data: preguntados } = await GetLastGame('preguntados', member)
	const { data: blackjack } = await GetLastGame('blackjack', member)
	const rtf1 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })
	let description = `Mostrando cooldowns para <@${member.id}>\n\n`
	if(!penalty.createdAt) description +=`**Penal** está disponible\n`
	if(penalty.createdAt) {
		const penaltyGameDateLastGame = new Date(penalty.updatedAt)
		const today = new Date()
		const penaltyGameMinutesDiference = Math.round(Math.abs(penaltyGameDateLastGame.getTime() - today.getTime()) / (1000 * 60))
		description += penaltyGameMinutesDiference < 45 ? `**Penal** ${rtf1.format(60 - penaltyGameMinutesDiference, 'minutes')} estará disponible\n` : `**Penal** está disponible\n`
	}
	if(!preguntados.createdAt) description +=`**Preguntados** está disponible\n`
	if(preguntados.createdAt) {
		const preguntadosGameDateLastGame = new Date(preguntados.updatedAt)
		const today = new Date()
		const preguntadosGameMinutesDiference = Math.round(Math.abs(preguntadosGameDateLastGame.getTime() - today.getTime()) / (1000 * 60))
		description += preguntadosGameMinutesDiference < 30 ? `**Preguntados** ${rtf1.format(30 - preguntadosGameMinutesDiference, 'minutes')} estará disponible\n` : `**Preguntados** está disponible\n`
	}

	if(!blackjack.createdAt) description +=`**Blackjack** está disponible\n`
	if(blackjack.createdAt) {
		const blackjackGameDateLastGame = new Date(blackjack.updatedAt)
		const today = new Date()
		const blackjackGameMinutesDiference = Math.round(Math.abs(blackjackGameDateLastGame.getTime() - today.getTime()) / (1000 * 60))
		description += blackjackGameMinutesDiference < 45 ? `**Blackjack** ${rtf1.format(45 - blackjackGameMinutesDiference, 'minutes')} estará disponible\n` : `**Blackjack** está disponible\n`
	}

	const embeds = await ErrorEmbed(description, member)
	return { embeds }
} */