const { Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name : 'punch',
    category : 'fun',
    timeout: 1000,
    description : 'punchs the person',
    hidden: true,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        
        const author = message.mentions.users.first() ||  message.member;
        const user = message.mentions.members.first() || message.member;
        const member = message.mentions.members.first() || message.member;


    const gifs = [
        "https://4.bp.blogspot.com/-XH0j95CLq2U/WmGtoTAdkzI/AAAAAAAABIQ/T317UiP1H3M-ackBsPMZ5fOD40b9hdrKwCLcBGAs/s1600/saitama.gif",
        "https://gifimage.net/wp-content/uploads/2017/09/anime-punch-in-the-face-gif-3.gif",
        "https://3.bp.blogspot.com/-IvE6RqOlJYI/WcdL3KhiyLI/AAAAAAAA8JU/EtPkrIF-rKsIwCRYc3V7qY5lhaw_YI8PACKgBGAs/w530-h298-p/Omake%2BGif%2BAnime%2B-%2BBoku%2Bno%2BHero%2BAcademia%2B-%2BEpisode%2B37%2B-%2BAll%2BMight%2BGut%2BPunches%2BBakugo.gif",
        "https://images-ext-2.discordapp.net/external/-dXpIvVep6lnyJ_o8gAIwOKmgU65Cwy3LJj-5k6hZ2s/https/cdn.zerotwo.dev/PUNCH/b598cde0-b9e5-402d-b812-0fea4db5c504.gif?width=320&height=177",
        "https://images-ext-2.discordapp.net/external/D947x7efgXCJVU33YY_raDAuiAlHnPs1XQ132M_ivsQ/https/cdn.zerotwo.dev/PUNCH/0b9fae85-4041-401f-81eb-87c4aec3a4f8.gif?width=320&height=180",
        "https://images-ext-2.discordapp.net/external/hDT1d7ExzFjAV0r5DCU1lK-ULMBEXgt3zF8J6tn3wrM/https/cdn.zerotwo.dev/PUNCH/be6f7f4c-a984-414f-b558-792ea116d65f.gif?width=320&height=179",
        "https://cdn.zerotwo.dev/PUNCH/2a662a87-e119-4d3e-bc31-bc93140402dc.gif",
        "https://images-ext-1.discordapp.net/external/HOpWiASo62Rt68wKTh5Pu0JZZrDYpvI34K9MrhQ01N4/https/cdn.zerotwo.dev/PUNCH/84c082d0-24e7-491e-bcfc-be03ee46125c.gif?width=320&height=180",
        "https://images-ext-2.discordapp.net/external/taSfrw0y3I2Px3YsDk0i-jJVoMqRAcU29zhRHkOfwIw/https/cdn.zerotwo.dev/PUNCH/012705bc-273f-4c56-9184-d1439879d2f6.gif?width=320&height=128",
        "https://images-ext-2.discordapp.net/external/7jNEJnOAKjVDp2mKWFR8wLye17mJhRiJAsVwU7LPamA/https/cdn.zerotwo.dev/PUNCH/38a3ab62-17f4-4682-873a-121e886d7bce.gif?width=320&height=180",
        "https://images-ext-1.discordapp.net/external/OdQP20q5w7-4T9Sz-pIcujClLfUYGAaHs5eG7RfWGss/https/cdn.zerotwo.dev/PUNCH/5b8db0aa-b7b3-4314-bd17-090fe9b61358.gif?width=320&height=175",
        "https://cdn.zerotwo.dev/PUNCH/2bc5bde1-4d21-4bc5-9741-6fd7ef746799.gif",
        "https://images-ext-1.discordapp.net/external/UGHQiHbu6uS7bTtwSrqTQ22fJlx8WnmQR_N5vFc6pMA/https/cdn.zerotwo.dev/PUNCH/65dff3c3-98b4-4e45-bcf2-cefccdf9f5d7.gif?width=320&height=180"



        ]
        
        const index = Math.floor(Math.random() * gifs.length);
        const gif = gifs[index];


               
   
        
                message.channel.send({embeds: [new MessageEmbed()
                    .setTitle(`${message.author.tag} punched ${member.user.tag}`)
                    .setImage(gif)
                    .setColor(config.embedColor)
        
                ]})}
                }

   