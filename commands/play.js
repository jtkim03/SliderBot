const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
	name: 'play',
	description: 'Joins and plays a song from youtube',
	async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to execute this command.')
        }
        
        const connection = await voiceChannel.join();
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        const video = await videoFinder(args.join(" "));

        if(video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            const dispatcher = connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
            });

            await message.reply(`:microphone: Now Playing: ***${video.title}***`)
        }
        else {
            message.channel.send("No video results found")
        }
    }
}