const moment = require("moment")
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
let { pagination, Command } = require('reconlx')

module.exports = new Command({
	name: "snipe",
	description: "snipe yo mum.",
	type: 'CHAT_INPUT',
    run: async ({client, interaction, args}) => {
        const snipes = client.snipes.get(interaction.channel.id)
        if(!snipes) return interaction.followUp(await client.translate(`:x: | There's nothing to snipe!`, interaction))
    
        let embeds = [];
    
        snipes.forEach(snipe => {
          const {msg, time, image} = snipe;
          embeds.push(
            new MessageEmbed()
            .setTitle(msg.author.tag, msg.author.displayAvatarURL({dynamic:true}))
            .setImage(image)
            .setDescription(msg.content)
            .setFooter(`${moment(time).fromNow()}`)
            .setColor("BLURPLE")
          )
        })
    
        pagination({
          author: interaction.user,
          channel: interaction.channel,
          embeds: embeds,
          fastSkip: true,
          time: 60000,
        })
    }
})