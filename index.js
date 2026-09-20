import 'dotenv/config'
import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js'
import { commandsByName } from './commands.js'

const { DISCORD_TOKEN, MICHAEL_EMOJI_ID } = process.env

if (!DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN ontbreekt. Kopieer .env.example naar .env.')
  process.exit(1)
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // Privileged: enable "Message Content Intent" in the developer portal,
    // otherwise the michael reaction never fires.
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

client.once(Events.ClientReady, readyClient => {
  console.log(`Ingelogd als ${readyClient.user.tag} (${readyClient.user.id})`)
  readyClient.user.setActivity('Meisjes', { type: 3 }) // 3 = Watching
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return

  const command = commandsByName.get(interaction.commandName)
  if (!command) {
    await interaction.reply({ content: 'He?', flags: MessageFlags.Ephemeral })
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(`Commando ${interaction.commandName} faalde:`, error)
    const response = { content: 'He?', flags: MessageFlags.Ephemeral }
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response).catch(() => {})
    } else {
      await interaction.reply(response).catch(() => {})
    }
  }
})

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return
  if (!MICHAEL_EMOJI_ID) return
  if (!/michael/i.test(message.content)) return

  const emoji = message.guild?.emojis.cache.get(MICHAEL_EMOJI_ID)
  if (!emoji) {
    console.warn(`Emoji ${MICHAEL_EMOJI_ID} bestaat niet op deze server.`)
    return
  }

  await message.react(emoji).catch(error => {
    console.error('Reageren mislukt:', error)
  })
})

client.login(DISCORD_TOKEN)
