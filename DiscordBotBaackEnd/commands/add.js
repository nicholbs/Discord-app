module.exports = {
	name: 'add',
    description: 'adds a song to queue',
    aliases: ['adderino'],
	execute(message, args) {
        if(!global.servers[message.guild.id]) global.servers[message.guild.id] = {
            queue: []
        }
        global.server = global.servers[message.guild.id];
        global.server.queue.push(args[0]);
        console.log("global.server.queue" + global.server.queue)

        return message.channel.send(`You have added song`)
	},
};