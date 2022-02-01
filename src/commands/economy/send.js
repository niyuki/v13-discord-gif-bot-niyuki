const { Client, Message, MessageEmbed } = require('discord.js');
const { config } = require('../../config.json')

module.exports = {
    name: 'send',
    aliases: ['gift', 'transfer'],
    description: 'Send money to some people to gain flex huh',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.channel.id !== config.channellist.botcommands) return
 // .send @user 398293
        const receiver = message.mentions.users.first();
        if (!receiver) return message.reply(await client.translate("Please mention the user you want to transfer money!", message))

        const donateCoins = args[1];
        if (!donateCoins)
            return message.reply(
                await client.translate("Please specify how many coins to transfer! \`.send <@user> <coins>\`", message)
            );

        if(donateCoins==0){
                message.reply(await client.translate("You can not send 0 coins dum dum!", message));
                return;
        }else if(donateCoins<0){
                message.reply(await client.translate("Do you even know how coins work..??", message));
                return;
        }
        
        if (isNaN(donateCoins))
            return message.reply(await client.translate('I hope you know coins are numbers and not something else huh ', message));
        
            const donation = parseInt(donateCoins) 
        if(await client.bal(message.author.id) < donation) return message.reply(await client.translate('You do not have enough coins to donate dum dum', message))

        //client.rmv, client.add 

        await client.rmv(message.author.id, donation);
        await client.add(receiver.id, donation)

        message.channel.send(await client.translate(`**${receiver.username}** just received **${donation}** coins from **${message.author.username}**. ~~Please just don't get broke with this~~.. `, message))
    }
}