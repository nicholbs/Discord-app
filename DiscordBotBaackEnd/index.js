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

/*********************************************
 * Uncomment om du ønsker at discord bot skal
 * ta i mot kommandoer fra meldinger på discord
 * for eksempel at du skriver "|play" eller
 * "|skip" i en av discord chattene
 */
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


client.login(token);


// ----------------------------- Discord bot slutt

// -------------------------------------Nettside Back-end start-----------------------
const express = require('express');
const app = express();
const cors = require('cors');
var MySql = require('mysql');
const { title } = require('process');
const { split } = require('ffmpeg-static');
const { json } = require('express');

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
        console.log("Du er en kukk")
    }
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

        // if (videoTitle[0] == undefined) {
        //     videoTitle[0] = videoTitle[1]
        //     videoTitle2[0] = videoTitle2[1]
        //     videoTitle3[0] = videoTitle3[1]
            
        //     videoTitle[1] = " "
        //     videoTitle2[1] = " "
        //     videoTitle3[1] = " "
        // }

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


app.listen(8000)
// -------------------------------------Nettside Back_end slutt--------------------------