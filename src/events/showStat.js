const client = require('../index')

client.on('interactionCreate', async i => {
    if(!i.isButton()) return;
    let num;
    switch(i.customId) {
        case 'userpp': 
            num = await client.ppcount(i.user.id)
            await i.reply({content: await client.translate(`You have sent ${num} PPs in total..` ,i), ephemeral: true})
        return;
        case 'usergif':
            num = await client.gifcount(i.user.id)
            await i.reply({content: await client.translate(`You have sent  ${num} GIFs in total..` ,i), ephemeral: true})
        return;
        case 'usertotal':
            num = await client.total(i.user.id)
            await i.reply({content: await client.translate(`You have currently a total of ${num} when we include PP & Gif` ,i), ephemeral: true})
        return;
        case 'usercoins':
            num = await client.bal(i.user.id)
            await i.reply({content: await client.translate(`You have currently ${num} amount of coins..` ,i), ephemeral: true})
        return;
    }
})