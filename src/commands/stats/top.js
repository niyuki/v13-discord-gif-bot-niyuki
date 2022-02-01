const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'leaderboard',
    aliases: ['top','rich'],
    usage: '.top <coins/stat/pp/gif/invites>',
    description: 'Here you can see homeless people being richer than you.. Or are yu the richest?',
    cooldown: 1000 * 10,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let number = parseInt(args[1])
        if(!number) number = 10;
        if(args[0] === 'stat'|| args[0] === 'stats'|| args[0] === 'total') {
            const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.total(id);

                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(number);

        message.channel.send({embeds: [new MessageEmbed()
                .setTitle(` Top Stat Ranking in ${message.guild.name} `)
                .setDescription(
                    data.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ Total **${v.bal} Sharings**`
                    })
                )
                .setTimestamp()
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
            ]})}
        else if(args[0] === 'gif') {
            const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.gifcount(id);
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(number);

        message.channel.send({embeds: [new MessageEmbed()
                .setTitle(` Top Gif Ranking in ${message.guild.name} `)
                .setDescription(
                    data.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ **${v.bal} Shared Gifs**`
                    })
                )
                .setTimestamp()
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
            ]})}
        else if(args[0] === 'pp') {
            const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.ppcount(id);
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(number);

        message.channel.send({embeds: [new MessageEmbed()
                .setTitle(` Top PP Ranking in ${message.guild.name} `)
                .setDescription(
                    data.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ ** ${v.bal} Shared PPs**`
                    })
                )
                .setTimestamp()
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
            ]})}else if(args[0] === 'inv') {
            const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = (await client.regular(id) + await client.bonus(id))
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(number);

        message.channel.send({embeds: [new MessageEmbed()
                .setTitle(` Top Invite Ranking in ${message.guild.name} `)
                .setDescription(
                    data.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ ** ${v.bal} Invites**`
                    })
                )
                .setTimestamp()
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
            ]})}
        else if(!args[0] ||  args[0] === 'coins'|| args[0] === 'money'|| args[0] === 'cash') {
            const collection = new Collection();
    
            await Promise.all(
                message.guild.members.cache.map(async(member) => {
                    const id = member.id;
                    const bal = await client.bal(id);
                    return bal !== 0 ? collection.set(id, {
                        id,
                        bal,
                    })
                : null
                })
            );
    
            const data = collection.sort((a, b) => b.bal - a.bal).first(number);
    
            message.channel.send({embeds: [new MessageEmbed()
                    .setTitle(` Top Coins Ranking in ${message.guild.name} `)
                    .setDescription(
                        data.map((v, i) => {
                            return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ **${config.fun.coinsemoji} ${v.bal} coins**`
                        })
                    )
                    .setTimestamp()
                    .setColor(config.embedColor)
                    .setFooter(config.embedFooter)
                ]})}

    }
}