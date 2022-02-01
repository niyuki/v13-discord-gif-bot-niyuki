const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const afkschema = require('../../models/afkschema')


module.exports = {
    name: 'afk',
    aliases: [''],
    description: 'Get AFK',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["EMBED_LINKS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(config.mongooseConnectionString) {
            const content = args.join(" ") || 'I will brb just chill fam';
            let embed = new MessageEmbed()
                .setColor(message.member.displayColor)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            const data = await afkschema.findOne({ guild: message.guild.id, user: message.author.id })
            if(!data) {
                await new afkschema(
                     { guild: message.guild.id , user: message.author.id, reason: content }
                ).save()
                message.channel.send({embeds: [embed.setColor("BLURPLE").setDescription(await client.translate(`You have been set to afk\n\n`, message)+`\n**__Reason__:** \n \`${content}\` `)]})
            } else {
                await afkschema.findOneAndUpdate({
                    guild: message.guild.id,
                    user: message.author.id,
                    reason: content
                });
                message.channel.send({embeds: [embed.setDescription(await client.translate(`Your afk status has been updated!\n\n`, message)+` **__Reason__:** \n \`${content}\` `)]})
            }
        } else {
            message.reply({ content: await client.translate('Please enter mongopath to use afk mode!', message)})
        }   
    }
}