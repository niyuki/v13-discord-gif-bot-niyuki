const client = require('../index')
const config = require('../config.json')
var CronJob = require('cron').CronJob;
client.on('ready', async () => {
    new CronJob('0 0 * * 0', async function () {
        let serverid = config.guildId
        let onem = config.rolelist.oneMonth 
        let twom = config.rolelist.twoMonths
        let threem = config.rolelist.threeMonths
        let sixm = config.rolelist.sixMonths 
        let ninem = config.rolelist.nineMonths 
        let oney = config.rolelist.oneYear 
        let twoy = config.rolelist.twoYears 

        const server = client.guilds.cache.get(serverid);
        server.members.cache.forEach(async member => {
            if (member.id === '730448609790787585') return;
            if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365 * 2 && !member.roles.cache.get(twoy)) {
                server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`).setDescription(await client.translate(`${member}, named user stayed in this server for about **2 Years** so he deserves <@&${twoy}> role!`)).setColor(member.displayHexColor))
                member.roles.add(twoy)
                member.roles.remove(oney)
                member.roles.remove(ninem)
                member.roles.remove(onem)
                member.roles.remove(twom)
                member.roles.remove(threem)
                member.roles.remove(sixm)

                return;
            } else
                if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365 && !member.roles.cache.get(oney)) {
                    server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`).setDescription(await client.translate(`${member}, named user stayed in this server for about **1 Year** so he deserves <@&${oney}> role!`)).setColor(member.displayHexColor))
                    member.roles.add(oney)
                    member.roles.remove(ninem)
                    member.roles.remove(onem)
                    member.roles.remove(twom)
                    member.roles.remove(threem)
                    member.roles.remove(sixm)

                    return;
                } else
                    if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270 && !member.roles.cache.get(ninem)) {
                        server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setDescription(await client.translate(`${member}, named user stayed in this server for about **9 Months** so he deserves <@&${ninem}> role!`)).setColor(member.displayHexColor).setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`))
                        member.roles.add(ninem)
                        member.roles.remove(sixm)
                        member.roles.remove(onem)
                        member.roles.remove(twom)
                        member.roles.remove(threem)

                        return;
                    } else
                        if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180 && !member.roles.cache.get(sixm)) {
                            server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setDescription(await client.translate(`${member}, named user stayed in this server for about **6 Months** so he deserves <@&${sixm}> role!`)).setColor(member.displayHexColor).setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`))
                            member.roles.add(sixm)
                            member.roles.remove(threem)
                            member.roles.remove(onem)
                            member.roles.remove(twom)

                            return;
                        } else
                            if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90 && !member.roles.cache.get(threem)) {
                                server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setDescription(await client.translate(`${member}, named user stayed in this server for about **3 Months** so he deserves <@&${threem}> role!`)).setColor(member.displayHexColor).setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`))
                                member.roles.add(threem)
                                member.roles.remove(twom)
                                member.roles.remove(onem)

                                return;
                            } else
                                if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 60 && !member.roles.cache.get(twom)) {
                                    server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setDescription(await client.translate(`${member}, named user stayed in this server for about **2 Months** so he deserves <@&${twom}> role!`)).setColor(member.displayHexColor).setTitle(`${config.emoji.fun} ${server.name} ${config.emoji.fun}`))
                                    member.roles.add(twom)
                                    member.roles.remove(onem)
                                    return;
                                } else
                                    if (Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30 && !member.roles.cache.get(onem)) {
                                        server.channels.cache.get(config.channellist.monthsLog).send(new Discord.MessageEmbed().setDescription(await client.translate(`${member}, named user stayed in this server for about **1 Month** so he deserves <@&${onem}> role!`)).setColor(member.displayHexColor))
                                        member.roles.add(onem)
                                        return;
                                    }




        })
    }).start()
})