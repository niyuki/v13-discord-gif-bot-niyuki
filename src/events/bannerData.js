const client = global.client;
client.on('rateLimit', async(timeout, limit, method, path, global) => {
    console.log(timeout)
    console.log(limit)
    console.log(method)
    console.log(path)
    console.log(global)
    console.log('gg')
})
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
client.on('ready', async () => {
  let guild = client.guilds.cache.get(client.config.guildId);
  bannerCheck(guild);
})

async function banner(guild) {
  let newMemberArray = [];
  guild.members.cache.map(async (member) => {
    newMemberArrray.push(member)
  })  

  newMemberArray.map(async (memberDat) => {
    await client.users.fetch(memberDat.id, { force: true }).then(member => {
      if (member.banner) {
        client.bannerData.set(memberDat.id, member.banner);
      } else return;
    })
  });
  console.log('Map process done!\nDoing controls.');
  setInterval(() => bannerCheck(guild), 1000*30);
}

async function bannerCheck(guild) {
  
  let newMemberArray = [];
  guild.members.cache.map(async (member) => {
    newMemberArray.push(member)
  })  

  newMemberArray.map(async (memberDat,i) => {
    setTimeout(async () => {
        await client.users.fetch(memberDat.id, { force: true }).then(member => {
          if(!member) return;
            if (client.bannerData.get(memberDat.id) != member.banner && client.bannerData.get(memberDat.id) && member.banner) {
              let ppembed = new MessageEmbed()
                .setAuthor(`© ${memberDat.id}`)
                .setTitle(config.fun.emoji + " Random Banner " + config.fun.emoji)
                .setDescription(`**Show Banner** [**Click here**](${member.bannerURL({ dynamic: true, size: 4096 })})`)
                .setColor(config.embedColor)
                .setFooter(config.embedFooter + ' | ' + member.tag)
                .setImage(member.bannerURL({ dynamic: true, size: 4096 }))
                .setTimestamp();
              let randombanner = client.channels.cache.get(config.channellist.randomBannerLog)
              randombanner.send({ embeds: [ppembed] })
              client.bannerData.set(memberDat.id, member.banner)
            } else if (!client.bannerData.get(memberDat.id) && member.banner) {
              console.log(member.bannerURL({ dynamic: true }));
              let ppembed = new MessageEmbed()
                .setAuthor(`© ${memberDat.id}`)
                .setTitle(config.fun.emoji + " Random Banner " + config.fun.emoji)
                .setDescription(`**Show Banner** [**Click here**](${member.bannerURL({ dynamic: true, size: 4096 })})`)
                .setColor(config.embedColor)
                .setFooter(config.embedFooter + ' | ' + member.tag)
                .setImage(member.bannerURL({ dynamic: true, size: 4096 }))
                .setTimestamp();
              let randombanner = client.channels.cache.get(config.channellist.randomBannerLog)
              randombanner.send({ embeds: [ppembed] })
              client.bannerData.set(memberDat.id, member.banner)
            } else return;
          })
    }, i*10000)
  })
}
