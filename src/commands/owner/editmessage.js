const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const client = require('../../index')
const data = require('../../models/editmsg')
const moment = require('moment')
module.exports = {
    name: 'editmessage',
    category: 'Developers',
    description: 'Runs javascript as the discord bot client.',
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["ADMINISTRATOR"],
    ownerOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        data.find({} , async(err, res) => {
            if(res && res[0]) return message.react(config.fun.crossemoji)
            message.delete()
            let time = moment().minutes() > 30 ? moment().startOf('hour').add(1, 'hour').fromNow(): moment().startOf('hour').add(30, 'minutes').fromNow()
            message.channel.send(await client.translate(`This message is going to be updated in: ${time}`)).then(async a => {
                await new data({
                    channelid: a.channel.id,
                    msgid: a.id
                }).save()
            })
            
        } )
    }
};