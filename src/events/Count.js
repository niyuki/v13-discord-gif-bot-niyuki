const { Client, Message, MessageEmbed } = require('discord.js');
const client = global.client;
const config = require('../config.json')

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    //Check if gif/pp is sent to the categories
    let categories = config.channellist.sharecategory;

    if(message.attachments.size == 0 && message.embeds.length == 0 && categories.includes(message.channel.parentID)) {
        message.delete({timeout: 1000})
        let nogifpp = new MessageEmbed()
        .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
        .setTitle(await client.translate('Hey dude, stop here', message))
        .setDescription(config.fun.emoji+' | '+await client.translate(` You can only send **gif or pp** in here!`, message))
        .setColor(config.embedColor)
        .setFooter(config.embedFooter)
        .setTimestamp();//sa
        message.channel.send({embeds: [nogifpp]}).then(x => x.delete({timeout: 6500}))
    }

    if((message.attachments.size > 0 || message.embeds.length > 0) && categories.includes(message.channel.parentID)) {
        let pp = 0; let gif = 0; let victim = message.member;
        if(message.attachments.size === 0 && message.embeds.length > 0) {
            message.embeds.forEach(x => {
            if(x.url.endsWith(".gif")) {
                client.gif(victim.id, 1)
                client.add(victim.id, 50)

                gif = gif
            }
            if(x.url.endsWith('.webp')||x.url.endsWith('.png')||x.url.endsWith('.jpeg')||x.url.endsWith('.jpg')){
                client.pp(victim.id, 1)
                client.add(victim.id, 50)
                
                pp = pp
            }
          })
        } else if(message.embeds.length === 0 && message.attachments.size > 0) {
            message.attachments.forEach(x => {
            if(x.url.endsWith(".gif")) {
                client.gif(victim.id, 1, 1)
                client.add(victim.id, config.fun.sharereward)

                gif = gif +1
            }
            if(x.url.endsWith('.webp')||x.url.endsWith('.png')||x.url.endsWith('.jpeg')||x.url.endsWith('.jpg')){
                client.pp(victim.id, 1, 1)
                client.add(victim.id, config.fun.sharereward)
                
                pp = pp +1
            }
          })
        }

        let info = ``

        if(gif > 0 && pp === 0){
            info=`${gif} gif`
        }
        if(gif === 0 && pp > 0){
            info=`${pp} pp`
        }
        if(gif > 0 && pp > 0){
            info=`${pp} pp, ${gif} gif`
        }
        
        const total = await client.total(victim.id) + 1;
        const gifcount = await client.gifcount(victim.id);
        const ppcount = await client.ppcount(victim.id);
        const coins = await client.bal(victim.id);

        let giflogchannel = client.channels.cache.get(config.channellist.giflog);
        let logembed = new MessageEmbed()
        .setAuthor(`© ${victim.user.tag}`, victim.user.avatarURL({dynamic: true}))
        .setTitle(config.fun.emoji+await client.translate(" Newest Gif/Pp ")+config.fun.emoji)
        .setDescription(await client.translate(`Thanks to <@${victim.id}> for sharing this ${ message.content.includes(".gif") ? '**GIF**' : '**PP**'} in this channel: <#${message.channel.id}>(Shared Total: ${info}). \n\n \`\`\` > This User has right now sent ${total} GIF/PP in total. \n - Exactly ${gifcount} Amount of Gifs and ${ppcount} Amount of Pp. \n > So ${victim.user.tag} has now reached an Amount of ${coins} Coins in Total. \`\`\` `, message))
        .setColor(config.embedColor)
        .setFooter(await client.translate(`For each shared GIF/PP the User wins ${config.fun.sharereward} Amount of coins.`, message))
        .setTimestamp();
        
        giflogchannel.send({embeds:[logembed]})
    }
})