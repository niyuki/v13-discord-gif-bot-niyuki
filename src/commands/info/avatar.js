const { Client, Discord, MessageEmbed } = require('discord.js');
module.exports = {
    name: "avatar",
    aliases: ['av'],
    description: "Shows Your avatar",
    category: "info",
            botPermissions: [  "EMBED_LINKS", "ADD_REACTIONS"], run: async(client, message, args) => {
                const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      
                const embed = new MessageEmbed()
                  .setTitle(`${member.displayName}'s Avatar`)
                  .setImage(member.user.displayAvatarURL({ dynamic: true, size:  1024 }))
                  .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                  .setTimestamp()
                  .setColor("BLURPLE");
              message.channel.send({embeds: [embed]});
} 
}
 