const {Collection, Client, Discord, Permissions, MessageEmbed} = require('discord.js')
const config = require('../../config.json')
module.exports = {
    name: "kiss",
    description: "kiss a user",
    usage: "<@player>",
    run: async(client, message, args) => {

        const Target = message.mentions.members.first()

        const kissPower = Math.floor(Math.random() * (1000 - 1) + 1);

        if(!Target) return message.reply(await client.translate("Sorry but u cant kiss air", message))

        message.channel.send(await client.translate(`${Target} is now ${kissPower}% happier UwU`, message))
            const gifs = [
        "https://media1.tenor.com/images/503bb007a3c84b569153dcfaaf9df46a/tenor.gif?itemid=17382412",
        "https://media1.tenor.com/images/ea9a07318bd8400fbfbd658e9f5ecd5d/tenor.gif?itemid=12612515",
        "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865",
        "https://media1.tenor.com/images/f7e2e2a094aff291c81ae519a461bd24/tenor.gif?itemid=5252013",
        "https://media1.tenor.com/images/3d56f6ef81e5c01241ff17c364b72529/tenor.gif?itemid=13843260",
        "https://media1.tenor.com/images/6f455ef36a0eb011a60fad110a44ce68/tenor.gif?itemid=13658106",
        "https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif?itemid=6155670",
        "https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif",
        "https://media1.tenor.com/images/e858678426357728038c277598871d6d/tenor.gif?itemid=9903014",
        "hhttps://media1.tenor.com/images/d93c9a9c201ec1fe3c8011718b18a83c/tenor.gif?itemid=16317577"
        ]
        
        const index = Math.floor(Math.random() * gifs.length);
        const gif = gifs[index];
        const Embed = new MessageEmbed()
        .setTitle("KISSED UvU")
        .setColor(config.embedColor)
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .addField('Kissed by:', message.author, true)
        .addField('Happy!', `you got ${kissPower}% happier`, true)
        .setImage(gif)
        
        Target.send({embeds: [Embed]})
        
    }
}