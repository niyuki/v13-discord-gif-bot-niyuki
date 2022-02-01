const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'addstat',
    description: 'Adds stats to user.',
    usage:'.addstat <pp/gif> <stats> @User',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let array = config.developer

        if(!array.includes(message.author.id.toString())) {
            return message.react('❌')
        }

        const victim = message.mentions.members.first() || message.member

        if(isNaN(args[1])) return message.channel.send({embeds: [new MessageEmbed().setTimestamp().setFooter(config.embedFooter).setAuthor(victim.user.username, victim.user.avatarURL({dynamic: true})).setColor('4a0000').setDescription(await client.translate(`**No (Valid) number provided shhh. | Usage: .addstat <pp/gif> <stats> @User**`, message))]})
        
        if(args[0] === 'pp') {
            client.pp(victim.id, parseInt(args[1]), parseInt(args[1]))
        } else if(args[0] === 'gif') {
            client.gif(victim.id, parseInt(args[1]), parseInt(args[1]))
        } else {
            return message.channel.send({embeds: [new MessageEmbed().setTimestamp().setFooter(config.embedFooter).setAuthor(victim.user.username, victim.user.avatarURL({dynamic: true})).setColor('4a0000').setDescription(await client.translate(`**Please decide either pp or gif. | Usage: .addstat <pp/gif> <stats> @User**`, message))]})
        }

        message.channel.send({embeds: [new MessageEmbed().setTimestamp().setFooter(config.embedFooter).setAuthor(victim.user.username, victim.user.avatarURL({dynamic: true})).setColor(config.embedColor).setDescription(await client.translate(`Succesfully added ${config.fun.emoji} **${parseInt(args[1])}** stats to **${victim.user.tag}** 🥳`, message))]})
        
    }
}