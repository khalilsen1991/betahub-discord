import { EmbedBuilder, GuildMember } from 'discord.js'
import { CreateEmbed } from './CreateEmbed'

const dangerColor = 16061717
const successColor = 970246
const warningColor = 16774400
const defaultColor = 13636607

export function ErrorEmbed(message: string, member: GuildMember): EmbedBuilder[] {
	try {
		const embedRaw = {
			author: {
				name: `${member.user.username}`,
				iconURL: `${member.displayAvatarURL()}` ? `${member.displayAvatarURL()}` : 'https://discord.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
			},
			description: message,
			color: dangerColor,
			timestamp: true
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function WarningEmbed(message: string, member: GuildMember): EmbedBuilder[] {
	try {
		const embedRaw = {
			author: {
				name: `${member.user.username}`,
				iconURL: `${member.displayAvatarURL()}` ? `${member.displayAvatarURL()}` : 'https://discord.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
			},
			description: message,
			color: warningColor,
			timestamp: true
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SuccessfullyEmbed(message: string, member: GuildMember): EmbedBuilder[] {
	try {
		const embedRaw = {
			author: {
				name: `${member.user.username}`,
				iconURL: `${member.displayAvatarURL()}` ? `${member.displayAvatarURL()}` : 'https://discord.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
			},
			description: message,
			color: successColor,
			timestamp: true
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}


export function SendTipoDeLiderEmbed(): EmbedBuilder[] {
	try {
		const embedRaw = {
			title: "Descubre tu liderazgo",
			description: "En esta travesía, tu relación con B-024 será fundamental.  Tú serás quien entrene a B-024 en el camino de la seguridad digital. Por eso, cada decisión que tomes es importante.\n\nComo guía, tu tarea no sólo será enseñar a B-024 a identificar y resolver problemas, sino también desarrollar tu propio ingenio y pensamiento crítico.\n\n **💡 Cada uno de nosotros tiene una forma de enseñar y aprender. Reacciona a este mensaje según el estilo que elijas.**\n\n### 1) Artista rebelde 🎨\n\n### 2) Hacker audaz 🔍 \n\n### 3) Líder estratega 🧩",
			color: 15526925
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendArtistHackerOrLiderEmbed(messageType: string): EmbedBuilder[] {
	try {
		const embedRaw: { [key: string]: { title: string; description: string; color: number} } ={
			artista: {
				title: "ARTISTA REBELDE:",
				description: "**¡Piensa fuera de la caja!** La creatividad es esencial para encontrar soluciones innovadoras. Ahora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪",
				color: 15526925
			},
			hacker: {
				title: "HACKER AUDAZ:",
				description: "**¡Los detalles hacen la diferencia!** La precisión y la astucia son esenciales para estar siempre un paso adelante.\nAhora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪",
				color: 15526925
			},
			lider: {
				title: "LIDER ESTRATEGA:",
				description: "**¡Con metas claras, el camino se despeja!**  La visión y la estrategia son esenciales para llevar adelante todo proyecto.\n\nAhora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪",
				color: 15526925
			}
		}
		const embedProccessingPayment = CreateEmbed(embedRaw[messageType])
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendEndMissionEmbed(): EmbedBuilder[] {
	try {
		const embedRaw = {
			title: "Misión cumplida",
			description: "¡Perfecto! Recibirás tus puntos en la plataforma en breve. **Ahora regresa para avanzar con la siguiente misión: https://fitchin.gg/communities/mundo-beta/challenges**",
			color: successColor
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendMissionOneEmbed(): EmbedBuilder[] {
	try {
		const embedRaw = {
			description: "Es genial que estés aquí 🙌 ¡Empecemos!\n¿Qué te gustaría encontrar en este curso? 🤔",
			color: warningColor
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendMissionFourEmbed(): EmbedBuilder[] {
	try {
		const embedRaw = {
			description: "¿Empezamos la misión 4? 😊",
			color: warningColor
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendMissionSixEmbed(): EmbedBuilder[] {
	try {
		const embedRaw = {
			description: "¡Wow! Misión número 6 🙌 \n\n¿Vamos?",
			color: warningColor
		}
		const embedProccessingPayment = CreateEmbed(embedRaw)
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}

export function SendEndMissionEmbedWithPoints(messageType: string): EmbedBuilder[] {
	try {
		const embedRaw: { [key: string]: { title?: string; description: string; color: number, image?: string} } = {
			malicioso: {
				description: `En esta misión, debes enseñarle a B-024 a detectar y evitar enlaces maliciosos, una de las formas más comunes de ciberataques. A través de una serie de desafíos, guiarás a B-024 para que tome recaudos para no caer en manos de los cibercriminales. Recuerda que aprende a partir de tus respuestas.\n\n**¿CÓMO NOS ENGAÑAN? **\nLos enlaces maliciosos son muy peligrosos porque al hacer clic en ellos, pueden instalar virus en tu dispositivo sin que te des cuenta. Estos virus pueden robar tu información personal, como contraseñas y datos bancarios, o incluso bloquear tu dispositivo hasta que pagues un rescate. Además, algunos enlaces te llevan a sitios falsos que imitan páginas reales para robar tus datos. ¡Ten cuidado y no hagas clic en enlaces sospechosos!\n\n**¿En qué equipo te encuentras tú? Responde con el emoji.**\n### A. Conozco a alguien a quien le robaron datos. 👹\n### B. Me han robado datos. ☠️`,
				color: 15526925
			},
			detector: {
				description: "B-024 debe aprender qué herramientas existen para detectar enlaces sospechosos y cómo usarlas de forma segura.\n### https://transparencyreport.google.com/safe-browsing/search?hl=es \n\n**¿Cuál crees que es la mejor manera de analizar un enlace que te llegó en un mail de promoción? Responde con la opcion que corresponda.** \n\na. Haces click en el botón COMPRAR, abres la página, copias el enlace desde el navegador y lo analizas.\nb. Copias la url del botón COMPRAR con el botón derecho del mouse y lo pegas en los sitios de verificación.\nc. Abres el enlace en una ventana nueva y verificas su contenido en los sitios que te dimos arriba.\nd. Ignoras el enlace y borras el correo o mensaje que lo contiene.",
				image: 'https://imgur.com/YMP5A7M.png',
				color: 16774400
			},
			seguro: {
				title: "✅LINK CORRECTO ✅",
				description: "**¡Excelente!** La clave está en `no hacer clic directamente en los botones de las imágenes.`\n\nCon cada misión completada, estás ayudando a B-024 a convertirse en una poderosa herramienta de defensa cibernética, capaz de proteger a millones de personas en el mundo digital.\n\n**¡Sigue así, guardián cibernético!**",
				color: 16774400
			},
			virus: {
				title: "❌ LINK VIRUS ❌" ,
				description: "**¡Si no compruebas el enlace antes de hacer clic, podrías caer en la trampa de los estafadores! ¿Y qué pasaría si borras un mensaje que fuera legítimo y tuviera una buena promoción?**\n\n**¡Seguro que estarás más atento la próxima!** Habrá más chances para probar tus conocimientos del tema en la próxima misión.\n\nCon cada misión completada, estás ayudando a B-024 a convertirse en una poderosa herramienta de defensa cibernética, capaz de proteger a millones de personas en el mundo digital. \n**¡Sigue adelante, guardián cibernético!**",
				color: 16774400
			},
			experto: {
				title: "Solo para valientes",
				description: "**¿Cómo puede ser que 1 de cada 3 personas hayan caído en una estafa o hayan abierto un enlace malicioso?**\n\nParece que saber cómo evitar un enlace malicioso no es lo mismo que poder evitarlo.\n\nSi te tienes confianza, pon a prueba tus conocimientos con este **test de Google** que hará que pienses más de una vez si en realidad sabes detectarlos:\n### https://phishingquiz.withgoogle.com/\n\n### REGLAS \n\n❌ No uses tu nombre y mail reales. Sigue las instrucciones de la página: “Invéntate un nombre y un correo electrónico”\n✅ Asegúrate de que cliquear en `“MÁS INFORMACIÓN” `para avanzar en cada respuesta.\n\nCuando lo hayas hecho, y si eres de verdad valiente, reacciona con 💪 para acceder al canal en donde puedes publicar captura de pantalla de tus resultados.\n**¡Deja que la comunidad festeje tus logros!**",
				color: 16774400
			}
		}
		const embedProccessingPayment = CreateEmbed(embedRaw[messageType])
		return [embedProccessingPayment]
	} catch (e) {
		console.log(e)
		throw e
	}
}