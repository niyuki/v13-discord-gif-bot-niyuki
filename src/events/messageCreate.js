const client = require("../index");
const afkschema = require('../models/afkschema')
const {MessageEmbed, Collection} = require('discord.js')
const Timeout = new Collection();
const ms = require('ms')
client.on("messageCreate", async (message) => {
    if(!message.guild || message.author.bot) return;
    if(client.config.mongooseConnectionString) {
        const data = await afkschema.findOne({ guild: message.guild.id, user: message.author.id })
        if(data && !message.content.startsWith(`${client.config.prefix}afk`)) {
            await afkschema.findOneAndDelete({ guild: message.guild.id, user: message.author.id })
            message.reply({content: await client.translate(`Your afk status have been removed\n(\`${data.reason}\`)`, message)})
        } else {
            const member = message.mentions.members.first()
            if(member && await afkschema.findOne({ guild: message.guild.id, user: member.user.id })) {
             return message.channel.send({content: await client.translate(`${member.user.tag} is currently afk. Please stop mentioning him or go ahead and message him via dms\nReason: \`${db.reason}\` `, message)})    
            } else {
                if (
                    message.author.bot ||
                    !message.guild
                    !message.content.toLowerCase().startsWith(client.config.prefix)
                )
                    return;
                const [cmd, ...args] = message.content
                .slice(client.config.prefix.length)
                .trim()
                .split(/ +/g);
        
            const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
            if (!command) return;
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.reply({content: `You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`})
                if(!message.member.permissions.has(command.userPermissions || [])) return message.channel.send({ content: await client.translate("You do not have permission to use this command!", message)});
                if(!message.guild.me.permissions.has(command.botPermissions || [])) return message.channel.send({ content: await client.translate("I do not have permission to use this command!", message)})
                if(command.ownerOnly && !client.config.developer.includes(message.author.id.toString())) return message.reply({content: await client.translate('Owner only command is not available for you.', message)})
                await command.run(client, message, args);
                if(client.channels.cache.get(client.config.commandlog)) client.channels.cache.get(client.config.commandlog).send({embeds: [new MessageEmbed()
                    .setTitle(`${await client.translate(`Used Command: `, message)} ${command.name}`)
                    .setDescription(` ${message.author.tag} ${await client.translate(` user used the command ${command.name}! Command was used in this channel: ${message.channel.name}`,message)}`)
                    .setColor('BLURPLE')
                    .setFooter('🔥 Niyuki On Fire 🔥 #respect')]})
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown*10000)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown*1000)
            } else {
                await command.run(client, message, args);
            }
            }
        }
    } else {
        return message.channel.send('Please enter Mongo Connection String first')
    }
});
