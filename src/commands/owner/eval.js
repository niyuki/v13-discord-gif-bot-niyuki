const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const util = require('util');
const client = require('../../index')

module.exports = {
    name: 'eval',
    aliases: ['e'],
    category: 'Developers',
    description: 'Runs javascript as the discord bot client.',
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let code = args.join(' ');
        const embed = new Discord.MessageEmbed();  

        if (!code) {
            return message.reply({embeds: [
                new MessageEmbed()
                    .setTitle(await client.translate('Error Usage', message))
                    .setDescription(`Usage: ${client.prefix}eval <code>`)
                    .setColor('4a0000')
            ]});
        }

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output (Promise)`;
            } else {
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor('RANDOM')
                .addField(`Status`, `Success`);
            return message.channel.send({embeds: [embed]});
        } catch (e) {
            console.log(e.stack);
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor(message.member.displayColor);
            return message.channel.send({embeds: [embed]});
        }
    }
};