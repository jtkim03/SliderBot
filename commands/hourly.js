function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//TODO: add loops and theme changes
module.exports = {
	name: 'hourly',
	description: 'Plays hourly theme',
	async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to execute this command.')
        }

        const connection = await voiceChannel.join();
        var hour = new Date().getHours();
        time = formatAMPM(new Date)
            
            const dispatcher = connection.play(`./hourly/${hour}.mp3`)
            .on('finish', () => {
                voiceChannel.leave();
            });

            await message.channel.send(`:microphone: It is now ` + time)
    }
}