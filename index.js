const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json')
const path = require('path')
const fs = require('fs')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const queue = new Map();

client.once('ready', () => {
    console.log('Slider Bot is online!');
});

client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        message.reply("I'm sorry, I didn't quite understand that. Use !help for a list of available commands");
        return;
    }

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }

})


client.login(token);