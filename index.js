const Discord = require('discord.js');
const YTDL = require("ytdl-core");

const bot = new Discord.Client();

const token = 'NjMyNDIwNTEwNjkyNjcxNDk4.XaX_eA.NTm7zKBEtzdYuU8m3p-KVeBXirY';
//const SKIP_BOTS = False;

const PREFIX = '!';

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));
    //server.dispatcher = connection.playFile('C:\Users\aaron\Desktop\Discord Bot\imBack.mp3');

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connecction, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "goodluck"
];

var servers = {};

bot.on('ready', () => {
    console.log('This bot is online!');
})

bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " welcome back boy");

    member.addRole(member.guild.roles.find("names", "test 123"));
    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function (role) {
        member.addRole(role);
    });

});

bot.login(token);


bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.channel.sendMessage("pong!");
            break;
        case 'website':
            message.channel.sendMessage("https://www.cosc.brocku.ca/~am17ka/A1/index.html");
            break;
        case 'info':
            if (args[1] === 'version') {
                message.channel.sendMessage('version 1.0.1, created by the mighty chungus lord');
            }
            else {
                message.channel.sendMessage('invalid argument');
            }
            break;
        case 'clear':
            if (!args[1]) return message.reply('error please define second arg');
            message.channel.bulkDelete(args[1]);
            break;
        case 'join':
            message.member.voiceChannel.join().then(function (connection) {

            });
            break;
        case '8ball':
            if (args[1]) {
                message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)])
            }
            else {
                message.channel.sendMessage("Can't read");
            }
            break;
        case "embed":
            var embed = new Discord.RichEmbed()
                //.setDescription("Hello, this is an awesome")
                .addField("Test title", "test desc")
                .setColor(0x00FFFF)
                .setFooter("This message is pretty cool")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);

            break;
    
        case "removeRole":
            message.member.removeRole(message.member.guild.roles.find("names", "test123"));
            break;
        case "deleteRole":
            message.guild.roles.find("name", "test123").delete();
            break;

        case "play":

            if (!args[1]) {
                message.channel.sendMessage("Please prvoide a link!")
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("You must be in a voice channel");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);
            });

            break;

        case "skip":

            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop":
            if (message.guild.voiceConnection) {
                for (var i = server.queue.length - 1; i >= 0; i--) {
                    server.queue.splice(i, 1);
                }
                server.dispatcher.end();
                console.log("[" + new Date().toLocaleString() + "] Stopped the queue.");
            }
            break;
     
        case "list":

            console.log("made it here")
            var u, user;
            for (u in bot.users) {
                user = bot.users[u];
                if (user instanceof Discord.User) console.log("[" + u + "] " + user.username); //message.channel.sendMessage console.log

            }
            console.log("made it here2")

            break;

        case "imBack":
            break;

        case "kick":

            const name = message.mentions.users.first();

            if (name) {
                const member = message.guild.member(name);

                if (member) {
                    member.kick('You where kicked for trolling!').then(() => {
                        message.reply(`Sucessfully kicked ${name.tag}`)
                    }).catch(err => {
                        message.reply("I was unable to kick the member");
                        console.log(err)
                    })
                }
                else {
                    message.reply("That user isn\'t in the guild");

                }
            }

            else {
                message.reply('you need to specify a person');
            }


            break;

        case "ban":
            
            const banUser = message.mentions.users.first();

                if (banUser) {
                    const member = message.guild.member(banUser);
    
                    if (member) {
                        
                        member.ban({ression: 'nothing to see here'}).then(() =>{
                            message.reply(`WE GOT EMM ${banUser.tag}`);
                        }).catch(err => {
                            message.reply("I was unable to kick the member");
                            console.log(err)
                        })
                    }
                    else {
                        message.reply("That user isn\'t in the guild");
    
                    }
                }
    
                else {
                    message.reply('you need to specify a person');
                }

            break;

        case "nuke":
            
                //console.log(bot.guild.members);
                var membersArray = test.members.array();

            for(var guildMemberId in membersArray) {
                console.log(guildMemberId, membersArray[guildMemberId].user.username);
            }
        
               break;

        
    }
})


