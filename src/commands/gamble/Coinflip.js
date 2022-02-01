const { Client, Message, MessageEmbed } = require('discord.js');
const random = require('random-number-csprng');
const config = require('../../config.json')
let heads = config.fun.headsemoji;
let tails = config.fun.tailsemoji;
let spin = config.fun.spinemoji
module.exports = {
    name: 'coinflip',
    aliases: ['don','double','cf', 'double-or-nothing'],
    description: 'Risk your money like in coinflips but I can not promise you will get richer xd. \` <are must> {are optional}  \`',
    usage: '. coinflip <betamount/all> {heads/tails}',
    cooldown: 1000 * 7,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let moneyhelp = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(`❌ Specify an amount to gamble! `, message)+`| \`coinflip <betamount/all> (heads/tails)\``)

        let moneyno = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(`❌ You don't have even one coin noob xd`, message))

        let cf0 = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(`❌ You can not coinflip 0 dum dum!`, message))

        let cfminus = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate("❌ Do you even know how money works..", message))

        let choiceundefined = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate("❌ Specify if you choose `heads` or `tails`!", message))

        let betmax = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate("❌ You can only bet a maximum of 50000 coins. I mean if you have so much", message))

        
        let moneymore = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate('❌ I think you do not have that much money to bet do you?', message))


        //betcheck
        let bet = args[0];
        if(!args[0]) return message.channel.send({embeds: [moneyhelp]}).then(x => x.delete ({ timeout: 5000}))
        arg1 = args[0];
		if(Number === args[0]){
			bet = parseInt(args[0]);		
		}
        if(bet=="all") bet = 50000 || await client.bal(message.author.id)

			if (bet > 50000) {
                message.channel.send({embeds: [betmax]}).then(x => x.delete ({ timeout: 5000}))
				return;
			} else if (bet==0) {
                message.channel.send({embeds: [cf0]}).then(x => x.delete ({ timeout: 5000}))
				return;
			} else if (bet<0){
                message.channel.send({embeds: [cfminus]}).then(x => x.delete ({ timeout: 5000}))
				return;
            }

        //Get user choice
		let choice = 'h';
		if(arg1!=undefined || args[1]!=undefined)
			arg1 = args[1];
		if(arg1=='heads'||arg1=='h'||arg1=='head')
			choice = 'h';
		else if(arg1=='tails'||arg1=='t'||arg1=='tail')
			choice = 't';

        //Final syntax check

        if(await client.bal(message.author.id)==0) {
            message.channel.send({embeds: [moneyno]}).then(x => x.delete ({ timeout: 5000}))
        }
		if(bet==0){
			message.channel.send({embeds: [cf0]}).then(x => x.delete ({ timeout: 5000}))
			return;
		}else if(bet<0){
			message.channel.send({embeds: [cfminus]}).then(x => x.delete ({ timeout: 5000}))
			return;
		}else if(choice==undefined){
			message.channel.send({embeds: [choiceundefined]}).then(x => x.delete ({ timeout: 5000}))
			return;
		}




        if(bet > 50000) return message.channel.send({embeds: [betmax]}).then(x => x.delete ({ timeout: 5000}))
        
        if(await client.bal(message.author.id) < bet) return message.channel.send({embeds: [moneymore]}).then(x => x.delete ({ timeout: 5000}))

        let rand = await random(0,1);
        let win = false;
        //tails
        if(rand==0&&choice=="t")
            win = true;
        //heads
        else if(rand==1&&choice=="h")
            win = true;

            let cfgif = [
                "https://i.kym-cdn.com/photos/images/newsfeed/000/930/669/59e.gif",
                "https://steamuserimages-a.akamaihd.net/ugc/791987574362506744/A81A23AB9308CAD6F2B93728AF2B5A980829EBC2/",
                "https://image.myanimelist.net/ui/sefOExMnsDEhRAOFE2OLRfRw-X5yTWsrWkFiUf6zHQWPC8CZnS78kq4igEjPee9db9JPXbWjToTzHlMxJssKHQ",
                "https://steamuserimages-a.akamaihd.net/ugc/640994505189603226/BE02A27E8C405EFD71D93AECC5D490B4AFA8E81A/"
            ]
            const cfrandom = cfgif[Math.floor(Math.random() * cfgif.length)];
    
        let text =  new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(`**You** used ${config.fun.coinsemoji} **`+ bet +" ** and decided for "+((choice=='h')?"**heads**":"**tails**"+"..."))
        .setDescription("\n Your coin is flipping... "+((win)?((choice=='h')?heads:tails):((choice=='h')?tails:heads))+" and... \n")
        .setImage(cfrandom)
        let text2 = text;
        if(win) {
            const Winamount = bet * 2;
            text2 = new MessageEmbed()
            .setColor('0dfa3b')
            .setTitle(`**You** used ${config.fun.coinsemoji} **`+ bet +" ** and decided for "+((choice=='h')?"**heads**":"**tails**"+"..."))
            .setDescription("\n Your coin is flipping... "+((win)?((choice=='h')?heads:tails):((choice=='h')?tails:heads))+" and... \n")
            .addField(`\nYay! 😋 You have won ${config.fun.coinsemoji} **${Winamount}** coins!\n`, 'Good Job.. 🥳🎉')
            client.add(message.author.id, Winamount)
        } else {
            text2 = new MessageEmbed()
            .setTitle(`**You** used ${config.fun.coinsemoji} **`+ bet +" ** and decided for "+((choice=='h')?"**heads**":"**tails**"+"..."))
            .setDescription("\n Your coin is flipping... "+((win)?((choice=='h')?heads:tails):((choice=='h')?tails:heads))+" and... \n")
            .setColor('4a0000')
            .addField(`\nAwww you suddenly lost ${config.fun.coinsemoji} **${bet}** coins.`,`Better luck next time 🥺\n`)
            client.rmv(message.author.id, bet);
        }
        
        let edited = await message.channel.send({embeds: [text]})
			setTimeout(function(){
				edited.edit({embeds: [text2]})
			},3500);
    }
}