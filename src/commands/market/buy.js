const { Client, Message, MessageEmbed } = require('discord.js');
const items = require('../../market');
const config = require('../../config.json')
const moment = require('moment')
const ms = require('ms')
const data = require('../../models/role')
module.exports = {
    name: 'buy',
    description: 'Just buy something cool to gain swag huh',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const buyItem = args[0];
        if(!buyItem) return message.channel.send(await client.translate("Please specify that item you want to buy! Example: ", message)+'\`.buy VC1\`')

        const validItem = !!items.find(
            (val) => val.item === buyItem
        ) 
        console.log(validItem)
        const priceItem = 
        items.find((val) => val.item === buyItem).price 
        const idItem = 
        items.find((val) => val.item === buyItem).id
        const nameItem = 
        items.find((val) => val.item === buyItem).item


        
        const balanceUser = await client.bal(message.author.id);
        if(balanceUser < priceItem) { message.reply(await client.translate(`
                You just have ${config.fun.coinsemoji} ${userBalance} coins and it's probably more expensive than your total coins. Else you go get more money or else you can buy that item for ${config.fun.coinsemoji} **${priceItem}** from the shop hm `
            , message));
        }

            message.channel.send({embeds: [new MessageEmbed().setColor(config.embedColor).setFooter(await client.translate(`Enjoy this until ${moment().add(7, 'd').format('LLLL')} UwU`, message)).setDescription(await client.translate(`**You** have just bought <@&${idItem}> \`${nameItem}\` for **${priceItem}** coins... Enjoy this until`, message)).setTimestamp()]})
            client.rmv(message.author.id, priceItem)
            message.member.roles.add(idItem)
            await new data({
                User: message.author.id,
                Role: idItem,
                Time: Date.now()+ms("7d")
            }).save()
    },
}