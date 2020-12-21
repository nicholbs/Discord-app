// -------------------------------------Discord bot start--------------------------------
const fs = require('fs');       //Dependency for working with filesystems in general, in practice a package from 'npm'
const Discord = require('discord.js');  //Dependency for working with Discord in node.js, in practice a package from 'npm'
const {prefix, token, apiKey} = require('./config.json');   //Local file for storing configurable variables used throughout the application
const fetch = require('node-fetch');    //Dependency for working with web requests in node.js, in practice a package from 'npm'
const ytdl = require('ytdl-core');      //Dependency for downloaading youtube videos in node.js, in practice a package from 'npm'

/******************************************************
 * Constant for holding a refference to the discord bot
 * 
 * @author nicholbs
 * @constant client
 *****************************************************/
const client = new Discord.Client();

 

/***************************************************************************************
 * Discord.js comes with this utility class known as Collection.
 * It extends JavaScript's native Map class, so it has all the features of Map and more!
 * 
 * @author nicholbs
 * @see https://discordjs.guide/additional-info/collections.html
 **************************************************************************************/
client.commands = new Discord.Collection();

/***************************************************************************************
 * Variable for holding a refference to the bot's 'connection' when entering voice chat 
 * 
 * @author nicholbs
 * @var botConnection
 **************************************************************************************/
var botConnection;

/**************************************************************************
 * Variable which contains ID of the voice server which the bot connects to
 * 
 * @author nicholbs
 * @var serverID 
 **************************************************************************/
var serverID = "ENTER DISCORD VOICE SERVER ID FOR WHERE THE BOT SHOULD CONNECT TO"

/************************************************************************
 * Variable for holding refference to the bot's 'speakers'. 
 * 
 * In practice the music output into the voice server bot is connected to
 * 
 * @author nicholbs
 * @var dispatcher 
 ***********************************************************************/
var dispatcher;

/********************************************************
 * Array for all songs inside the current queue of songs.  
 * 
 * Bot plays music which is inside the queue array
 * 
 * @author nicholbs
 * @Array queue 
 *******************************************************/
var queue = [];

/********************************************************
 * Variable to identify wether the last song was skipped.
 * 
 * Used for skipping functionality.
 * 
 * @author nicholbs
 * @var wasTheLastSongSkipped 
 *******************************************************/
var wasTheLastSongSkipped = false;


/***************************************************
 * Array of names for files inside 'commands' folder
 * 
 * All commands available for the user to interact 
 * with the music bot has a file which contains
 * all of the relaled javascript. 
 * The constant 'commandFiles' holds the name of
 * all such command files.
 * 
 * Is read at initialization of application
 * and the bot can be made to listen for all
 * messages that contains the specified commands.
 * 
 * @author nicholbs
 * @constant commandFiles
 **************************************************/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  

/***************************************************
 * Reads all commands inside the 'commands' folder
 * 
 * @author nicholbs
 * @see Definition - @constant commandFiles
 **************************************************/
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

/********************************************************
 * When bot is initialized it will connect to a voicechat
 * 
 * @author nicholbs
 * @see Definition - @constant commandFiles
 *******************************************************/
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

/*********************************************
 * Continually check if messages in server
 * contains any of the bot's commands 
 * 
 * @author nicholbs 
 ********************************************/
// client.on('message', message => {
//     console.log("Nå kom en melding: " + message)
//     if (!message.content.startsWith(prefix)){
//         return;
//     } 
//     // || message.author.bot)       //Legg på denne dersom det er ønskelig at robot ikke skal reagere på egne meldinger

// 	const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     const command = client.commands.get(commandName)
// 		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

//     if (!command) { 
//     return message.reply('that\'s not a valid command!');
//     }


//     if (command.guildOnly && message.channel.type === 'dm') {
//         return message.reply('I can\'t execute that command inside DMs!');
//     }


