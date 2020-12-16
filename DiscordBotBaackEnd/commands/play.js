module.exports = {
    name: 'play',
    description: 'plays songs',
    aliases: ['pikk'],
	execute(message, args) {
        if(!args.length) {
                message.channel.send("you need to provide a link!")
                return;
            }

           
            if(!message.member.voice.channel) {
                message.channel.send("you must be in a channel to play the bot!")
                return;
            }

            if(!global.servers[message.guild.id]) global.servers[message.guild.id] = {
                queue: []
            }
            global.server = global.servers[message.guild.id];
            global.server.queue.push(args[0]);
            

            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message, args);
            });

            

            

            // global.server.shift();
            // global.server.dispatcher.on("end", function())

          
	},
};

function play(connection, message, args) {
    global.server = global.servers[message.guild.id]
    console.log("global.server.queue: " + global.server.queue);
    console.log("global.sever: " + global.server);

    console.log("args før: " + args[0])
    // message = message.content.substring(PREFIX.length).split(" ");
  

    global.server.dispatcher = connection.play(global.ytdl(global.server.queue[0], {filter: "audioonly"}))
    
    global.server.dispatcher.on('error', (err) => console.log(err));

    global.server.queue.shift();


    global.server.dispatcher.on("finish", () =>{
        if(global.server.queue[0]){
            play(connection, message, args)
        } else {
            // connection.disconnect();
            return;
        }
    })

  
    

}
