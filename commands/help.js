const Discord = require('discord.js');

module.exports = {
    name: 'help',
    execute(message,args) {
        const logo = 'https://d.newsweek.com/en/full/1583752/kk-slider-animal-crossing-new-horizons.jpg?w=1600&h=1200&l=51&t=45&q=88&f=ccb825c952cb722c395a13f16b9f0344'
        const help = new Discord.MessageEmbed()
            .setTitle("Music Help")
            .setAuthor(`Slider Bot`)
            .setThumbnail(logo)
            .addFields(
                {
                    name:'~play [youtube video name]',
                    value: 'Searches youtube for a song and plays it',
                },
                {
                    name:'~stop',
                    value: 'Stops the currently playing music',
                },
                {
                    name:'~hourly',
                    value: 'Plays the hourly theme from Animal Crossing: New Leaf',
                }
            )
        
        message.channel.send(help)
        },
}

