const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const {translate} = require('bing-translate-api');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/src/commands/*/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/src/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    const { guildId } = require('../config.json')
    client.on("ready", async () => {
        // Register for a single guild
        if(guildId) await client.guilds.cache
                .get(guildId)
                .commands.set(arrayOfSlashCommands);
        
        // Register for all the guilds the bot is in
        else await client.application.commands.set(arrayOfSlashCommands);
    });
    
    client.translate = async(text) => {
        const lang = client.config.language ? client.config.language : 'en'
        //const translated = await translate(text, 'en', lang);
        return text;
    }
    //----------SYSTEMS ( DONT TOUCH )
const schema = require('../models/schema')
client.total = (User) => new Promise(async ful => {
    const data = await schema.findOne({ User });
    if(!data) return ful(0);
    ful(data.Total)
})
client.gif = (User, Gif, Total) => {
    schema.findOne({ User }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Gif += Gif;
            data.Total += Gif;
        } else {
            data = new schema({ User, Gif, Total })
        }
        data.save();
    })
}
client.gifcount = (User) => new Promise(async ful => {
    const data = await schema.findOne({ User });
    if(!data) return ful(0);
    ful(data.Gif)
})
client.pp = (User, Pp, Total) => {
    schema.findOne({ User }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Pp += Pp;
            data.Total += Pp;
        } else {
            data = new schema({ User, Pp, Total })
        }
        data.save();
    })
}
client.ppcount = (User) => new Promise(async ful => {
    const data = await schema.findOne({ User });
    if(!data) return ful(0);
    ful(data.Pp)
})
client.bal = (User) => new Promise(async ful => {
    const data = await schema.findOne({ User });
    if(!data) return ful(0);
    ful(data.Coins)
})
client.add = (User, Coins) => {
    schema.findOne({ User }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Coins += Coins;
        } else {
            data = new schema({ User, Coins })
        }
        data.save();
    })
}
client.rmv = (User, Coins) => {
    schema.findOne({ User }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.Coins -= Coins;
        } else {
            data = new schema({ User, Coins: -Coins })
        }
        data.save();
    })
}
const invitesx = require('../models/invites')
client.inviter = (userID) => new Promise(async ful => {
    const data = await invitesx.findOne({ userID });
    if(!data) return ful(0);
    ful(data.inviterID)
})
client.regular = (userID) => new Promise(async ful => {
    const data = await invitesx.findOne({ userID });
    if(!data) return ful(0);
    ful(data.Regular)
})
client.fake = (userID) => new Promise(async ful => {
    const data = await invitesx.findOne({ userID });
    if(!data) return ful(0);
    ful(data.Fake)
})
client.bonus = (userID) => new Promise(async ful => {
    const data = await invitesx.findOne({ userID });
    if(!data) return ful(0);
    ful(data.Bonus)
})
client.leave = (userID) => new Promise(async ful => {
    const data = await invitesx.findOne({ userID });
    if(!data) return ful(0);
    ful(data.Leave)
})
    
    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};
