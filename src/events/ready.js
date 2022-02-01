
const { red, green, blue, yellow, cyan } = require('chalk'); // npm i chalk (you can use colors too)
const client = require('../index')
const db = require('../models/role')
const config = require('../config.json')
client.on('ready', () => {

    //--------BOT PRESENCE STATUS
    setInterval(() => {
        let x = [`Niyuki 💞 respect`, `respect 💓 Niyuki`, `Niyuki 💗 respect`, `respect 💖 Niyuki`, `Niyuki 💘 respect`, `respect 💝 Niyuki`]
  let random = x[Math.floor(Math.random()* x.length)];
        client.user.setPresence({ activities: [{ name: `${random}`, type: 'COMPETING' }], status: "dnd" });

      }, 30000);

      setInterval(async () => {
          const data = await db.find({ })
          data.forEach(async a => {
              if(!a || !a.length) return;
              if(Date.now() >= a.Time) {
                  const member = client.guilds.cache.get(config.guildId).members.cache.get(a.User)
                  if(!member || !member.roles.cache.get(b.Role)) return;
                  member.roles.remove(a.Role).then(async a => member.send(await client.translate(`Looks like I have to take a color role from you.. To be honest it was a great time seeing you in different colors. May see you soon again with other colors if you buy from shop..`)).catch(console.log))
                  await db.findOneAndDelete({ User: member.id, Role: a.Role })
              }
          })
      }, 1000*60*5);
    const loading = String.raw`
                  __         ______   __    __  __    __   ______   __    __  ______  __    __   ______  
                 /  |       /      \ /  |  /  |/  \  /  | /      \ /  |  /  |/      |/  \  /  | /      \ 
                 $$ |      /$$$$$$  |$$ |  $$ |$$  \ $$ |/$$$$$$  |$$ |  $$ |$$$$$$/ $$  \ $$ |/$$$$$$  |
                 $$ |      $$ |__$$ |$$ |  $$ |$$$  \$$ |$$ |  $$/ $$ |__$$ |  $$ |  $$$  \$$ |$$ | _$$/ 
                 $$ |      $$    $$ |$$ |  $$ |$$$$  $$ |$$ |      $$    $$ |  $$ |  $$$$  $$ |$$ |/    |
                 $$ |      $$$$$$$$ |$$ |  $$ |$$ $$ $$ |$$ |   __ $$$$$$$$ |  $$ |  $$ $$ $$ |$$ |$$$$ |
                 $$ |_____ $$ |  $$ |$$ \__$$ |$$ |$$$$ |$$ \__/  |$$ |  $$ | _$$ |_ $$ |$$$$ |$$ \__$$ |
                 $$       |$$ |  $$ |$$    $$/ $$ | $$$ |$$    $$/ $$ |  $$ |/ $$   |$$ | $$$ |$$    $$/ 
                 $$$$$$$$/ $$/   $$/  $$$$$$/  $$/   $$/  $$$$$$/  $$/   $$/ $$$$$$/ $$/   $$/  $$$$$$/  
                                                                                                                                                                                                      
`;

const backslash = String.raw` \ `;
const prefix = client.config.prefix;

console.log(red(`Starting ${client.user.tag}, hold on ...`))
console.log(red(loading))

console.log(``);
console.log(green(`                                                     my cute bot`));
console.log(``);
console.log(``);
const { readdirSync } = require('fs');
const ascii = require('ascii-table')

let table = new ascii("Slash-Command");
table.setHeading('Slash-Command', ' Load status');
let table2 = new ascii("Commands");
table2.setHeading('Command', ' Load status');

    // Load Status
    readdirSync('./src/commands/').forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                table2.addRow(file, '✅')
            } else {
                table2.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }
        }
    });
    // Load Status
    readdirSync('./src/SlashCommands/').forEach(dir => {
        const commands = readdirSync(`./src/SlashCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../SlashCommands/${dir}/${file}`);
            if (pull.name) {
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }
        }
    });
    console.log(yellow('               + ================================Commands========================================== +'));
    console.log(cyan(table2.toString()));
    console.log(yellow('               + ================================Slash Commands========================================== +'));
    console.log(cyan(table.toString()));
console.log(cyan(`                       Author   [i] :: Programmed by respect    :: © 2021 Development                   `));
console.log(cyan(`                       Bot info [i] :: Status                       :: ✅ Online                           `));
console.log(cyan(`                                [i] :: Prefix                       :: ${prefix}                           `));
console.log(cyan(`                       Users    [i] ::                              :: ${client.users.cache.size}  Users   `));
console.log(cyan(`                       Guilds   [i] ::                              :: ${client.guilds.cache.size} Guilds  `));
console.log(yellow('               + ================================Website=========================================== +'));
console.log(cyan(`                       Link     [i] ::        niyuki.xyz          ::  Website                          `));


    
console.log(red("Press [CTRL + C] to stop the Terminal ..."))
})