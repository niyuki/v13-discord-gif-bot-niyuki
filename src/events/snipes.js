const client = require('../index');
client.snipes = new Map();
client.edits = new Map();

client.on('messageDelete', (message) => {
  if(!message.author || (message.author && message.author.bot)) return;
  let snipes = client.snipes.get(message.channel.id) || [];
  if (snipes.length > 5) snipes = snipes.slice(0, 4);

  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
  });
  client.snipes.set(message.channel.id, snipes);
})

client.on('messageUpdate', (oldMessage, newMessage) => {
  if(!oldMessage.author || (oldMessage.author && oldMessage.author.bot)) return;
	let edits = client.edits.get(oldMessage.channel.id) || [];
	if (edits.length > 5) edits = edits.slice(0, 4);
  
	edits.unshift({
	  msg1: oldMessage,
	  msg2: newMessage,
	  image: newMessage.attachments.first()?.proxyURL || null,
	  time: Date.now(),
	});
	client.edits.set(oldMessage.channel.id, edits);
  })
