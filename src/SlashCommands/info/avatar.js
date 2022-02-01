const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows Your avatar",
    category: "info",
    type: "CHAT_INPUT",
    options: [{
      name: 'user',
      type: 'USER',
      description: 'Mention User to get his Avatar'
    }],
    botPermissions: [  "EMBED_LINKS", "ADD_REACTIONS"],
     
    run: async ({client, interaction, args}) => {
      const member =  interaction.options.getUser('user') || interaction.member;
      const embed = new MessageEmbed()
        .setTitle(`${member.displayName?member.displayName: member.username}'s Avatar`)
        .setImage(member.displayAvatarURL({ dynamic: true, size:  1024 }))
        .setFooter(interaction.member.displayName? interaction.member.displayName: interactionmember.username,  interaction.member.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("BLURPLE");
      interaction.followUp({embeds: [embed]});
} 
}
 