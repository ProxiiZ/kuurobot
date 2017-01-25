var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.user.id, member.user);

    if(newUsers[guild.id].size > 1) {
        var userlist = newUsers[guild.id].map(u => u.mention()).join(" ");
        guild.channels.get(guild.id).sendMessage("Welcome our new user!\n"+userlist);
        newUsers[guild.id] = new Discord.Collection();
    }

    bot.on("guildMemberRemove", (member) => {
        const guild = member.guild;
        if(newUsers[guild.id].exists("id", member.user.id)) newUsers.delete(member.user.id);
    });

});

bot.on("message", msg => {
    // Set the prefix
    let prefix = "~";
    // Exit and stop if it's not there
    if (!msg.content.startsWith(prefix)) return;

    //new check:
    if (msg.author.bot) return;
    // command section: add commands here.
    if (msg.content.startsWith(prefix + "ping")) {
        msg.channel.sendMessage("pong!");
    }
    else if (msg.content.startsWith(prefix + "doge")) {
        msg.channel.sendMessage("bork")
    }
    else if (msg.content.startsWith(prefix + "oppai")) {
        msg.channel.sendMessage("https://media.tenor.co/images/4b632c2d70f83b989c6a4539cab0a353/tenor.gif ")
    }
});

        

bot.on('ready', () => {
    console.log('I am ready!')
    bot.user.setGame("Unplugging your Gran's Life Support...")
    });
bot.on('error', e => { console.error(e); });
bot.login("REDACTED");
