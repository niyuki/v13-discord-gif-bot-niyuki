const config = require('../config.json')
const client = global.client
client.on('guildMemberAdd', async(member, message) => {
    let welcome = client.channels.cache.get(config.channellist.chat);
    if(member.user.bot) {
        member.roles.add(config.rolelist.BotRole)
        let x = await client.translate(`${member} is a Bot. Feel free to use it in <#${config.channellist.botcommands}>`)
        welcome.send(x)
    } else {
        member.roles.add(config.rolelist.Sharer)
    }
});