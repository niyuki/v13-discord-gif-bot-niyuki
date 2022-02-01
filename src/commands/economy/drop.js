const { Client, Message, MessageEmbed } = require('discord.js');
const { config } = require('../../config.json')

module.exports = {
    name: 'drop',
    aliases: [''],
    description: 'Drop your money to let random people pick it up :flushed:',
    cooldown:  50,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        const dropchannel = message.mentions.channels.first() || message.channel;

        const coinsAmount = args[1] || args[0];
        if(!coinsAmount) return message.reply(await client.translate('Please state an amount of coins to drop!', message));

        if(await client.bal(message.author.id) < coinsAmount) return message.reply(await client.translate('I think you do not have that much money to bet do you? <:PandaScared:836210378287480862>', message));

        if(coinsAmount==0){
			message.reply(await client.translate("You can not drop 0 dum dum!", message));
			return;
		}else if(coinsAmount<0){
			message.reply(await client.translate("Do you even know how coins works..??", message));
			return;
		}

        const filter = (msg) => 
            msg.guild.id === message.guild.id && msg.content === `${prefix}claim`;
            message.channel.send(await client.translate('Your drop has been packaged and shipped to ', message) + dropchannel.toString())
            dropchannel.send(await client.translate(`Fear the drops! Use \`${config.prefix}claim\` to claim this amount of coins`, message))
        dropchannel.awaitMessages({filter, max: 1, time: 60000 })
            .then(async(msg) => {
                const id = msg.first().author.id;
                const claimedCoins = parseInt(coinsAmount);

                client.rmv(message.member.id, claimedCoins)
                client.add(id, claimedCoins);
                msg.first().reply(await client.translate(`Nice one! **${msg.first().author.username}** has claimed ${config.fun.coinsemoji}** `, message) + claimedCoins + " **coins!")
            })
    }
}