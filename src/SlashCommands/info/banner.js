const axios = require("axios")
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "banner",
    description: "Shows banner",
    category: "info",
    type: "CHAT_INPUT",
    options: [{
      name: 'user',
      type: 'USER',
      description: 'Mention User to get his Avatar'
    }],
    botPermissions: [  "EMBED_LINKS", "ADD_REACTIONS"],
    
    run: async ({client, interaction, args}) => {
      const userr =  interaction.options.getUser('user') || interaction.member;
      axios.get(`https://discord.com/api/users/${userr.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`
        },
      }).then((res) => {
        
        const { banner, accent_color } = res.data;

        if (banner) {
          const extension = banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

          const embed = new MessageEmbed()
            .setTitle(` ${userr.tag}'s Banner`)
            .setImage(url)
            .setColor(accent_color || "BLURPLE");
      
          interaction.followUp({embeds: [embed]})
        } else {
        if (accent_color) {
          const embed = new MessageEmbed()
            .setDescription(`**${userr.tag}** does not have a banner but they have an accent color`)
            .setColor(accent_color)

          interaction.followUp({embeds: [embed]})
      } else {
      interaction.followUp({content: `**${userr.tag}** does not have a banner nor do they have an accent color.`})
      }
    }
  });
  }
}