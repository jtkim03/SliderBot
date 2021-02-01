function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
//TODO: add bell chime between theme changes
module.exports = {
    name: 'hourly',
    description: 'Plays hourly theme',
    async execute(message, args) {

        const serverQueue = new Map();
        const voiceChannel = message.member.voice.channel;

        const connection = await voiceChannel.join();
        var hour = new Date().getHours();
        var time = formatAMPM(new Date)
        tracker = []
        //plays looped part of song, recursively calling itself
        function play(tracker) {
            var hour_now = new Date().getHours();
            if (hour_now !== hour) {
                tracker.pop();
                hour = hour_now
                time = formatAMPM(new Date)
                message.channel.send(`:microphone: It is now ` + time)
            }
            if (tracker.length == 0 && (hour === 4 || hour === 7 || hour === 13 || hour === 21 || hour === 17)) {
                    connection.play(`./hourly/${hour}_intro.mp3`).on('finish', () => {
                        tracker.push('x');
                        play(tracker);
                    })
                }
            else {
                connection.play(`./hourly/${hour}.mp3`)
                    .on('finish', () => {
                        play(tracker)
                    });
            }
        }

        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to execute this command.')
        }

        voiceChannel.join().then(connection => {

            play(tracker);

        })

        await message.channel.send(`:microphone: It is now ` + time)
    }
}
