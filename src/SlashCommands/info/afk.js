const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config.json')
const afkschema = require('../../models/afkschema')
const { Command } = require('reconlx')

module.exports = new Command({
    name: 'afk',
    description: 'Get AFK',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["EMBED_LINKS"],
    type: "CHAT_INPUT",
    options: [{
        name: 'reason',
        type: 'STRING',
        description: 'Reason to be afk.'
    }],
    
     run: async ({client, interaction, args}) => {
        if(config.mongooseConnectionString) {
            const content = interaction.options.getString('reason') || 'I will brb just chill fam';
        let embed = new MessageEmbed()
            .setColor(interaction.member.displayColor)
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
            const data = await afkschema.findOne({ guild: interaction.guild.id, user: interaction.member.id })
            if(!data) {
                await new afkschema(
                     { guild: interaction.guild.id , user: interaction.user.id, reason: content }
                ).save()
                interaction.followUp({embeds: [embed.setColor("BLURPLE").setDescription(await client.translate(`You have been set to afk\n\n`, interaction)+`\n**__Reason__:** \n \`${content}\` `)]})
            } else {
                await afkschema.findOneAndUpdate({
                    guild: interaction.guild.id,
                    user: interaction.user.id,
                    reason: content
                });
                interaction.followUp({embeds: [embed.setDescription(await client.translate(`Your afk status has been updated!\n\n`, interaction)+` **__Reason__:** \n \`${content}\` `)]})

            }
        } else {
            interaction.followUp({ content: await client.translate('Please enter mongopath to use afk mode!', interaction)})
        }
        
    }
})