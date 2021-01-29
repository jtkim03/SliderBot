
module.exports = {
	name: 'stop',
	description: 'makes slider bot leave the voice channel',
	async execute(message, args) {

        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to execute this command.')
        }

        await voiceChannel.leave()
		message.channel.send("Goodnight kiddos :wave:")
	},
};