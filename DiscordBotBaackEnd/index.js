// -------------------------------------Discord bot start--------------------------------
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();


const ytdl = require('ytdl-core');

global.servers = {};
global.ytdl = ytdl;
global.server;
global.serverID = "788612048740941876"
global.spamID = "780561905877385226"

if(!global.servers[global.serverID]) {  //5
    global.servers[global.serverID] = {
        queue: []
    }
    console.log("if //5")
} 
global.server = global.servers[global.serverID];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on("ready", () => {
    const channel = client.channels.cache.get(global.serverID);
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
    }).catch(e => {

        // Oh no, it errored! Let's log it to console :)
        console.error(e);
    });
});


client.on('message', message => {
    console.log("Nå kom en melding: " + message)
    if (!message.content.startsWith(prefix)){
        return;
    } 
    // || message.author.bot)       //Legg på denne dersom det er ønskelig at robot ikke skal reagere på egne meldinger

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) { 
    return message.reply('that\'s not a valid command!');
    }


    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }


    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
        	reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        	}
        
        	return message.channel.send(reply);
            }


        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

});


client.login(token);


// ----------------------------- Discord bot slutt

// -------------------------------------Nettside Back-end start-----------------------
const express = require('express');
const app = express();
const cors = require('cors');
var MySql = require('mysql');

var DB = MySql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'discord'
})

DB.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Connected to Mysql database!");
  });

app.use(express.json());                //parse JSON bodies (as sent by API clients)
app.use(cors())


app.get('/getSongQue', function (req, res) {
    console.log("app.get('/')")
    // client.channels.cache.find(channel => channel.name === 'spam').send("!np"); // for discord v12

    
    // res.writeHead(200, { 'Content-Type': 'application/json' });
  
    // var que = JSON.stringify( {
    //     sang1: {
    //       navn: "Never gonna give you upp", 
    //       artist: "Rick Astley" 
    //     },
    //     sang2: {
    //       navn: "Good Morning", 
    //       artist: "Kanye West" 
    //     },
    //     sang3: {
    //       navn: "Perkele", 
    //       artist: "keryue" 
    //     }
        
    //   })

    DB.query('SELECT * FROM `sanger`', function (err, result) {
        if (err) {
          res.status(400).send('Error in database operation.');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }
      })
})
 

app.get('/playQue', function (req, res) {
    console.log("-----/playQue------");

    var answer = JSON.stringify({
        result: "ok"
        })

    //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    client.channels.cache.get(global.spamID).send('|play'); // put kommano for å spille que her istedenfor linken



    res.send(answer);
})

app.get('/addToQue', function (req, res) {
    console.log("----/addToQue-------");

    var answer = JSON.stringify({
        result: "ok"
        })

    //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    client.channels.cache.get(global.spamID).send('|add https://www.youtube.com/watch?v=fsbpWD-bAC0'); // put kommano for å spille que her istedenfor linken


    res.send(answer);
})


app.get('/skipQue', function (req, res) {
    console.log("----/skipQue-----");
    console.log("que før skip: " + global.server.queue)
    global.server.queue.shift();
    console.log("que etter skip: " + global.server.queue)
    var answer = JSON.stringify({
        result: "ok"
        })

    //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    client.channels.cache.get(global.spamID).send('|skip'); // put kommano for å spille que her istedenfor linken


    res.send(answer);
})


app.get('/stopQue', function (req, res) {
    console.log("------/stopQue--------");
    console.log("que før stop: " + global.server.queue)
   
    for(var i = global.server.queue.length -1; i >=0; i--) {
        global.server.queue.splice(i, 1);
    }
    if(global.server.dispatcher) {
        console.log("dispatcher destroy")
        global.server.dispatcher.destroy();
    }
    
    // client.dispatcher.end()
    console.log("que etter stop: " + global.server.queue)
    var answer = JSON.stringify({
        result: "ok"
        })

    //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    client.channels.cache.get(global.spamID).send('|stop'); // put kommano for å spille que her istedenfor linken


    res.send(answer);
})

app.listen(8000)
// -------------------------------------Nettside Back_end slutt--------------------------