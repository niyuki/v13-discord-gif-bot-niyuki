const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'daily',
    cooldown:  60 * 60 * 24, //24h cooldown
    description: 'Claim your daily coins or you are stupid',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.channel.id !== config.channellist.botcommands) return
        const coins = Math.floor(Math.random() * 2000) + 1;

        message.channel.send(await client.translate(`You received ${config.fun.coinsemoji} **${coins}** coins today!  Make sure to come and claim it again tomorrow!`, message))
        client.add(message.author.id, coins);
    }
}