const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'work',
    cooldown: 1 * 60 * 60 * 2, //2 hour cooldown
    description: 'You wanna work huh? Slave go haha',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const jobss = config.fun.jobs;

        const jobIndex = Math.floor(Math.random() * jobss.length);
        const coins = Math.floor(Math.random() * 250) + 1;

        message.channel.send(await client.translate(`You worked as **${jobs[jobIndex]}** and earned ${config.fun.coinsemoji} **${coins}** coins!`, message))
        client.add(message.author.id, coins)
    }
}