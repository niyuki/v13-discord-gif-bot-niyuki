const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const config = require('../../config.json')

let greendia = config.fun.greendiamondemoji
let reddia = config.fun.reddiamondemoji
let blackdia = config.fun.blackdiamondemoji

module.exports = {
    name: 'roulette',
    aliases: ['rl', 'r'],
    cooldown: 1000*7,
    usage: '. roulette <black/red/green> <bet>',
    description: 'Gamble ur money with roulette',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let color = args[0];
        let money = args[1];
        if(Number === args[1]){
			bet = parseInt(args[0]);		
		}
        let balance = await client.bal(message.author.id)

        let random = Math.floor(Math.random() * 37);

        let moneymore = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(' I think you do not have that much money to bet do you?', message))

        let betmax = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(" You can only bet a maximum of 50000 coins. I mean if you have so much ", message))

        let moneyhelp = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(` Specify an amount to gamble! | \`roulette <color> <betamount/all>\``, message))

        let colorbad = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(" Specify a color |", message)+"Red [1.5x] Black [2x] Green [15x]")

        let moneyno = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(` You don't have even one coin noob xd `, message))

        let cf0 = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(` You can not coinflip 0 dum dum!`, message))

        let cfminus = new MessageEmbed()
        .setColor('4a0000')
        .setDescription(await client.translate(" Do you even know how money works..", message))

        if (!color) return message.channel.send({embeds: [colorbad]}).then(x => x.delete ({ timeout: 5000}))
        color = color.toLowerCase()
        if(!money) return message.channel.send({embeds: [moneyhelp]}).then(x => x.delete ({ timeout: 5000}))
        if(money > balance) return message.channel.send({embeds: [moneymore]}).then(x => x.delete ({ timeout: 5000}))

        if(money=="all") money = 50000 || await client.bal(message.author.id)

		if (money > 50000) {
            message.channel.send({embeds: [betmax]}).then(x => x.delete ({ timeout: 5000}))
			return;
		}  
        if (money==0) {
            message.channel.send({embeds: [cf0]}).then(x => x.delete ({ timeout: 5000}))
			return;
		}
        if (money<0){
            message.channel.send({embeds: [cfminus]}).then(x => x.delete ({ timeout: 5000}))
			return;
        }

        if (color == "b"  || color.includes("black")) color = 0;
        else if (color == "r"  || color.includes("red")) color = 1;
        else if (color == "g"  || color.includes("green")) color = 2;
        else return message.channel.send({embeds: [colorbad]}).then(x => x.delete ({ timeout: 5000 }));

        let roulettegif = [
            "https://media2.giphy.com/media/26uflBhaGt5lQsaCA/giphy.gif",
            "https://media2.giphy.com/media/26uf2YTgF5upXUTm0/giphy.gif",
            "https://thumbs.gfycat.com/SpanishShockedClumber-small.gif",
            "https://media.tenor.com/images/5e313e6e06fc618cc1821af702844830/tenor.gif"
        ]
        const rouletterandom = roulettegif[Math.floor(Math.random() * roulettegif.length)];

        let text = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`**${user.username}** has rolled the roulette...`)
            .setImage(rouletterandom)
        if (random == 0 && color == 2) { //Green
            money *= 15
            client.add(message.author.id, money)
            let text2 = new Discord.MessageEmbed()
                .setColor("0dfa3b")
                .setDescription(`${greendia} **${user.username}** won **${money} coins**\n\n\`Multiplier: 15x\``)
                .setImage('https://media3.giphy.com/media/26ufkBRB1E836CxYA/giphy.gif?cid=ecf05e47m0qy7k2w2cpwvx0qacatd2lsughx4czlvlz1wvyo&rid=giphy.gif&ct=g')
            let edited = await message.channel.send({embeds: [text]})
            setTimeout(function(){
                edited.edit({embeds: [text2]})
            },3000);
        } else if (isOdd(random) && color == 1) {//Red
            money = parseInt(money * 1.5)
            client.add(message.author.id, money)
            let text2 = new Discord.MessageEmbed()
                .setColor("0dfa3b")
                .setDescription(`${reddia} **${user.username}** won **${money} coins**\n\n\`Multiplier: 1.5x\``)
                .setImage('https://media3.giphy.com/media/26ufkBRB1E836CxYA/giphy.gif?cid=ecf05e47m0qy7k2w2cpwvx0qacatd2lsughx4czlvlz1wvyo&rid=giphy.gif&ct=g')
            let edited = await message.channel.send({embeds: [text]})
            setTimeout(function(){
                edited.edit({embeds: [text2]})
            },3000);
        } else if (!isOdd(random) && color == 0) {//Black
            money = parseInt(money * 2)
            client.add(message.author.id, money)
            let text2 = new Discord.MessageEmbed()
                .setColor("0dfa3b")
                .setDescription(`${blackdia} **${user.username}** won **${money} coins**\n\n\`Multiplier: 2x\``)
                .setImage('https://media3.giphy.com/media/26ufkBRB1E836CxYA/giphy.gif?cid=ecf05e47m0qy7k2w2cpwvx0qacatd2lsughx4czlvlz1wvyo&rid=giphy.gif&ct=g')
            let edited = await message.channel.send({embeds: [text]})
            setTimeout(function(){
                edited.edit({embeds: [text2]})
            },3000);
        } else { //Wrong
            client.rmv(message.author.id, money)
            let text2 = new MessageEmbed()
            .setColor('4a0000')
            .setDescription(await client.translate(`  Dang you just lost **${money} coins**\n\n\`Multiplier: 0x\``, message))
            .setImage('https://media.tenor.com/images/8e6c8cafa981e28194727e8344156626/tenor.gif')
            let edited = await message.channel.send({embeds: [text]})
           setTimeout(function(){
               edited.edit({embeds: [text2]})
           },4000);
        }




    }
}