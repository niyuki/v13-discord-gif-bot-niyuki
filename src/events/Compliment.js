const client = global.client;
const config = require('../config.json')

let compliments = [ 'I want no one to notice the heavens hidden in your eyes but me.', 'Your blue eyes have become the sky.', 'You are born like a moon to my dark nights with your glowing eyes.', 'You smell of tranquility.', 'You have such a stature of beauty that even the poets who saw you would write poetry for days on behalf of you.', 'Even the roses would be jealous of your own beauty when they see you.', 'You are an unwritten poem, unparalleled before.', 'My name is on the poet.' ,'No one is aware that you are a poem yet.', 'I learned the concept of effective smile from you.', 'I can not find words to express you. I can not explain you to anyone because I do not know how to explain it.', 'You brought spring with your eyes to my strange heart.', 'Every flower in my garden blossoms with your smile.', 'Your arms smell of home. When you embrace yourself, you get to settle down.', 'You are the sole owner of all the songs in this world. All songs and poems are written to you. Your name is mentioned in every word.', 'I carry you in my heart, what a word to carry on my back. Iam ready to carry your burden all my life, in every sense, to come into my life and make all the important things in my life count. You are all I care about now.", "You are my greatest prayer in this life. Your eyes are like a moon. You shine light on my dark nights.', 'Living in the same time zone is a great reward for me.', 'Could you please wear people around you?', 'You are a horrible person! But I still love you', 'Your eyes light the way to my heart. Only you can see my heart. And only I can feel how you feel about me.', 'Never Mind That, come over to us and drink two beers.', 'You are so mad as a rock but OK... You know you are hand-in-hand.', 'Niyuki loved you so much...', 'I was talking about miracles.'];
let compliment;

client.on("messageCreate", async message => {
    if(message.channel.id !== config.channellist.chat) return;
    compliment++
    if(compliment >= 50) {  
      compliment = 0;  
      const random = Math.floor(Math.random() * ((compliments).length - 1) + 1);
      message.reply(await client.translate(`${(compliments)[random]}`, message));
    };
  });