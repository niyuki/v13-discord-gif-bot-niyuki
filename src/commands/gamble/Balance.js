const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'bal',
    aliases: ['balance','cash','money','coin','coins'],
    description: 'Check your balance',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member

        const bal = await client.bal(member.id);
        message.channel.send(member.toString() + await client.translate(` has right now ${config.fun.coinsemoji}** `, message)+ bal + "** coins. Uuuu").thenx( x=> x.delete({timeout:15000}))

    }
}