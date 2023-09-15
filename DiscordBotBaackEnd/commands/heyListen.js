module.exports = {
	name: 'heyListen',
    description: 'Voice recognition',
    aliases: ['heyListen'],
	execute(message, args) {
        if(!global.servers[message.guild.id]) global.servers[message.guild.id] = {
            queue: []
        }
        global.server = global.servers[message.guild.id];
        global.server.queue.push(args[0]);
        console.log("global.server.queue inni add modul " + global.server.queue)

        return message.channel.send(`You have added song`)
	},
};