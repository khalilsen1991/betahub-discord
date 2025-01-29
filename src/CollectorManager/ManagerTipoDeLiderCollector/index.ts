import { ButtonInteraction, CacheType } from "discord.js";
import { ClientWithCommands, GuildDocument } from "../../types";

const rolesToAdd: Record<string, string> = {
  'Artista': '1258825880549986305',
  'Hacker': '1258825900334518423',
  'Líder': '1258825914851131492'
};

export const TipoDeLiderButtons = async (interaction: ButtonInteraction<CacheType>, client: ClientWithCommands, serverConfigs: GuildDocument) => {
  const member = interaction.guild!.members.cache.get(interaction.user.id)!
  for (const role in rolesToAdd) {
    if (interaction.customId.includes(role)) {
      if(member.roles.cache.has(rolesToAdd[role])) return interaction.reply({ content: `Elige otro emoji  / Escolha outro emoji`, ephemeral: true })
      member.roles.add(rolesToAdd[role]);
    }
  }
  interaction.reply({ content: `GENIAL :white_check_mark: Mira el canal que te aparece a la izquierda.\nÓTIMO :white_check_mark: Veja o canal que aparece à esquerda.`, ephemeral: true  })
}