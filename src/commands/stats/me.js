const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'me',
    aliases: ['stat', 'stats'],
    description: 'Shows specified stats',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const victim = message.mentions.users.first() || client.users.cache.get(args[0]) || message.member;

        const total = await client.total(victim.id);
        const gifcount = await client.gifcount(victim.id);
        const ppcount = await client.ppcount(victim.id);
        const coins = await client.bal(victim.id);

        const regular = await client.regular(victim.id);
        const fake = await client.fake(victim.id);
        const bonus = await client.bonus(victim.id);
        const leave = await client.leave(victim.id);


        let statembed = new MessageEmbed()
            .setColor(config.embedColor)
            .setTimestamp()
            .setFooter(config.embedFooter)
            .setAuthor(`${victim.user.tag} (${victim.user.id})`, victim.user.avatarURL({dynamic: true}))
            .setThumbnail(victim.user.avatarURL({dynamic: true}))
            .setTitle(victim.user.username+' | '+await client.translate(` Stats`, message))
            .setDescription(await client.translate(
               ` \`\`\` \n> This User has sent ${total} gif/pp in total.\n - Exactly ${gifcount} gifs and ${ppcount} pps!\n\n> Also this User has currently ${coins} coins | To buy something with this type \`${config.prefix}shop\` \n\n Invite Stats: \n Regular Invites: ${regular} \n Fake Invites: ${fake} \n Bonus Invites: ${bonus} \n Number of Quits: ${leave} \`\`\` `
            , message))
        
        message.channel.send({embeds: [statembed]})
        message.react(config.fun.emoji)
    }
}