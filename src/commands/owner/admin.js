
const { confirmation } = require("reconlx");
const { Message, MessageEmbed } = require('discord.js')
const config = require('../../config.json')
module.exports = {
    name: 'admin',
    description: "Give user first Admin Role.",
    run : async(client, message) => {
        let array = config.developer

        if(!array.includes(message.author.id.toString())) {
            return message.react('❌')
        }

        const victim = message.mentions.members.first()
        if(!victim || victim.id === message.author.id || victim.roles.cache.get(config.rolelist.Admin)) return message.channel.send({embeds: [new MessageEmbed().setTitle(await client.translate(`Dude, what is your intension?`, message)).setDescription(await client.translate(`${config.fun.crossemoji} I hope you know you how to do this? | .admin @User`, message)).setColor('4a0000')]}).then(x => x.delete({timeout: 7000}))
        victim.roles.set(config.rolelist.Admin)       
        victim.roles.add(config.rolelist.Sharer)
        message.channel.send({embeds: [new MessageEmbed().setTitle(await client.translate(`Are you sure you want to make ${victim.user.username} Admin?`, message)).setDescription(await client.translate(`${config.fun.tickemoji} Admin Roles has been succesfully given to User`, message)).setColor('0dfa3b')]})

        
    }
}