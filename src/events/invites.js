const { Collection } = require("discord.js");

const Invite = require("../models/invites");
const Settings = require("../config.json");
const client = global.client;

//#region Invite Manager
const Invites = new Collection();

//#region Load
client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
        guild.invites.fetch().then(_invites => {
            Invites.set(guild.id, _invites);
        }).catch(err => { });
    });
});
client.on("inviteCreate", (invite) => {
    let gi = Invites.get(invite.guild.id);
    gi.set(invite.code, invite);
    Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", (invite) => {
    let gi = Invites.get(invite.guild.id);
    gi.delete(invite.code);
    Invites.set(invite.guild.id, gi);
});
//#endregion

//#region Continuity

client.on("guildCreate", (guild) => {
    guild.invites.fetch().then(invites => {
        Invites.set(guild.id, invites);
    }).catch(e => { })
});

//#endregion

//#region Counter
client.on("guildMemberAdd", async (member) => {
    if (member.bot) return;
    //const gi = new Collection().concat(Invites.get(member.guild.id));
    const gi = (Invites.get(member.guild.id) || new Collection()).clone(),
        settings =  {};
    let guild = member.guild, fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? true : false, channel = guild.channels.cache.get(Settings.invitelog);

    guild.invites.fetch().then(async invites => {        
        let invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_n => invites.has(_n.code)) || guild.vanityURLCode;
        Invites.set(member.guild.id, invites);
        let content = `${member} is joined the server.`, regular = 0, _fake = 0, bonus = 0;
        if (invite == guild.vanityURLCode) content = settings.defaultMessage ? settings.defaultMessage : `-member- joined the server with vanility url. :tada:`;
        else content = settings.welcomeMessage ? settings.welcomeMessage : `The -member-, joined the server using the invitation of the -target-.`;

        if (invite && invite.inviter) {
            await Invite.updateOne({ userID: member.id }, { $set: { "inviterID": invite.inviter.id } }, { upsert: true, setDefaultsOnInsert: true }).exec();

            await Invite.updateOne({ userID: invite.inviter.id }, { $inc: { "Fake": fake ? 1 : 0, "Regular": fake ? 0 : 1 } }, { upsert: true, setDefaultsOnInsert: true }).exec();
            let data = await Invite.findOne({ userID: invite.inviter.id }).exec();
            _fake = data.Fake || 0;
            regular = data.Regular || 0;
            bonus = data.Bonus || 0;

            let im = await guild.members.cache.get(invite.inviter.id);
            //if(im) global.onUpdateInvite(im, guild.id, bonus + regular);
        }

        await Invite.updateOne({ userID: member.id }, { $set: { "IsFake": fake } }, { upsert: true, setDefaultsOnInsert: true }).exec();
        if (channel) {
            content = content
                .replace("-member-", `${member}`)
                .replace("-target-", `${invite && invite.inviter ? invite.inviter : "not found."}`)
                .replace("-total-", `${regular + bonus + fake}`)
                .replace("-regular-", `${regular}`)
                .replace("-fakecount-", `${_fake}`)
                .replace("-invite-", `${invite && invite.code != undefined ? invite.code : "what is that?"}`)
                .replace("-fake-", `${fake}`);
            channel.send(content);
        }
    }).catch();
});

client.on("guildMemberRemove", async (member) => {
    const settings =  {};
    let bonus = 0, regular = 0, fakecount = 0, channel = member.guild.channels.cache.get(Settings.invitelog), content = settings.leaveMessage ? settings.leaveMessage : `${member} has left the server.`,
        data = await Invite.findOneAndUpdate({ userID: member.id }, {}, { upsert: true, setDefaultsOnInsert: true }).exec();

    if (!data) {
        if (channel) {
            content = content
                .replace("-member-", `${member}`);
            channel.send(content);
        }
        return;
    }

    if (data.inviterID) {
        await Invite.updateOne({ userID: data.inviterID }, { $inc: { "Fake": data.IsFake ? -1 : 0, "Regular": data.IsFake ? 0 : -1, "Leave": 1 } }, { upsert: true, setDefaultsOnInsert: true }).exec();
        let inviterData = await Invite.findOne({ userID: data.inviterID });
        fakecount = inviterData.Fake;
        regular = inviterData.Regular;
        bonus = inviterData.Bonus;
    }

    let im = await member.guild.members.cache.get(data.inviterID)
    //if(im) global.onUpdateInvite(im, member.guild.id, bonus + regular);

    if (channel) {
        content = content
            .replace("-member-", `${member}`)
            .replace("-target-", `${data.inviterID ? (im ? im : (await client.users.cache.get(data.inviterID))) : "inviter not found."}`)
            .replace("-total-", `${bonus + regular}`)
            .replace("-regular-", `${regular}`)
            .replace("-fakecount-", `${fakecount}`)
            .replace("-fake-", `${data.IsFake}`);
        channel.send(content);
    }
});
//#endregion