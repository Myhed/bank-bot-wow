'use strict'

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js')
// const commandList = require('./commandList')
const { commandExec } = require('./command')
// Create an instance of a Discord client
const client = new Discord.Client()
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */

client.on('ready', () => {
  console.log('I am ready!')
  // console.log(client.channels.cache.filter(channel => channel.name === 'banques'))
  // const users = client.users.cache
  //   .filter(user => user.username === 'Nylasdan')
  //   .map(user => user)
  // users[0].createDM().then(dmChannel => {
  //   dmChannel.send(`Salutation voyager, je serai à ton service pour t'aider à mieux gérer la banque de guilde 😀 ! en attendant que mes fonctionnalités se développent, je te dis à bientôt !`);
  // });
})

client.on('message', message => {
  // console.log(message.guild.channels.cache.fetchMessage())
  // console.log(message.guild.roles)
  // message.delete(message.embeds)
  commandExec(message, client)
})

client.on('messageReactionAdd', (messageReaction) => {
  // console.log(messageReaction.emoji)
})

client.on('messageReactionRemove', () => {
  console.log('message Reaction removed')
})

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NzMwNTIzNjQ4Mzk3NDEwMzA1.XwY0RA.U61gE062RgL8WMfs93b5rv6UkjI')
