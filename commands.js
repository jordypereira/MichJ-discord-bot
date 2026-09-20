import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js'
import { fileURLToPath } from 'node:url'

const imageUrl = name => fileURLToPath(new URL(`./images/${name}`, import.meta.url))

const MICHAEL_IMAGES = ['MJ.png', 'michael.jpg', 'michael_v1.jpg'].map(name => ({
  name,
  path: imageUrl(name),
}))

const pickRandom = list => list[Math.floor(Math.random() * list.length)]

// "1 2 3", "1,2,3" and "1, 2,3" all parse to [1, 2, 3].
const parseNumbers = input =>
  input
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(parseFloat)

export const commands = [
  {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Vraag het aan Mich-J')
      .addStringOption(option =>
        option.setName('wat').setDescription('Waarover dan')
      ),
    execute: async interaction => {
      const what = interaction.options.getString('wat')
      await interaction.reply(
        what ? `Bhu jo, probeer es ${what} te googlen.` : 'Wa wilt ge weten G'
      )
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('multiply')
      .setDescription('Vermenigvuldig wat getallen')
      .addStringOption(option =>
        option
          .setName('getallen')
          .setDescription('Minstens twee getallen, gescheiden door spaties')
          .setRequired(true)
      ),
    execute: async interaction => {
      const numbers = parseNumbers(interaction.options.getString('getallen'))
      if (numbers.length < 2 || numbers.some(Number.isNaN)) {
        await interaction.reply('Shit das een moeilijke')
        return
      }
      const answer = numbers.reduce((total, value) => total * value, 1)
      await interaction.reply(`Ik denk ${answer}`)
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('add')
      .setDescription('Tel wat getallen op')
      .addStringOption(option =>
        option
          .setName('getallen')
          .setDescription('Minstens twee getallen, gescheiden door spaties')
          .setRequired(true)
      ),
    execute: async interaction => {
      const numbers = parseNumbers(interaction.options.getString('getallen'))
      if (numbers.length < 2 || numbers.some(Number.isNaN)) {
        await interaction.reply('Daarvoor ga ik nie tellen')
        return
      }
      const answer = numbers.reduce((total, value) => total + value, 0)
      await interaction.reply(`Pak dat het ${answer} is`)
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('wie')
      .setDescription('Wie is wie')
      .addStringOption(option =>
        option
          .setName('wat')
          .setDescription('Probeer es "is michael"')
          .setRequired(true)
      ),
    execute: async interaction => {
      const what = interaction.options.getString('wat').trim().toLowerCase()
      if (what !== 'is michael' && what !== 'michael') {
        await interaction.reply('Wie of wat maakt nie uit')
        return
      }
      const image = pickRandom(MICHAEL_IMAGES)
      const attachment = new AttachmentBuilder(image.path, { name: image.name })
      await interaction.reply({ files: [attachment] })
    },
  },
]

export const commandsByName = new Map(
  commands.map(command => [command.data.name, command])
)
