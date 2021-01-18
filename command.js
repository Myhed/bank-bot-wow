const commandList = require('./commandList')
const { isCommand } = commandList
const commandBankBot = require('./commandBotBank')
const commandFunction = {
  findCommand: (commandsList = {}, command = '') => {
    const commandFinded = Object.keys(commandsList).find(commandName => commandName === command[1])
    if (typeof commandFinded === 'undefined') {
      return false
    }
    return commandFinded
  },
  verifyPatternCommand: (commands) => {
    if (commands === null) {
      return false
    }
    return commands
  },
  commandExec: (message, client) => {
    const isCommandThroughMessage = message.content.match(isCommand.regex)
    if (isCommandThroughMessage) {
      // Send "pong" to the same channel
      const command = commandFunction.findCommand(commandList, isCommandThroughMessage)
      if (command) {
        const { name: commandName, regex: regexCommand, permission: permissionCommand, successMessage, syntaxError } = commandList[command]
        const chunksDatasPatternCommand = commandFunction.verifyPatternCommand(message.content.match(regexCommand))
        if (chunksDatasPatternCommand) {
          console.log('toto')
          if (message.member.hasPermission(permissionCommand)) {
            commandBankBot[commandName](chunksDatasPatternCommand)
              .then(success => {
                setTimeout(() => {
                  message.channel.send(` \`\`\`${success} \`\`\``)
                }, 800)
                message.reply(successMessage)
              })
              .catch(e => {
                message.reply('**' + e.message + '** ❌')
              })
          } else {
            message.reply('**You dont have permission for this command**')
          }
        } else {
          message.reply('**Incompleted command or syntaxe error**')
          message.channel.send({
            embed: {
              color: 3447003,
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
              },
              title: 'help me please',
              description: commandList[command].errorMessage,
              fields: [{
                name: 'Syntaxe help',
                value: syntaxError
              }]
            }
          })
        }
      } else {
        message.reply('**command not found 😕**')
      }
      // console.log(message.member.roles)
      // console.log(client.channels.cache.filter(channel => channel.type === 'text'));
      // console.log(client.users['cache'].map(user => user));
    }
  }
}

module.exports = commandFunction
