import { IntentsBitField, Partials } from "discord.js"

export const DiscordConfig = {
  partials: [ 
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Message, 
    Partials.Reaction, 
    Partials.ThreadMember,
    Partials.User 
  ],
  intents: [ 
    IntentsBitField.Flags.DirectMessageReactions,    
    IntentsBitField.Flags.DirectMessageTyping,    
    IntentsBitField.Flags.DirectMessages,    
    IntentsBitField.Flags.GuildEmojisAndStickers,    
    IntentsBitField.Flags.GuildInvites,    
    IntentsBitField.Flags.GuildMembers,   
    IntentsBitField.Flags.GuildMessageReactions,    
    IntentsBitField.Flags.GuildMessageTyping,    
    IntentsBitField.Flags.GuildMessages,    
    IntentsBitField.Flags.GuildModeration,    
    IntentsBitField.Flags.GuildWebhooks,    
    IntentsBitField.Flags.Guilds,    
    IntentsBitField.Flags.MessageContent    
  ]
}