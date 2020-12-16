// const ytdl = require('ytdl-core');
// const server = require('./server');

// module.exports = {
// 	name: 'youtube',
//     description: 'Information about the arguments provided.',
//     args: true,
//     usage: '<youtube link>',
// 	execute(message, args) {
//         if (args == 'stop') {
//             message.member.voice.channel.join()
//         }

//         message.member.voice.channel.join().then(connection => {
//             const stream = ytdl(`${args}`, { filter: 'audioonly' });
//             const dispatcher = connection.play(stream);
            
//             dispatcher.on('finish', () => voiceChannel.leave());
//         })
// 	},
// };


//Putt denne i index.js istedenfor slik at du kan holde på dispatcher objectet og kalle på end dersom noen sier stop.