//     if (command.args && !args.length) {
//         let reply = `You didn't provide any arguments, ${message.author}!`;
//         if (command.usage) {
//         	reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
//         	}
        
//         	return message.channel.send(reply);
//             }


//         try {
//             command.execute(message, args);
//         } catch (error) {
//             console.error(error);
//             message.reply('there was an error trying to execute that command!');
//         }

// });

/*********************************************
 * Bot log into account with token from config
 * 
 * @author nicholbs 
 ********************************************/
client.login(token);


// ----------------------------- Discord bot slutt




// -------------------------------------Nettside Back-end start-----------------------
const express = require('express');     //Dependency for creating an 'app' in node.js, in practice a package from 'npm'
const app = express();
const cors = require('cors');           //Dependency for handling cross origin web requests in node.js, in practice a package from 'npm'
var MySql = require('mysql');           //Dependency for working with the database Mysql in node.js, in practice a package from 'npm'
const { title } = require('process');   //Dependency for ......uncertain in node.js, in practice a package from 'npm'
const { split } = require('ffmpeg-static'); //Dependency for Returns the path of a statically linked ffmpeg binary on the local filesystem in node.js, in practice a package from 'npm'
const { json } = require('express');    //Probably added automatically by IDE visual studio code, do not think it is needed or used


/*********************************************************
 * Variable for holding a refference to the Mysql database
 * 
 * @author nicholbs 
 * @var DB
 ********************************************************/
var DB = MySql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'discord'
})


/***************************************
 * Establish connection to Mysql databse
 * 
 * @author nicholbs 
 **************************************/
DB.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Connected to Mysql database!");
  });

app.use(express.json());             //Middleware which parse JSON bodies (as sent by API clients)
app.use(cors())                      //Middleware handles cross origin web requests


/************************************************************************
 * Back-end receives request to fetch all names of play-lists in database 
 * 
 * Sends a query to the Mysql database asking for all names of play-list
 * tables. Sends an array of strings to Front-end containing all names
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 * @var playLists - Array of strings with name of playlists
 ***********************************************************************/
app.get('/getPlayLists', function (req, res) {
    console.log("app.get('/getPlayLists')")

    DB.query('SHOW TABLES', function (err, result) {
        if (err) {
          res.status(400).send('Error in database operation.');
        } else {
            
            var playLists = [];
            // console.log(result[i]['Tables_in_discord'])
            for (var i=0; i < result.length; i++) {
                if (result[i]['Tables_in_discord'].includes("playlist_")) {
                    // console.log("result[" + i + "]: " + result[i]['Tables_in_discord'])
                    var temp = result[i]['Tables_in_discord'].split("playlist_")[1]
                    // console.log("temp: " + temp)
                    playLists.push(temp)
                }
            }
            // console.log("playLists: " + playLists)
            var myJson = JSON.stringify(playLists)
        res.send(myJson);
        //   res.writeHead(200, { 'Content-Type': 'application/json' });
        //   res.end(JSON.stringify(result));

        
                //   console.log("result[0][0]: " + result[0]['Tables_in_discord'])
                //   console.log("result[1][1]: " + result[1]['Tables_in_discord'])
                // var playListSkalSlettet = "";
        }
      })

})



