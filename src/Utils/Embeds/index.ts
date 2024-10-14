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
			description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\nEn esta travesía, tu relación con B-024 será fundamental.  Tú serás quien entrene a B-024 en el camino de la seguridad digital. Por eso, cada decisión que tomes es importante.\n\nComo guía, tu tarea no sólo será enseñar a B-024 a identificar y resolver problemas, sino también desarrollar tu propio ingenio y pensamiento crítico.\n\n **💡 Cada uno de nosotros tiene una forma de enseñar y aprender. Reacciona a este mensaje según el estilo que elijas.**\n\n### 1) Artista rebelde 🎨\n\n### 2) Hacker audaz 🔍 \n\n### 3) Líder estratega 🧩\n\n### :flag_br:\nNessa aventura, a sua relação com B-024 será fundamental. Será você quem vai treinar B-024 no caminho da segurança digital. Por isso, cada decisão tomada será importante.\n\nComo guia, sua tarefa não será apenas ensinar ao B-024 a identificar e resolver problemas, mas também desenvolver seu pensamento crítico e sua própria capacidade de resolver problemas.\n**💡 Cada um de nós tem uma forma de ensinar e aprender. Reaja a esta mensagem segundo o seu estilo.**\n\n### 1) Artista rebelde🎨\n\n###  2) Hacker destemido🔍\n\n### 3) Líder estratégico🧩",
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
				description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\n**¡Piensa fuera de la caja!** La creatividad es esencial para encontrar soluciones innovadoras. Ahora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪\n### :flag_br:\n\n**Pensando fora da caixa!** A criatividade é essencial para encontrar soluções inovadoras. Agora você poderá continuar na aventura, avançando para as próximas missões. Vamos nessa!💪",
				color: 15526925
			},
			hacker: {
				title: "HACKER AUDAZ:",
				description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\n**¡Los detalles hacen la diferencia!** La precisión y la astucia son esenciales para estar siempre un paso adelante.\nAhora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪\n### :flag_br:\n\n**Os detalhes fazem a diferença!** A precisão e a sagacidade são essenciais para estar sempre um passo à frente. Agora você poderá continuar na aventura, avançando para as próximas missões. Vamos nessa!.💪",
				color: 15526925
			},
			lider: {
				title: "LIDER ESTRATEGA:",
				description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\n**¡Con metas claras, el camino se despeja!**  La visión y la estrategia son esenciales para llevar adelante todo proyecto.\n\nAhora podrás continuar en la aventura, avanzando a las siguientes misiones. ¡Vamos!💪\n### :flag_br:\n\n**Com metas claras, o caminho se revela!** A visão e a estratégia são essenciais para levar adiante qualquer projeto. Agora você poderá continuar na aventura, avançando para as próximas missões. Vamos nessa!.💪",
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
			description: ":flag_es: ¡Perfecto! Recibirás tus puntos en la plataforma en breve. **Ahora regresa para avanzar con la siguiente misión: https://fitchin.gg/communities/mundo-beta/challenges ** \n\n:flag_br: Ótimo! Você receberá seus pontos dessa missão daqui a pouco. **Agora volte à plataforma para avançar com a seguinte missão: https://fitchin.gg/communities/mundo-beta/challenges **",
			color: 15526925
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
				description: ` ### :flag_es: [Em português 🇧🇷 abaixo]\n\nEn esta misión, debes enseñarle a B-024 a detectar y evitar enlaces maliciosos, una de las formas más comunes de ciberataques. A través de una serie de desafíos, guiarás a B-024 para que tome recaudos para no caer en manos de los cibercriminales. Recuerda que aprende a partir de tus respuestas.\n\n**¿CÓMO NOS ENGAÑAN? **\nLos enlaces maliciosos son muy peligrosos porque al hacer clic en ellos, pueden instalar virus en tu dispositivo sin que te des cuenta. Estos virus pueden robar tu información personal, como contraseñas y datos bancarios, o incluso bloquear tu dispositivo hasta que pagues un rescate. Además, algunos enlaces te llevan a sitios falsos que imitan páginas reales para robar tus datos. ¡Ten cuidado y no hagas clic en enlaces sospechosos!\n\n**¿En qué equipo te encuentras tú? Responde con el emoji.**\n### A. Conozco a alguien a quien le robaron datos. 👹\n### B. Me han robado datos. ☠️\n\n### :flag_br:\n\nNesta missão, você deve ensinar ao B-024 como detectar e evitar links maliciosos, uma das formas mais comuns de ataques cibernéticos. Através de uma série de desafios, você guiará o B-024 para que tome precauções e não caia nas mãos de cibercriminosos. Lembre-se de que ele aprende com base nas suas respostas.\n\n**COMO NOS ENGANAM?**\nOs links maliciosos são muito perigosos porque, ao clicar neles, podem instalar vírus no seu dispositivo sem que você perceba. Esses vírus podem roubar suas informações pessoais, como senhas e dados bancários, ou até bloquear seu dispositivo até que você pague um resgate. Além disso, alguns links levam a sites falsos que imitam páginas reais para roubar seus dados. Tome cuidado e não clique em links suspeitos!				\n\n**Em qual equipe você está? Responda com o emoji.**\n### A. Conheço alguém que teve dados roubados. 👹\n### B. Já tive meus dados roubados. ☠️ `,
				color: 15526925
			},
			detector: {
				description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\nB-024 debe aprender qué herramientas existen para detectar enlaces sospechosos y cómo usarlas de forma segura.\n### https://transparencyreport.google.com/safe-browsing/search?hl=es \n\n**¿Cuál crees que es la mejor manera de analizar un enlace que te llegó en un mail de promoción? Responde con la opcion que corresponda.**\n\n### :flag_br:\nB-024 deve aprender quais ferramentas existem para detectar links suspeitos e como usá-las de forma segura.\n### https://transparencyreport.google.com/safe-browsing/search?hl=pt \n\n**Qual você acha que é a melhor maneira de analisar um link que você recebeu em um e-mail promocional? Responda com a opção apropriada.**",
				image: 'https://imgur.com/YMP5A7M.png',
				color: 16774400
			},
			seguro: {
				title: "✅LINK CORRECTO ✅",
				description: "### :flag_es: [Em português 🇧🇷 abaixo] \n**¡Excelente!** La clave está en `no hacer clic directamente en los botones de las imágenes.`\n\nCon cada misión completada, estás ayudando a B-024 a convertirse en una poderosa herramienta de defensa cibernética, capaz de proteger a millones de personas en el mundo digital.\n\n**¡Sigue así, guardián cibernético!**\n### :flag_br:\n**Excelente**! A chave está em `não clicar diretamente nos botões das imagens.`\n\nCom cada missão completada, você está ajudando o B-024 a se tornar uma poderosa ferramenta de defesa cibernética, capaz de proteger milhões de pessoas no mundo digital.\n\n**Continue assim, guardião cibernético!**",
				color: 16774400
			},
			virus: {
				title: "❌ LINK VIRUS ❌" ,
				description: "### :flag_es: [Em português 🇧🇷 abaixo] \n**¡Si no compruebas el enlace antes de hacer clic, podrías caer en la trampa de los estafadores! ¿Y qué pasaría si borras un mensaje que fuera legítimo y tuviera una buena promoción?**\n\n**¡Seguro que estarás más atento la próxima!** Habrá más chances para probar tus conocimientos del tema en la próxima misión.\n\nCon cada misión completada, estás ayudando a B-024 a convertirse en una poderosa herramienta de defensa cibernética, capaz de proteger a millones de personas en el mundo digital. \n**¡Sigue adelante, guardián cibernético!**\n### :flag_br:\n**Se você não verificar o link antes de clicar, pode cair na armadilha dos golpistas! E o que aconteceria se você apagasse uma mensagem legítima que tivesse uma boa promoção?**\n\n**Com certeza você estará mais atento da próxima vez! Haverá mais oportunidades para testar seus conhecimentos sobre o assunto na próxima missão.\n\nCom cada missão completada, você está ajudando o B-024 a se tornar uma poderosa ferramenta de defesa cibernética, capaz de proteger milhões de pessoas no mundo digital.**\n**Continue em frente, guardião cibernético!** ",
				color: 16774400
			},
			experto: {
				title: "Solo para valientes / Só para quem tem coragem",
				description: "### :flag_es: [Em português 🇧🇷 abaixo]\n\n**¿Cómo puede ser que 1 de cada 3 personas hayan caído en una estafa o hayan abierto un enlace malicioso?**\n\nParece que saber cómo evitar un enlace malicioso no es lo mismo que poder evitarlo.\n\nSi te tienes confianza, pon a prueba tus conocimientos con este **test de Google** que hará que pienses más de una vez si en realidad sabes detectarlos:\n### https://phishingquiz.withgoogle.com/\n\n### REGLAS \n\n❌ No uses tu nombre y mail reales. Sigue las instrucciones de la página: “Invéntate un nombre y un correo electrónico”\n✅ Asegúrate de que cliquear en `“MÁS INFORMACIÓN” `para avanzar en cada respuesta.\n\nCuando lo hayas hecho, y si eres de verdad valiente, reacciona con 💪 para acceder al canal en donde puedes publicar captura de pantalla de tus resultados.\n**¡Deja que la comunidad festeje tus logros!**\n\n### :flag_br:\n\n**Como pode ser que 1 em cada 3 pessoas tenha caído em um golpe ou aberto um link malicioso? **\n\nParece que saber como evitar um link malicioso não é o mesmo que de fato conseguir evitá-lo.\n\nSe você confia em si mesmo, teste seus conhecimentos com este teste do Google que fará você pensar duas vezes se realmente sabe detectá-los:\n### https://phishingquiz.withgoogle.com/\n\n### REGRAS\n❌ Não use seu nome e e-mail reais. Siga as instruções da página: \"Invente um nome e um e-mail\"\n✅ Certifique-se de clicar em \"MAIS INFORMAÇÕES\" para avançar em cada resposta.\n\nQuando você tiver terminado, e se for realmente corajoso, reaja acessando o canal onde pode publicar uma captura de tela de seus resultados.\n**Deixe que a comunidade celebre seus resultados.** ",
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