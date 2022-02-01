const { Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name : 'hug',
    timeout: 1000,
    description : 'hug the person',
    hidden: true,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const author = message.mentions.users.first() ||  message.member;
        const user = message.mentions.members.first() || message.member;
        const member = message.mentions.members.first() || message.member;
        

    const gifs = [
        "https://img1.ak.crunchyroll.com/i/spire3/d658df709f064f98dcd7bfa41df50ea91440964381_full.gif",
        "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
        "http://i.imgur.com/iI3o7t0.gif",
        "https://media1.tenor.com/images/f7e2e2a094aff291c81ae519a461bd24/tenor.gif?itemid=5252013",
        "https://media.tenor.co/images/5c35f9a6052b30442d05a855fc76b5de/tenor.gif",
        "http://gifimage.net/wp-content/uploads/2017/06/anime-hug-gif-11.gif",
        "https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif",
        "https://s-media-cache-ak0.pinimg.com/originals/aa/27/00/aa27008ab7250b9f8b32abd95f6c4025.gif",
        "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
        "https://media.tenor.com/images/e07a54a316ea6581329a7ccba23aea2f/tenor.gif"
        ]
        
        const index = Math.floor(Math.random() * gifs.length);
        const gif = gifs[index];
        
        
        
                message.channel.send({embeds: [new MessageEmbed()
            
                    .setTitle(`${message.author.tag} hugged ${member.user.tag}`)
                    .setImage(gif)
                    .setColor(config.embedColor)
        
                ]})}
                }