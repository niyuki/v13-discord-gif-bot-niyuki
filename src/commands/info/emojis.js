const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'emojis',
    aliases: ['emojilist', 'serveremojis'],
    description: 'Shows all the emojis available in the server!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        function Emoji(id) {
            return client.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
            OverallEmojis++;
            if(emoji.animated) {
                Animated++;
                EmojisAnimated += Emoji(emoji.id);
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id);
            }
        })
        let Emojiembed = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
            .setDescription(
                `**Animated [${Animated}]**: \n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
            )
            .setFooter(config.embedFooter)
        if (Emojiembed.length > 2000) {
            return message.channel.send(await client.translate(
                `I'm sorry sir but, my limit is 2000 characters only!`, message)
            );
        } else {
            message.channel.send({embeds: [Emojiembed]})
        }
    }
}