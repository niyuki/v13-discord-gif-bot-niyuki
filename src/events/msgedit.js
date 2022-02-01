const client = require('../index')
const Data = require('../models/editmsg')
const CronJob = require('cron').CronJob
const { MessageButton, MessageActionRow, MessageEmbed,Collection } = require('discord.js')
const moment = require('moment')
const config = require('../config.json')
client.on('ready', async() => {
    console.log('cronjob0')
    new CronJob('*/5 * * * *', async function() {
        Data.find({ }, async(err, res) => {
            if(err) throw err;
            if(!res || res == null) return;
            let messagetoedit = await client.channels.cache.get(res[0].channelid).messages.fetch(res[0].msgid)
            if(!messagetoedit) return console.log(await client.translate('Could not find message to edit'))
            const guild = client.guilds.cache.get(client.config.guildId)
            const userpp = new MessageButton().setEmoji('798272075545575454').setStyle('PRIMARY').setLabel(await client.translate('User PP Info')).setCustomId('userpp')
            const usergif = new MessageButton().setEmoji('798272075545575454').setStyle('PRIMARY').setLabel(await client.translate('User Gif Info')).setCustomId('usergif')
            const usertotal = new MessageButton().setEmoji('798272075545575454').setStyle('PRIMARY').setLabel(await client.translate('User Total Info')).setCustomId('usertotal')
            const usercoins = new MessageButton().setEmoji('798272075545575454').setStyle('PRIMARY').setLabel(await client.translate('User Coins Info')).setCustomId('usercoins')
            //top total
            const collectiontotal = new Collection();

        await Promise.all(
            guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.total(id);

                return bal !== 0 ? collectiontotal.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const datatotal = collectiontotal.sort((a, b) => b.bal - a.bal).first(5);
            //top gif
            const collectiongif = new Collection();

        await Promise.all(
            guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.gifcount(id);

                return bal !== 0 ? collectiongif.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const datagif = collectiongif.sort((a, b) => b.bal - a.bal).first(5);

//toppp
const collectionpp = new Collection();

        await Promise.all(
            guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.ppcount(id);

                return bal !== 0 ? collectionpp.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const datapp = collectionpp.sort((a, b) => b.bal - a.bal).first(5);
        //topcoins
        const collectionbal = new Collection();

        await Promise.all(
            guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id);

                return bal !== 0 ? collectionbal.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const databal = collectionbal.sort((a, b) => b.bal - a.bal).first(5);
        //top invite
        const collectioninv = new Collection();

        await Promise.all(
            guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = (await client.regular(id) + await client.bonus(id))
                return bal !== 0 ? collectioninv.set(id, {
                    id,
                    bal,
                })
            : null
            })
        );

        const datainv = collectioninv.sort((a, b) => b.bal - a.bal).first(5);
        //
        //const nomsg = await client.translate('No data found for this ranking')
let BoosterMember =  guild.members.cache.filter(a => a.premiumSince).size || 0 // Booster Rol ID
            var TotalMember = guild.memberCount
                   var Online = guild.members.cache.filter(off => off.presence !== null).size;
                   var Boost = guild.premiumSubscriptionCount;
                   var BoostLevel = guild.premiumTier;
                   ;
                  const topp = await client.translate(`▫️ In this server there are currently ${TotalMember} **total members**.\n▫️ In this server there are currently ${Online} **online members**.\n\n${client.config.fun.emoji} **Boost Status** ${client.config.fun.emoji}\n▫️ This server has right now ${Boost} **amount of server nitro-boosts**.\n▫️ This server reached ${BoostLevel} **server nitro-boost level**.\n▫️ Among the members here there are ${BoosterMember} **server nitro-boosting members**.`)
                  
                  const top1 = `
                  ${datatotal? datatotal.map((v, i) => {
                    return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ Total **${v.bal}**\n`
                    }): nomsg}\n`

                    const top2 = `
                  ${datagif? datagif.map((v, i) => {
                    return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ **${v.bal} GIF**\n`
                }): nomsg}\n`
                
                const top3 = `
                ${datapp ? datapp.map((v, i) => {
                    return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ ** ${v.bal} PP**\n`
                }): nomsg}\n`

                const top4 = `
                    ${databal ? databal.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ **${config.fun.coinsemoji} ${v.bal} Coins**\n`
                    }): nomsg}\n`

                    const top5 = `
                    ${datainv ? datainv.map((v, i) => {
                        return ` \`${i+1})\` **${client.users.cache.get(v.id).tag}** ➢ ** ${v.bal} Invites**\n`
                    }): nomsg}
                  `
            messagetoedit.edit({
                content: 'OwO',
                embeds: [
                    new MessageEmbed()
                        .setTitle(client.config.fun.emoji+` ${guild.name} `+client.config.fun.emoji)
                        .setDescription(`Feel free to see your own stats by clicking on the buttons below..`)
                        .setFields([
                            { name: `${client.config.fun.emoji} **Server Status** ${client.config.fun.emoji}`, value: topp},
                            { name: `${client.config.fun.emoji} **Authorities** ${client.config.fun.emoji}`, value: `__**Admins:**__\n${guild.members.cache.filter(a => !a.user.bot && config.rolelist.Admin.some(b => a.roles.cache.get(b))).map(a => a).join(", ")}\n\n**__Moderators:__**\n${guild.members.cache.filter(a => !a.user.bot &&config.rolelist.Moderator.some(b => a.roles.cache.get(b))).map(a => a).join(", ")}\n\n__**Staff:**__\n${guild.members.cache.filter(a => !a.user.bot &&config.rolelist.Staff.some(b => a.roles.cache.get(b))).map(a => a).join(", ")}`},
                            { name: `${client.config.fun.emoji} **Top Total Ranks** ${client.config.fun.emoji}`, value:top1},
                            { name: `${client.config.fun.emoji} **Top GIF Ranks** ${client.config.fun.emoji}`, value:top2},
                            { name: `${client.config.fun.emoji} **Top PP Ranks** ${client.config.fun.emoji}`, value:top3},
                            { name: `${client.config.fun.emoji} **Top Coins Ranks** ${client.config.fun.emoji}`, value:top4},
                            { name: `${client.config.fun.emoji} **Top Invite Ranks** ${client.config.fun.emoji}`, value:top5},
                        ])
                        .setThumbnail(guild.iconURL({dynamic:true}))
                        .setColor(client.config.embedColor)
                        .setFooter({text: client.config.embedFooter, iconURL: client.user.avatarURL()})
                        .setTimestamp()
                ],
                components: [
                    new MessageActionRow()
                        .addComponents([
                            userpp,
                            usergif,
                            usertotal,
                            usercoins
                        ])
                ]
            })

        })
    } ).start()
})