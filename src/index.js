const { Client, Collection } = require("discord.js");

const client = global.client = new Client({
    intents: 32767,
    partials: [ 'CHANNEL', 'MESSAGE', 'USER'] 
});
module.exports = client;

// Global Variables
client.bannerData = new Map();
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
