const { Client, Message, MessageEmbed} = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'server-info',
    description: "sends server info",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {

        const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle(config.fun.emoji+" **Server Information** "+ config.fun.emoji)
        .setColor(config.embedColor)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(`🎫 Name of server:`, message.guild.name, true)
        .addField(`🆔 ID of server`, message.guild.id, true)
        .addField(`👑 Owner of this server is`, await message.guild.fetchOwner({force: true}), true)  
        .addField(`🌎 Region of this server is`, message.guild.region, true)
        .addField(`👥 No. of Members`, message.guild.members.cache.size, true)
        .addField(`🤖 No. of Bots:`, message.guild.members.cache.filter(member => member.user.bot).size, true)
        .addField(`🚶 Weights:`, message.guild.members.cache.filter(member => !member.user.bot).size, true)
        .addField(`😗 Emojis:`, message.guild.emojis.cache.size, true)
        .addField(`👻 Animated Emoji\'s:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size,true )
        .addField(`💬 Total Text Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'text').size, true)
        .addField(`🎤 Total Voice Channels:`, message.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
        .addField(`👔 Total Amount of Roles:`, message.guild.roles.cache.size, true)
        .setAuthor(`${message.guild.name}`)
        message.channel.send({embeds: [embed]});  
    }
}