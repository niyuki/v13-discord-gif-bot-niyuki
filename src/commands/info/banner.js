const axios = require("axios")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "banner",
    description: "Shows banner",
    category: "info",
    botPermissions: [  "EMBED_LINKS", "ADD_REACTIONS"],
    run: async(client, message, args) => {

      let user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0])  || client.users.cache.get(args[0]) || message.author;
      axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
        Authorization: `Bot ${client.token}`
        },
      }).then((res) => {
        
        const { banner, accent_color } = res.data;

        if (banner) {
          const extension = banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

          const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Banner`)
            .setImage(url)
            .setColor(accent_color || "BLURPLE");
      
          message.reply({embeds: [embed]})
    } else {
        if (accent_color) {
        const embed = new MessageEmbed()
          .setDescription(`**${user.tag}** does not have a banner but they have an accent color`)
          .setColor(accent_color)

        message.reply({embeds: [embed]})
    } else {
        message.reply({content:`**${user.tag}** does not have a banner nor do they have an accent color.`})
      }
    }
  });
  }
}