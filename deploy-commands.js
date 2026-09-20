import 'dotenv/config'
import { REST, Routes } from 'discord.js'
import { commands } from './commands.js'

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('DISCORD_TOKEN en CLIENT_ID zijn verplicht. Zie .env.example.')
  process.exit(1)
}

const body = commands.map(command => command.data.toJSON())
const route = GUILD_ID
  ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
  : Routes.applicationCommands(CLIENT_ID)

const rest = new REST().setToken(DISCORD_TOKEN)

try {
  const data = await rest.put(route, { body })
  const scope = GUILD_ID ? `server ${GUILD_ID}` : 'globaal (kan een uur duren)'
  console.log(`${data.length} commando's geregistreerd: ${scope}`)
} catch (error) {
  console.error('Registreren mislukt:', error)
  process.exit(1)
}
