const client = global.client;
const config = require('../config.json')
const { Message, MessageEmbed } = require('discord.js');

client.on('userUpdate', async(niyuki, respect) => {
    if(niyuki.avatarURL() === respect.avatarURL()) return;
    let useravatar = (respect.avatarURL({dynamic: true, size:1024}));
    let randomgif = client.channels.cache.get(config.channellist.randomGifLog)

    if((useravatar).endsWith(".gif")) {
        let gifembed = new MessageEmbed()
        .setAuthor(`© ${respect.id}`)
        .setTitle(config.fun.emoji+" Random GIF "+config.fun.emoji)
        .setDescription(`**Show Avatar** [**Click here**](${useravatar})`)
        .setColor(config.embedColor)
        .setFooter(config.embedFooter+ ' | ' + respect.tag)
        .setImage(useravatar)
        .setTimestamp();

        randomgiff.send({embeds:[gifembed]})
    }
})
client.on('userUpdate', async(niyuki, respect) => {
    if(niyuki.avatarURL() === respect.avatarURL()) return;
    let useravatar = (respect.avatarURL({dynamic: true, size:1024}));
    let randompp = client.channels.cache.get(config.channellist.randomPpLog)

    if((useravatar).endsWith(".jpg") || (useravatar).endsWith(".png") || (useravatar).endsWith(".webp")) {
        let ppembed = new MessageEmbed()
            .setAuthor(`© ${respect.id}`)
            .setTitle(config.fun.emoji+" Random PP "+config.fun.emoji)
            .setDescription(`**Show Avatar** [**Click here**](${useravatar})`)
            .setColor(config.embedColor)
            .setFooter(config.embedFooter+ ' | ' + respect.tag)
            .setImage(useravatar)
            .setTimestamp();

        randompepe.send({embeds :[ppembed]})
    }
})