require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(client.user.id)

  client.user.setActivity('Meisjes', { type: 'WATCHING' })

  // Print Channel info
  // client.guilds.forEach(guild => {
  //   console.log(guild.name)
  //   guild.emojis.forEach(emoji => {
  //     console.log(`${emoji.name}'s id: ${emoji.id}`)
  //   })
  //   guild.channels.forEach(channel => {
  //     console.log(`- ${channel.name} ${channel.type} ${channel.id}`)
  //   })
  // })

  // Bot intro
  let generalChannel = client.channels.get('167348561871241216')
  // generalChannel.send(randomWelcomeMessage())
  // const attachment = new Discord.Attachment('./MJ.png')
  // generalChannel.send(attachment)
})

client.on('message', receivedMessage => {
  if (receivedMessage.author == client.user) return

  reactOnMichael(receivedMessage)

  if (receivedMessage.content.startsWith('!')) processCommand(receivedMessage)
})

const randomWelcomeMessage = () => {
  const messages = ['Ey meisjes wa make', 'Klaar om te plooien']
  const idx = Math.floor(Math.random() * messages.length)
  return messages[idx]
}

const reactOnMichael = receivedMessage => {
  if (
    receivedMessage.content.includes('michael') ||
    receivedMessage.content.includes('Michael')
  ) {
    try {
      const michaelFaceEmoji = '248852537116065792'
      receivedMessage.react(receivedMessage.guild.emojis.get(michaelFaceEmoji))
    } catch (error) {
      console.log("Emoji doesn't exist.")
    }
  }
}

const processCommand = receivedMessage => {
  const fullCommand = receivedMessage.content.substr(1)
  const splitCommand = fullCommand.split(' ')
  const primaryCommand = splitCommand.shift()

  if (primaryCommand == 'help') {
    helpCommand(splitCommand, receivedMessage)
  } else if (primaryCommand == 'multiply') {
    multiplyCommand(splitCommand, receivedMessage)
  } else if (primaryCommand == 'add') {
    addCommand(splitCommand, receivedMessage)
  } else if (primaryCommand == 'wie') {
    wieCommand(splitCommand, receivedMessage)
  } else {
    receivedMessage.channel.send('He?')
  }
}

const helpCommand = (args, receivedMessage) => {
  if (args.length === 0) {
    receivedMessage.channel.send('Wa wilt ge weten G')
  } else {
    receivedMessage.channel.send(`Bhu jo, probeer es ${args} te googlen.`)
  }
}

const multiplyCommand = (args, receivedMessage) => {
  if (args.length < 2) {
    receivedMessage.channel.send('Shit das een moeilijke')
    return
  }
  let answer = 1
  args.forEach(value => {
    answer = answer * parseFloat(value)
  })
  receivedMessage.channel.send('Ik denk ' + answer.toString())
}

const addCommand = (args, receivedMessage) => {
  if (args.length < 2) {
    receivedMessage.channel.send('Daarvoor ga ik nie tellen')
    return
  }
  let answer = 0
  args.forEach(value => {
    answer += parseFloat(value)
  })
  receivedMessage.channel.send(`Pak dat het ${answer.toString()} is`)
}

const wieCommand = (args, receivedMessage) => {
  if (args[0] == 'is' && (args[1] == 'michael' || args[1] == 'Michael')) {
    wieIsMichaelCommand(receivedMessage)
  }
}

const wieIsMichaelCommand = receivedMessage => {
  const images = [
    './images/MJ.png',
    './images/michael.jpg',
    './images/michael_v1.jpg',
  ]
  const idx = Math.floor(Math.random() * images.length)

  const m3 = new Discord.Attachment(images[idx])
  receivedMessage.channel.send(attachment)
}

client.login(process.env.APPLICATION_KEY)
