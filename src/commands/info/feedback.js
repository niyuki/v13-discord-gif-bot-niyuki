const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'feedback',
    aliases: ['feed-back'],
    usage: '.feedback [your report here]. Thanks for your valuable feedback',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let feedback = args.join(" ").slice(0);
        if(!feedback) return message.reply('why do u play with my heart :sob:')
        let user = message.author.username;
        let uid = message.author.id;
        let guild = message.guild.name;
        let gid = message.guild.id;
        let channel = client.channels.cache.get(config.channellist.feedbacklog)
        let embed = new Discord.MessageEmbed()
        .setTitle(`Feedback Report in ${client.guilds.cache.get(config.guildid).name}`)
        .addField("Feedback", feedback)
        .addField("Feedback By", user)
        .addField("Feedback User ID", uid)
        .addField("Feedback Server Name ", guild)
        .addField("Feedback Server ID", gid)
        .setColor(config.embedColor)
        .setTimestamp()
        .setFooter(await client.translate("New Feedback Found", message))
        
        message.reply(await client.translate(`**❤️ Your Feedback has been reported in ${channel}. Thanks for the valuable feedback thanks for supporting us.**`, message))
        channel.send({embeds: [embed]}).then(i => i.react("💖"))       
    }
}