/************************************************************************
 * Back-end receives request to fetch all songs from queue 
 * 
 * Sends a query to the Mysql database asking for all songs in queue
 * table.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
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
 

/************************************************************************
 * Back-end receives request to replace songs in queue with playlist
 * 
 * Sends a query to the Mysql database asking to delete all entries in
 * queue table, then insert all songs from playlist inside instead.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.post('/queuePlayListSongs', function (req, res, next) {
    console.log("-----/queuePlayListSongs------");

    var answer = JSON.stringify({
        result: "ok"
    })

    console.log("req.body.playListNaame: " + req.body.playListName)
    var sql = "DELETE FROM `sanger`"
    DB.query(sql, function(err, result) {
        if (err) {
            console.log("error i queuePlayListSongs")
            res.status(400).send('Error in database operation.');
        } else {
            // JSON.stringify(result);
            sql = "INSERT INTO `sanger` SELECT * FROM `playlist_" + req.body.playListName + "`"
            DB.query(sql, function(err, result) {
                if (err) {
                    console.log("error i queuePlayListSongs")
                    res.status(400).send('Error in database operation.');
                } else {
                    // JSON.stringify(result);
                    res.end(JSON.stringify(answer));
                }
            })
        }
    })
       
})


/************************************************************************
 * Back-end receives request to delete playlist from database
 * 
 * Sends a query to the Mysql database asking to delete the specified
 * playlist table.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.post('/removePlayList', function (req, res, next) {
    console.log("-----/removePlayList------");

    var answer = JSON.stringify({
        result: "ok"
    })

    console.log("req.body.playListNaame: " + req.body.playListName)
    var sql = "DROP TABLE `playlist_" + req.body.playListName + "`"
    DB.query(sql, function(err, result) {
        if (err) {
            console.log("error i removePlayList")
            res.status(400).send('Error in database operation.');
        } else {
            // JSON.stringify(result);
            res.end(JSON.stringify(answer));
        }
    })
       
})


/**************************************************************************
 * Back-end receives request to retrieve songs in queue table and update
 * queue variable used in application.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 * @var queue - array for all song links from queue database table
 *************************************************************************/
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


/*************************************************************************
 * Back-end receives request to delete all entries in queue database table 
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ************************************************************************/
app.get('/clearQue', function (req, res, next) {
    console.log("-----/clearQue------");

    var answer = JSON.stringify({
        result: "ok"
    })

    DB.query('DELETE FROM `sanger`', function(err, result) {
        if (err) {
            console.log("error i play")
            res.status(400).send('Error in database operation.');
        } else {
            JSON.stringify(result);
            // res.writeHead({ 'Content-Type': 'application/json' });
            // res.send(answer);
            res.end(JSON.stringify(answer));
        }
    })
       
})


/**************************************************************************
 * Back-end receives request to continue playing songs until queue is empty
 * 
 * Function loops indefinetely, or until playlist array reaches a length
 * of zero.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 * @var queue - array holding all song links from queue database table  
 * @var dispatcher - refference to the music bots voice output
 *************************************************************************/
