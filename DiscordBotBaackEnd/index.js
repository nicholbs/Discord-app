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

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}






// client.once('ready', () => {
//     console.log('Ready!');
//     var channelID = "778704209230430248";
//     const channel = client.channels.cache.get("778704209230430248");
//     channel.join()
// });



client.on("ready", () => {
    const channel = client.channels.cache.get("778704209230430248");
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
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());                //parse JSON bodies (as sent by API clients)
app.use(cors())


app.get('/getSongQue', function (req, res) {
    console.log("app.get('/')")
    // client.channels.cache.find(channel => channel.name === 'spam').send("!np"); // for discord v12

    
    // res.writeHead(200, { 'Content-Type': 'application/json' });

    var que = JSON.stringify( {
        sang1: {
          navn: "Never gonna give you upp", 
          artist: "Rick Astley" 
        },
        sang2: {
          navn: "Good Morning", 
          artist: "Kanye West" 
        },
        sang3: {
          navn: "Perkele", 
          artist: "keryue" 
        }
        
      })
    res.send(que)
})
 

app.get('/playQue', function (req, res) {
    console.log("/playQue");

    var answer = JSON.stringify({
        result: "ok"
        })

    //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    client.channels.cache.get('780561905877385226').send('|play https://www.youtube.com/watch?v=fsbpWD-bAC0'); // put kommano for å spille que her istedenfor linken



    res.send(answer);
})

app.listen(8000)
// -------------------------------------Nettside Back_end slutt--------------------------