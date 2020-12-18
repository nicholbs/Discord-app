// -------------------------------------Discord bot start--------------------------------
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, apiKey} = require('./config.json');
const fetch = require('node-fetch');

const client = new Discord.Client();
client.commands = new Discord.Collection();


const ytdl = require('ytdl-core');
var botConnection;



var server;
var serverID = "788612048740941876"
var spamID = "780561905877385226"
var dispatcher;
var queue = [];
var bleForrigeSangSkippet = false;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on("ready", () => {
    const channel = client.channels.cache.get(serverID);
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        botConnection = connection;
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
const { title } = require('process');

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

    DB.query('SELECT * FROM `sanger`', function (err, result) {
        if (err) {
          res.status(400).send('Error in database operation.');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }
      })
})
 

app.get('/playQue', function (req, res, next) {
    console.log("-----/playQue------");

    var answer = JSON.stringify({
        result: "ok"
    })

    DB.query('SELECT `link` FROM `sanger`', function(err, result) {
        if (err) {
            console.log("error i play")
            res.status(400).send('Error in database operation.');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            JSON.stringify(result);
            queue = Object.values(result)
            // res.writeHead({ 'Content-Type': 'application/json' });
            // res.send(answer);
            play()
            res.end(JSON.stringify(result));
        }
    })
       
})


   
function play() {
    if (queue.length != 0) {
        dispatcher = botConnection.play(ytdl(queue[0].link, {filter: "audioonly"}));
  
        queue.shift();
        bleForrigeSangSkippet = false;
        dispatcher.on("finish", () =>{
        if(queue.length != 0){
            console.log("queue er ikke tom")
            play()
        } else if(queue.length == 0) {
            console.log("queue er tom")
        }
     });
    }
    else {
    console.log("queue er tom")
    }
}

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
    console.log("app.get('/skipQue");
    if (queue.length != 0) {
        if (bleForrigeSangSkippet == true) {
            queue.shift();
        } 
        bleForrigeSangSkippet = true;
        if (queue.length != 0) {
            dispatcher = botConnection.play(ytdl(queue[0].link, {filter: "audioonly"}));
        }
        // queue.shift();
    } else if (queue.length == 0) {
        dispatcher.destroy();
    }
    var answer = JSON.stringify({
        result: "ok"
        })

    res.send(answer);
})

app.post('/removeSong', function (req, res) {
    console.log("app.get('/removeSong: " + req.body.indeks);
    var answer = JSON.stringify({
        result: "ok"
        })
        

        DB.query('DELETE FROM `sanger` WHERE `indeks`=' + req.body.indeks, function(err, result) {
            if (err) {
                console.log("error i play")
            } else {
                // res.writeHead(200, { 'Content-Type': 'application/json' });
                DB.query('ALTER TABLE `sanger` DROP `indeks`', function(err, result) {
                    if (err) {
                        console.log("error i play")
                    } else {
                        DB.query('ALTER TABLE `sanger` ADD column `indeks` INT unsigned primary KEY AUTO_INCREMENT FIRST;', function(err, result) {
                            if (err) {
                                console.log("error i play")
                            } else {
                                res.end(answer);
                            }
                        })
                    }
                })
            }
        })

        
        
})

app.post('/orderDown', function (req, res) {
    console.log("app.post('/orderDown: " + req.body.indeks);
    var answer = JSON.stringify({
        result: "ok"
        })
        // req.body.indeks += 1;
        var sangUnder = req.body.indeks;
        sangUnder += 1;
        console.log("req.body.indeks: " + req.body.indeks)
        console.log("sangUnder: " + sangUnder)
        if (req.body.indeks != 0) {

            DB.query('UPDATE `sanger` SET `indeks`= 0 WHERE `indeks` =' + sangUnder, function(err, result) {
                if (err) {
                    console.log("error i play")
                } else {
                    
                    DB.query('UPDATE `sanger` SET `indeks`=' + sangUnder + ' WHERE `indeks` =' + req.body.indeks, function(err, result) {
                        if (err) {
                            console.log("error i play")
                        } else {
                            DB.query('UPDATE `sanger` SET `indeks`=' + req.body.indeks + ' WHERE `indeks` =0', function(err, result) {
                                if (err) {
                                    console.log("error i play")
                                } else {
                                    res.end(answer);
                                }
                            })
                        }
                    })
                }
            })
        } else {
            console.log("req.body.indeks er null: " + req.body.indeks)
        }
            
})

app.post('/orderUpp', function (req, res) {
    console.log("app.post('/orderUpp: " + req.body.indeks);
    var answer = JSON.stringify({
        result: "ok"
        })



        var sangOver = req.body.indeks;
        sangOver -= 1;
        console.log("req.body.indeks: " + req.body.indeks)
        console.log("sangUnder: " + sangOver)
        if (req.body.indeks != 0) {

            DB.query('UPDATE `sanger` SET `indeks`= 0 WHERE `indeks` =' + sangOver, function(err, result) {
                if (err) {
                    console.log("error i play")
                } else {
                    
                    DB.query('UPDATE `sanger` SET `indeks`=' + sangOver + ' WHERE `indeks` =' + req.body.indeks, function(err, result) {
                        if (err) {
                            console.log("error i play")
                        } else {
                            DB.query('UPDATE `sanger` SET `indeks`=' + req.body.indeks + ' WHERE `indeks` =0', function(err, result) {
                                if (err) {
                                    console.log("error i play")
                                } else {
                                    res.end(answer);
                                }
                            })
                        }
                    })
                }
            })
        } else {
            console.log("req.body.indeks er null: " + req.body.indeks)
        }
})


app.get('/stopQue', function (req, res) {
    console.log("app.get('/stopQue");
    queue = [];
    dispatcher.destroy();
    var answer = JSON.stringify({
        result: "ok"
        })
    res.send(answer);
})

app.post('/searchSong', function (req, response) {
    console.log("app.post('/searchSong");
    var answer;
    console.log("req.body.sang: " + req.body.sang)
   
    // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=YOURKEYWORD&type=video&key=YOURAPIKEY
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=` + req.body.sang + `&type=video&key=` + apiKey)
    .then(res => res.json())
    .then(res => { 
        console.log("res[items][0]['id]['videoId]: " + res['items'][0]['id']['videoId'])
        console.log("res[items][0][snippet][title]: " + res['items'][0]['snippet']['title'])
        // console.log("res[items][0][snippet][thumbnail]: " + res['items'][0]['snippet']['thumbnails']['default']['url'])
        var videoId = res['items'][0]['id']['videoId'];
        var videoTitle = res['items'][0]['snippet']['title'];

        var videoId2 = res['items'][1]['id']['videoId'];
        var videoTitle2 = res['items'][1]['snippet']['title'];

        var videoId3 = res['items'][2]['id']['videoId'];
        var videoTitle3 = res['items'][2]['snippet']['title'];

        var download = "https://www.youtube.com/watch?v=" + videoId;
        var download2 = "https://www.youtube.com/watch?v=" + videoId2;
        var download3 = "https://www.youtube.com/watch?v=" + videoId3;

      console.log("videoTitle: " + videoTitle)
      console.log("download: " + download)
       answer = JSON.stringify({
        sang1: {

            url: download,
            title: videoTitle
        },
        sang2: {
            url: download2,
            title: videoTitle2
        },
        sang3: {
            url: download3,
            title: videoTitle3
        },
       })
       response.end(answer);    
    })
})


app.listen(8000)
// -------------------------------------Nettside Back_end slutt--------------------------