function play() {
    if (queue.length != 0) {
        dispatcher = botConnection.play(ytdl(queue[0].link, {filter: "audioonly"}));
  
        queue.shift();
        wasTheLastSongSkipped = false;
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


/************************************************************************
 * Back-end receives request add the specified song to the queue.
 * 
 * Sends a query to the Mysql database asking to insert a song entry into
 * queue table.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.post('/addToQue', function (req, res) {
    console.log("----/addToQue-------");
    console.log("artist: " + req.body.artist)
    console.log("url: " + req.body.url)
    console.log("songName: " + req.body.songName)


    var answer = JSON.stringify({
        result: "ok"
        })
        var sql = "INSERT INTO `sanger`(`artist`, `sang`, `link`) VALUES ('" + req.body.artist + "','" + req.body.songName + "','" + req.body.url + "')";
   
        //I fremtiden gjør db.query til MySql og lag sjekk på om query er tom. Send play que kommando om que ikke er tom
    // client.channels.cache.get(global.spamID).send('|add https://www.youtube.com/watch?v=fsbpWD-bAC0'); // put kommano for å spille que her istedenfor linken
    DB.query(sql, function (err, result) {
        if (err) {
          res.status(400).send('Error in database operation.');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }
      })
})

/************************************************************************
 * Back-end receives request to save queue into a playlist.
 * 
 * As of now, saving is implemented with: 
 * if the playlist name does NOT exist in database, a new playlist
 * entry is created and all songs from queue inserted.
 * 
 * else if the playlist name DOES exist in database, the existing playlist
 * has its table emptied, then songs from queue are inserted.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.post('/saveQueue', function (req, res) {
    console.log("----/saveQueue-------");
    console.log("playListName: " + req.body.playListName)
    
    var answer = JSON.stringify({
        result: "ok"
    })
    
    if (req.body.playListName != "sanger") {

        // var sql = "";
        
        DB.query('SHOW TABLES', function (err, result) {
            if (err) {
                // res.status(400).send('Error in database operation.');
                console.log("error i saveQueue1")
            } else {
                console.log("else 1")
                console.log("result.lenght: " + result.length)
         
                //   console.log("result[0][0]: " + result[0]['Tables_in_discord'])
                //   console.log("result[1][1]: " + result[1]['Tables_in_discord'])
                var playListSkalSlettet = "";
                
                for (var i=0; i < result.length; i++) {
                    if (result[i]['Tables_in_discord'] == "playlist_" + req.body.playListName) {
                        console.log("result[" + i + "] og " + req.body.playListName + " er like...")
                        playListSkalSlettet = req.body.playListName;
                    }
                }
                if(playListSkalSlettet != "") {
                    var sql = "DROP TABLE `playlist_" + req.body.playListName + "`"
                    console.log(sql)
                    DB.query(sql, function (err, result) {
                        if (err) {
                            console.log("error i saveQueue2")
                        } else {
                            console.log("else 2")
                            playListSlettet = true;
                            
                            console.log("Du er nesten i mål")
                            var query = "CREATE TABLE `playlist_" + req.body.playListName + "` SELECT * FROM `sanger`"
                            console.log("query: " + query)
                            DB.query(query, function (err, result) {
                                if (err) {
                                    console.log("error i saveQueue3")
                                } else {
                                    res.end(answer);
                                }
                            })
                        }
                    })
                }
                else {
                    console.log("playListSlettet sjekk")
                    console.log("playlist var ikke slettet")
                    var query = "CREATE TABLE `playlist_" + req.body.playListName + "` SELECT * FROM `sanger`"
                    DB.query(query, function (err, result) {
                        if (err) {
                            console.log("error i saveQueue4")
                        } else {
                            res.end(answer);
                        }
                    })   
                }
            }
        })
    }
    else {
        console.log("Du er en tulling")
    }
})
    
    
/************************************************************************
 * Back-end receives request to skip one song inside the queue.
 * 
 * As long as there are more than zero links to songs in queue array
 * The first element inside local queue array is removed. If skipping
 * a song results in the queue being empty, the music bot's voice
 * output is simply terminated. 
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.get('/skipQue', function (req, res) {
        console.log("app.get('/skipQue");
        if (queue.length != 0) {
            if (wasTheLastSongSkipped == true) {
                queue.shift();
        } 
        wasTheLastSongSkipped = true;
        if (queue.length != 0) {
            dispatcher = botConnection.play(ytdl(queue[0].link, {filter: "audioonly"}));
            play();
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

/************************************************************************
 * Back-end receives request to remove a song inside queue database table
 * 
 * Sends a query to the Mysql database asking to delete the specified
 * entry inside queue table.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
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


/************************************************************************
 * Back-end receives request to lower queue index of a song by one. 
 * 
 * Sends a query to the Mysql database asking to change index of the song
 * to be lowered, in addition to the song which originally had the index.
 * In practice, one song receives a temporary index number of zero while
 * other receives its new number. Lastly, the index number to be changed
 * can replace original holder. Problem is simply put, Mysql does not
 * allow atomical changes in table's entry keys.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
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


/************************************************************************
 * Back-end receives request to increase queue index of a song by one. 
 * 
 * Sends a query to the Mysql database asking to change index of the song
 * to be increased, in addition to the song which originally had the index.
 * In practice, one song receives a temporary index number of zero while
 * other receives its new number. Lastly, the index number to be changed
 * can replace original holder. Problem is simply put, Mysql does not
 * allow atomical changes in table's entry keys.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
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

/************************************************************************
 * Back-end receives request to stop music bot from playing.
 * The voice output is simply terminated, in other word the dispatcher.
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 * @var dispatcher - refference to music bot voice output
 ***********************************************************************/
app.get('/stopQue', function (req, res) {
    console.log("app.get('/stopQue");
    queue = [];
    dispatcher.destroy();
    var answer = JSON.stringify({
        result: "ok"
        })
    res.send(answer);
})

/************************************************************************
 * Back-end receives request to search youtube for videos based on
 * keywords specified in request.
 * 
 * Function uses youtube API 'search' to receive a list of videoes based
 * on the keywords given. In practice a list of 25 songs is received.
 * The cost of using search is somewhat expensive, especially in contrast
 * to searching with a specified video ID. Despite this, the whole purpose
 * of the music bot is to let users quickly find songs without having to 
 * copy and paste URL. 
 * 
 * It is notwhile that the retrieved information from youtube's API is
 * 'hardcoded' to only sending three songs back to front-end. In future, 
 * an array should be implemented instead of nine likesided variables.  
 * 
 * @author nicholbs 
 * @param req - request from Front-end
 * @param res - respone from Back-end
 ***********************************************************************/
app.post('/searchSong', function (req, response) {
    console.log("app.post('/searchSong");
    var answer;
    console.log("req.body.sang: " + req.body.sang)
   
    // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=YOURKEYWORD&type=video&key=YOURAPIKEY
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=` + req.body.sang + `&type=video&key=` + apiKey)
    .then(res => res.json())
    .then(res => { 3223
        console.log("res[items][0]['id]['videoId]: " + res['items'][0]['id']['videoId'])
        console.log("res[items][0][snippet][title]: " + res['items'][0]['snippet']['title'])
        console.log("res[items][0][snippet][thumbnail][defailt][url]: " + res['items'][0]['snippet']['thumbnails']['default']['url'])
        // console.log("res[items][0][snippet][thumbnail]: " + res['items'][0]['snippet']['thumbnails']['default']['url'])
        var videoId = res['items'][0]['id']['videoId'];
        var videoTitle = res['items'][0]['snippet']['title'];
        // videoTitle = videoTitle.split("-")
        // var videoBilde = res['items'][0]['snippet']['thumbnails']['default']['url'];     //low ressolution bilde
        var videoBilde = res['items'][0]['snippet']['thumbnails']['high']['url'];
        
        var videoId2 = res['items'][1]['id']['videoId'];
        var videoTitle2 = res['items'][1]['snippet']['title'];
        // videoTitle2 = videoTitle2.split("-")
        var videoBilde2 = res['items'][1]['snippet']['thumbnails']['high']['url'];
        
        var videoId3 = res['items'][2]['id']['videoId'];
        var videoTitle3 = res['items'][2]['snippet']['title'];
        // videoTitle3 = videoTitle3.split("-")
        var videoBilde3 = res['items'][2]['snippet']['thumbnails']['high']['url'];

        var download = "https://www.youtube.com/watch?v=" + videoId;
        var download2 = "https://www.youtube.com/watch?v=" + videoId2;
        var download3 = "https://www.youtube.com/watch?v=" + videoId3;

      console.log("videoTitle: " + videoTitle)
      console.log("download: " + download)
       answer = JSON.stringify({
        sang1: {

            url: download,
            // artist: videoTitle[0],
            sang: videoTitle,
            bilde: videoBilde
        },
        sang2: {
            url: download2,
            // artist: videoTitle2[0],
            sang: videoTitle2,
            bilde: videoBilde2
        },
        sang3: {
            url: download3,
            // artist: videoTitle3[0],
            sang: videoTitle3,
            bilde: videoBilde3
        },
       })
       response.end(answer);    
    })
})

/************************************************************************
 * Express app listens for web requests on the designated port.
 * In this case, port 8000
 * 
 * @author nicholbs 
 ***********************************************************************/
app.listen(8000)
// -------------------------------------Nettside Back_end slutt--------------------------
