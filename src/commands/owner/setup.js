const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const { confirmation } = require("reconlx");
const client = require('../../index')
module.exports = {
    name: 'setup',
    description: 'Creates all important things for your settings file',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let array = config.developer

        if(!array.includes(message.author.id.toString())) {
            return message.react('❌')
        }  
        let question = new MessageEmbed()
        .setAuthor(`© ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
        .setColor(config.embedColor)
        .setTimestamp()
        .setFooter(config.embedFooter)
        .setTitle(await client.translate('Hey, how are you?', message))
        .setDescription(await client.translate(`Looks like you want to set things up, huh? Alright just to inform you I will create 15 COLOR Roles and 6 Emojis for Coinflip And Roulette. **Make sure your dm is open** because I will send you the needed information for the settings file. \n \`\`\` I will start in 30 seconds!!! \`\`\` `, message))
      
        message.reply({embeds: [question]}).then(x => setTimeout(() => x.delete(), 30000))

        setTimeout(() => {
          message.guild.roles.create({
            
              name: '------------VIP Color Roles-----------',
              position: 1,
            
            reason: 'VIP Color Roles',
          })
        message.guild.roles.create({
            
              name: '色',
              color: '#ffffff',
              hoist: true,
            
            reason: 'VIP Color Role 1/10',
          }).then(x => message.author.send(` \`\`\` "VipColor1": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#09fbd3',
              hoist: true,
            
            reason: 'VIP Color Role 2/10',
          }).then(x => message.author.send(` \`\`\` "VipColor2": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#560a86',
              hoist: true,
            
            reason: 'VIP Color Role 3/10',
          }).then(x => message.author.send(` \`\`\` "VipColor3": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#ce0000',
              hoist: true,
            
            reason: 'VIP Color Role 4/10',
          }).then(x => message.author.send(` \`\`\` "VipColor4": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#4a0000',
              hoist: true,

            reason: 'VIP Color Role 5/10',
          }).then(x => message.author.send(` \`\`\` "VipColor5": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#00ffd0',
              hoist: true,
            
            reason: 'VIP Color Role 6/10',
          }).then(x => message.author.send(` \`\`\` "VipColor6": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#d4ff00',
              hoist: true,
            
            reason: 'VIP Color Role 7/10',
          }).then(x => message.author.send(` \`\`\` "VipColor7": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#00ff95',
              hoist: true,
            
            reason: 'VIP Color Role 8/10',
          }).then(x => message.author.send(` \`\`\` "VipColor8": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#00ff00',
              hoist: true,
          
            reason: 'VIP Color Role 9/10',
          }).then(x => message.author.send(` \`\`\` "VipColor9": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#F3c7cb',
              hoist: true,
            
            reason: 'VIP Color Role 10/10',
          }).then(x => message.author.send(` \`\`\` "VipColor10": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '-----------Color Roles------------',
            
            reason: 'Color Roles',
          })
        message.guild.roles.create({
            
              name: '色',
              color: '#f7949d',
              hoist: true,
            
            reason: 'Color Role 1/5',
          }).then(x => message.author.send(` \`\`\` "ColorRole1": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#023119',
              hoist: true,
            
            reason: 'Color Role 2/5',
          }).then(x => message.author.send(` \`\`\` "ColorRole2": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#006b91',
              hoist: true,
            
            reason: 'Color Role 3/5',
          }).then(x => message.author.send(` \`\`\` "ColorRole3": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#910083',
              hoist: true,
            
            reason: 'Color Role 4/5',
          }).then(x => message.author.send(` \`\`\` "ColorRole4": "${x.id}",\`\`\` `))
          message.guild.roles.create({
            
              name: '色',
              color: '#c86c98',
              hoist: true,
            
            reason: 'Color Role 5/5',
          }).then(x => message.author.send(` \`\`\` "ColorRole5": "${x.id}"\`\`\` `))
          
            //Create emojis

            let rolesembed = new MessageEmbed()
            .setAuthor(`© ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
            .setColor(config.embedColor)
            .setTimestamp()
            .setFooter(config.embedFooter)
            .setTitle('Yeyyy')
            .setDescription(`I have created the Roles and Emojis now and I would **please** you to take the <@&${config.rolelist.Sharer}> Role below the created ones! \n Check your DM, I sent you all the RoleIDs and EmojiIDs to update the settings file.`)
          
          ;
          message.channel.send({embeds: [rolesembed]}).then(x => setTimeout(() =>x.delete({}),120000))

          let dmembed = new MessageEmbed()
          .setColor(config.embedColor)
          .setTimestamp()
          .setFooter(config.embedFooter)
          .setTitle('Look above for the RoleIDs and EmojiIDs. Enter this in your settings file.')
          .setDescription(` \`\`\` 
          RoleIDs:
          "VipColor1": "",
          "VipColor2": "",
          "VipColor3": "",
          "VipColor4": "",
          "VipColor5": "",
          "VipColor6": "",
          "VipColor7": "",
          "VipColor8": "",
          "VipColor9": "",
          "VipColor10": "",

          "ColorRole1": "",
          "ColorRole2": "",
          "ColorRole3": "",
          "ColorRole4": "",
          "ColorRole5": ""
          
          [...] 
          EmojiIDs:
          "headsemoji": "",
          "tailsemoji": "",
          "coinspinemoji": "",
    
          "greendiamondemoji": "",
          "reddiamondemoji": "",
          "blackdiamondemoji": ""
        }\`\`\``)
        
          message.author.send({embeds: [dmembed]}).catch(async() => message.channel.send(await client.translate(`Your DM is closed.. Please Open them and type \`${client.prefix}setup dm\` to resend the IDs `, message)))

          if(args[0] === 'dm') {
            message.author.send({embeds: [dmembed]}).catch(async() => message.channel.send(await client.translate(`Your DM is still closed dude.. Do not make fun of this and please open this seriously. Then type \`${client.prefix}setrl dm\` to resend the IDs `, message)))
          }
        }, 30000);
        /*setTimeout(() => {
          message.guild.emojis.create('https://cdn.discordapp.com/emojis/836290992718086225.png?v=1', 'headsemoji')
          .then(x => message.author.send(` \`\`\` "headsemoji": "<:${x.name}:${x.id}>",\`\`\` `))
        message.guild.emojis.create('https://cdn.discordapp.com/emojis/836287096544296961.png?v=1', 'tailsemoji')
          .then(x => message.author.send(` \`\`\` "tailsemoji": "<:${x.name}:${x.id}>",\`\`\` `))
        message.guild.emojis.create('https://cdn.discordapp.com/emojis/836293902435614741.gif?v=1', 'coinspinemoji')
          .then(x => message.author.send(` \`\`\` "coinspinemoji": "<a:${x.name}:${x.id}>",\`\`\` `))
        message.guild.emojis.create('https://cdn.discordapp.com/emojis/838386079291539466.gif?v=1', 'greendiamondemoji')
          .then(x => message.author.send(` \`\`\` "greendiamondemoji": "<a:${x.name}:${x.id}>",\`\`\` `))
        message.guild.emojis.create('https://cdn.discordapp.com/emojis/838386658101559307.gif?v=1', 'reddiamondemoji')
          .then(x => message.author.send(` \`\`\` "reddiamondemoji": "<a:${x.name}:${x.id}>",\`\`\` `))
        message.guild.emojis.create('https://cdn.discordapp.com/emojis/838386286775238696.gif?v=1', 'blackdiamondemoji')
          .then(x => message.author.send(` \`\`\` "blackdiamondemoji": "<a:${x.name}:${x.id}>",\`\`\` `))

         }, 15000);*/
    }
}