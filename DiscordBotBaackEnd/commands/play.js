module.exports = {
    name: 'play',
    description: 'plays songs',
    aliases: ['pikk'],
	execute(message, args) {
        // if(!args.length) { //1
        //     message.channel.send("you need to provide a link!")
        //     console.log("if //1")
        //     return;
        //     }

           
            if(!message.member.voice.channel) { //2
                message.channel.send("you must be in a channel to play the bot!")
                console.log("if //2")
                return;
            }

            // if(!global.servers[global.serverID]) {  //3
            //     global.servers[global.serverID] = {
            //         queue: []
            //     }
            //     console.log("if //3")
            // } 
            
            // global.server.queue.push(args[0]);
            
            
            // if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){//4
            //     console.log("if //4")
            //     play(connection, message);
            // });

            

            

            // global.server.shift();
            // global.server.dispatcher.on("end", function())

          
	},
};

// function play(connection, message) {
    // global.server = global.servers[global.serverID]
//     console.log("global.server.queue: " + global.server.queue);
//     console.log("global.server.queue: " + global.server.queue[1]);
//     console.log("global.sever: " + global.server);


//     // message = message.content.substring(PREFIX.length).split(" ");
  

//     global.server.dispatcher = connection.play(global.ytdl(global.server.queue[0], {filter: "audioonly"}))
    
//     global.server.dispatcher.on('error', (err) => console.log(err)); // tror ikke denne funksjonen gjør noe per nå
//     global.server.queue.shift();


//     global.server.dispatcher.on("finish", () =>{
//         if(global.server.queue[0]){
//             play(connection, message)
//         } else {
//             // connection.disconnect();
//             return;
//         }
//     })

  
    

// }
