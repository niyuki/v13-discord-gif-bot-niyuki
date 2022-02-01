const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
let { pagination, Command } = require('reconlx')
const moment = require('moment')
module.exports = new Command({
	name: "editsnipe",
	description: "Show edited messages.",
	type: 'CHAT_INPUT',
	run: async ({client, interaction, args}) => {
		
		const edits = client.edits.get(interaction.channel.id);

		if (!edits) return interaction.followUp({ content: 'There Are No Deleted Messages' });

    
        let embeds = [];
        const x = await client.translate("Previous Message", interaction)
        const y = await client.translate("Edited Message", interaction)
        edits.forEach(snipe => {
          const {msg1, msg2, time, image} = snipe;
          embeds.push(
            new MessageEmbed()
            .setAuthor(msg1.author.tag, msg1.author.displayAvatarURL({dynamic:true}))
            .setImage(image)
            .setDescription(`**${x}**\n${msg1.content}\n\n**${y}**\n${msg2.content}`)
            .setFooter(`${moment(time).fromNow()}`)
            .setColor("BLURPLE")
          )
        })
    
        pagination({
          author: interaction.user,
          channel: interaction.channel,
          embeds: embeds,
          fastSkip: true,
          time: 20000,
        })
	},
});
