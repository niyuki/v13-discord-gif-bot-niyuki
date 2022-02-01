
const { Message, MessageEmbed } = require('discord.js')
const config = require('../../config.json')
module.exports = {
    name: 'staff',
    description: "Give user first Staff Role.",
    run : async(client, message) => {
        let array = config.developer

        if(!array.includes(message.author.id.toString())) {
            return message.react('❌')
        }

        const victim = message.mentions.members.first()
        if(!victim || victim.id === message.author.id || victim.roles.cache.get(config.rolelist.Staff)) return message.channel.send(new MessageEmbed().setTitle(await client.translate(`Dude, what is your intension?`, message)).setDescription(await client.translate(`${config.fun.crossemoji} I hope you know you how to do this? | .staff @User`)).setColor('4a0000')).then(x => x.delete({timeout: 7000}))

                let yes = new MessageEmbed().setTitle(await client.translate(`Are you sure you want to make ${victim.user.username} Staff?`, message)).setDescription(await client.translate(`${config.fun.tickemoji} Staff Roles has been succesfully given to User`, message)).setColor('0dfa3b')
                victim.roles.add(config.rolelist.Staff)
                message.channel.send({embeds: [yes]})
            
        
    }
}