# Mich-J Discord Bot

Discord bot for the Betere-kanaal channel.

Rewritten on **discord.js v14** (2026). The original v11 version could no longer
connect: Discord decommissioned gateway v6, and v11 predates the Gateway Intents
that became mandatory in 2020. The `!` prefix commands are now slash commands,
since reading arbitrary message content needs a privileged intent.

## Commands

| Command | Response |
|---|---|
| `/help` | "Wa wilt ge weten G" |
| `/help wat:<iets>` | "Bhu jo, probeer es \<iets\> te googlen." |
| `/add getallen:<a b c>` | "Pak dat het \<som\> is", or "Daarvoor ga ik nie tellen" under two getallen |
| `/multiply getallen:<a b c>` | "Ik denk \<product\>", or "Shit das een moeilijke" under two getallen |
| `/wie wat:is michael` | A random one of the three images |
| `/wie wat:<iets anders>` | "Wie of wat maakt nie uit" |

Mich-J also reacts with a custom emoji to any message containing "michael",
and sets its activity to *Watching Meisjes* on startup.

## Set up a Discord application

- Go to https://discord.com/developers/applications and create an application
- **General Information** → copy the Application ID → `CLIENT_ID`
- **Bot** → Reset Token → copy it → `DISCORD_TOKEN` (never commit this)
- **Bot** → Privileged Gateway Intents → enable **Message Content Intent**
  (only needed for the michael reaction; slash commands work without it)
- **OAuth2 → URL Generator** → scopes `bot` + `applications.commands`,
  permissions: Send Messages, Attach Files, Add Reactions, Read Message History
- Open the generated URL and add the bot to your server

## Run locally

```bash
git clone https://github.com/jordypereira/MichJ-discord-bot.git
cd MichJ-discord-bot
cp .env.example .env    # then fill it in
npm install
npm run deploy          # registers the slash commands, rerun when they change
npm start               # or: npm run dev, which restarts on file changes
```

Set `GUILD_ID` in `.env` to register commands in one server (instant, best for
testing). Leave it empty to register globally, which can take up to an hour to
propagate.

`MICHAEL_EMOJI_ID` is optional — the reaction is skipped when it is empty. To
find it, type `\:emojiname:` in Discord and copy the number out of
`<:name:123456789>`. The emoji must live on the same server.

## Layout

| File | Purpose |
|---|---|
| `index.js` | Client, intents, event handlers |
| `commands.js` | Command definitions and their responses |
| `deploy-commands.js` | Registers the slash commands with Discord |
| `images/` | MJ.png, michael.jpg, michael_v1.jpg |
