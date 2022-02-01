const client = require("../index");
const {MessageEmbed, Collection} = require('discord.js')
const Timeout = new Collection();
const ms = require('ms')

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        if(cmd.cooldown) {
            if(Timeout.has(`slash-${cmd.name}-${interaction.user.id}`)) return interaction.followUp({embeds: [new MessageEmbed().setColor('4a0000').setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic:true})).setDescription(await client.translate(`You are on a \`${ms(Timeout.get(`slash-${cmd.name}-${interaction.user.id}`) - Date.now(), {long : true})}\` cooldown.`, interaction))]})
            if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: await client.translate("You do not have permission to use this command!", interaction)})
            if(!interaction.guild.me.permissions.has(cmd.botPermissions || [])) return interaction.followUp({ content: await client.translate("I do not have permission to use this command!", interaction)})
            if(cmd.ownerOnly && !client.config.developer.includes(interaction.user.id.toString())) return interaction.followUp({content: await client.translate('Owner only command is not available for you.', interaction)})
            cmd.run({client, interaction, args});
            Timeout.set(`slash-${cmd.name}-${interaction.user.id}`, Date.now() + cmd.cooldown*1000)
            setTimeout(() => {
                Timeout.delete(`slash-${cmd.name}-${interaction.user.id}`)
            }, cmd.cooldown*1000)
            if(client.channels.cache.get(client.config.commandlog)) client.channels.cache.get(client.config.commandlog).send({embeds: [new MessageEmbed()
                .setTitle(`${await client.translate(`Used Command: `, interaction)} ${cmd.name}`)
                .setDescription(` ${interaction.user.tag} ${await client.translate(` user used the SlashCommand ${cmd.name}! Command was used in this channel: ${interaction.channel.name}`,interaction)}`)
                .setColor('BLURPLE')
                .setFooter('🔥 Niyuki On Fire 🔥')]})
        } else {
            if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: await client.translate("You do not have permission to use this command!", interaction)})
            if(!interaction.guild.me.permissions.has(cmd.botPermissions || [])) return interaction.followUp({ content: await client.translate("I do not have permission to use this command!", interaction)})
            if(cmd.ownerOnly && !client.config.developer.includes(interaction.user.id.toString())) return interaction.followUp({content: await client.translate('Owner only command is not available for you.', interaction)})
            cmd.run({client, interaction, args});
            if(client.channels.cache.get(client.config.commandlog)) client.channels.cache.get(client.config.commandlog).send({embeds: [new MessageEmbed()
                .setTitle(`${await client.translate(`Used Command: `, interaction)} ${cmd.name}`)
                .setDescription(` ${interaction.user.tag} ${await client.translate(` user used the SlashCommand ${cmd.name}! Command was used in this channel: ${interaction.channel.name}`,interaction)}`)
                .setColor('BLURPLE')
                .setFooter('🔥 Niyuki On Fire 🔥')]})
        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: await client.translate("You do not have permission to use this command!", interaction)})
        if(!interaction.guild.me.permissions.has(cmd.botPermissions || [])) return interaction.followUp({ content: await client.translate("I do not have permission to use this command!", interaction)})
        if(cmd.ownerOnly && !client.config.developer.includes(interaction.member.id.toString())) return interaction.followUp({content: await client.translate('Owner only command is not available for you.', interaction)})
        command.run({client, interaction});
        if(client.channels.cache.get(client.config.commandlog)) client.channels.cache.get(client.config.commandlog).send({embeds: [new MessageEmbed()
            .setTitle(`${await client.translate(`Used Command: `, interaction)} ${command.name}`)
            .setDescription(` ${interaction.user.tag} ${await client.translate(` user used the SlashCommand ${command.name}! Command was used in this channel: ${interaction.channel.name}`,interaction)}`)
            .setColor('BLURPLE')
            .setFooter('🔥 Niyuki On Fire 🔥')]})
    }
});
