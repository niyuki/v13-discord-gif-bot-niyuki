const client = require('../../index');
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Interaction, interaction } = require('discord.js');
const { readdirSync } = require('fs')
const { Command } = require('reconlx')
//prefix
const config = require('../../config.json')
const p = client.config.prefix
module.exports = new Command({
    name: 'help',
    aliases: ['h'],
    description: 'Shows all available commands :flushed:',
    cooldown:20,
    type: "CHAT_INPUT",
    options: [{
      name: 'command',
      type: 'STRING',
      description: 'Search for command name.'
    }],
     run: async({client, interaction, args}) => {
       const comend = interaction.options.getString('command')
      const button0 = new MessageButton()
      .setCustomId("main")
      .setLabel('Main')
      const button1 = new MessageButton()
      .setCustomId("commands")
      .setLabel('Commands')
      const button2 = new MessageButton()
      .setCustomId("slashcommands")
      .setLabel('SlashCommands')

      const row = new MessageActionRow()
      .addComponents([button0.setStyle("PRIMARY").setDisabled(true), button1.setStyle("SECONDARY").setDisabled(false), button2.setStyle("SECONDARY").setDisabled(false)])
      const row1 = new MessageActionRow()
      .addComponents([button0.setStyle("SECONDARY").setDisabled(false), button1.setStyle("PRIMARY").setDisabled(true), button2.setStyle("SECONDARY").setDisabled(false)])
      const row2 = new MessageActionRow()
      .addComponents([button0.setStyle("SECONDARY").setDisabled(false), button1.setStyle("SECONDARY").setDisabled(false), button2.setStyle("PRIMARY").setDisabled(true)])
        if(!comend) {
            
            let categories = [];
            let x = await client.translate("Missing Command Name!", interaction)
            readdirSync("./src/commands").forEach((dir) => {
                let array = (config.developer)

                if(dir == 'owner' && !array.includes(interaction.member.id.toString())) {
                    return
                }
                const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return x

                    let name = file.name.replace(".js", "");
                    
                    return `\`${name}\``;
                });

                let data = new Object() ;

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "-" : cmds.join(" "),
                };

                categories.push(data);
            });
            let categories2 = [];
            readdirSync("./src/SlashCommands").forEach((dir) => {
                let array = (config.developer)

                if(dir == 'owner' && !array.includes(interaction.member.id.toString())) {
                    return
                }
                const commands = readdirSync(`./src/SlashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../SlashCommands/${dir}/${command}`);

                    if (!file.name) return x

                    let name = file.name.replace(".js", "");
                    
                    return `\`${name}\``;
                });

                let data2 = new Object() ;

                data2 = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "-" : cmds.join(" "),
                };

                categories2.push(data2);
            });
            const helpembed = new MessageEmbed()
                .setAuthor(interaction.guild.name)
                .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setTitle(await client.translate("🥳 Hey Champ.. Do you need help? Anyways click below to see commands:", interaction))
                .setDescription(await client.translate(`To get more addtional information on a command just type it after \`${p}help\`.\n Anyways hope you enjoy me... 😋`, interaction))
                .addField('Prefix:', `\`${client.config.prefix}\``)
                .addField('Links:', `[\`📩 ·  Invite Me\`](${`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`})\n[\`🎈 ·  Support Server\`](https://discord.gg/niyuki)\n[\`👨‍💻 ·  Bot Developer\`](https://niyuki.xyz)`)
                .setColor(interaction.guild.members.cache.get(client.user.id).displayColor ||"BLURPLE")
                .setTimestamp()
                .setFooter('Use help <category>'+` | Developed by Niyuki`, interaction.member.avatarURL({dynamic: true}))
    

              const helpembed1 = new MessageEmbed()
                .setAuthor(interaction.guild.name)
                .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setTitle(await client.translate("🥳 Hey Champ.. Do you need help? Anyways here you can see all of my normal commands:", interaction))
                .setDescription(await client.translate(`To get more addtional information on a command just type it after \`${p}help\`.\n Anyways hope you enjoy me... 😋`, interaction))
                .addFields(categories)
                .setColor(interaction.guild.members.cache.get(client.user.id).displayColor ||"BLURPLE")
                .setTimestamp()
                .setFooter(await client.translate(`Requested by ${interaction.member.tag}`, interaction)+` | Developed by Niyuki`, interaction.member.avatarURL({dynamic: true}))
              
              const helpembed2 = new MessageEmbed()
                .setAuthor(interaction.guild.name)
                .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setTitle(await client.translate("🥳 Hey Champ.. Do you need help? Anyways here you can see all of my SlashCommands:", interaction))
                .setDescription(await client.translate(`To get more addtional information on a command just type it after \`${p}help\`.\n Anyways hope you enjoy me... 😋`, interaction))
                .addFields(categories2)
                .setColor(interaction.guild.members.cache.get(client.user.id).displayColor ||"BLURPLE")
                .setTimestamp()
                .setFooter(await client.translate(`Requested by ${interaction.member.tag}`, interaction)+` | Developed by Niyuki`, interaction.member.avatarURL({dynamic: true}))
        
              
              interaction.followUp({embeds: [helpembed], components: [row]})
              
              const filter = i => i.user.id === interaction.member.id;

              const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

              collector.on('collect', async b => {
                if (!b.isButton()) return;
                if(b.customId == "commands") {
                  b.update({embeds: [helpembed1], components: [row1]})
                }
                if(b.customId == "slashcommands") {
                  b.update({embeds: [helpembed2], components: [row2]})
                }
                if(b.customId == "main") {
                  b.update({embeds: [helpembed], components: [row]})
                }             	
              });
        } else {
            const command =
              client.commands.get(comend) ||
              client.commands.find(
                (c) => c.aliases && c.aliases?.includes(comend)
              ) || client.slashCommands.get(comend);
      
            if (!command) {
              const embed = new MessageEmbed()
                .setTitle(await client.translate(`Invalid command! Use \`${client.config.prefix}help\` for all of my commands!`, interaction))
                .setColor("BLURPLE");
              return interaction.followUp({embeds: [embed]});
            }
      
            const embed = new MessageEmbed()
              .setTitle(await client.translate("Command Details:", interaction))
              .addField(await client.translate("PREFIX:", interaction), `\`${p}\``)
              .addField(await client.translate(
                "COMMAND:", interaction),
                command.name ? `\`${command.name}\`` : await client.translate("No name for this command.", interaction)
              )
              .addField(await client.translate(
                "ALIASES:", interaction),
                command.aliases
                  ? `\`${command.aliases.join("` `")}\``
                  : await client.translate("No aliases for this command.", interaction)
              )
              .addField(await client.translate(
                "USAGE:", interaction),
                command.usage
                  ? `\`${command.usage}\``
                  : `\`${p}${command.name}\``
              )
              .addField(await client.translate(
                "DESCRIPTION:", interaction),
                command.description
                  ? command.description
                  : await client.translate("No description for this command.", interaction)
              )
              .addField(await client.translate(
                "COOLDOWN:", interaction),
                command.cooldown
                  ? `\`${command.cooldown}\``
                  : await client.translate(`Dang enjoy because in this command you don't have any cooldowns kekw`, interaction)
              )
              .setFooter(
                await client.translate(`Requested by ${interaction.member.tag}`, interaction),
                interaction.member.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              .setColor(interaction.guild.members.cache.get(client.user.id).displayColor || "BLURPLE");
            return interaction.followUp({embeds: [embed]});
        }
    }
})