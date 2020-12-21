<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://blog.sonicbids.com/hs-fs/hubfs/shutterstock_1516597082.jpg?width=567&name=shutterstock_1516597082.jpg" alt="Logo" width="560" height="420">
  </a>

  <h3 align="center">Discord music bot</h3>

  <p align="center">
   GuttaGangBot
  </p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
There are many alternatives for "listening parties" on Discord. For example the music bot "Rythm" or Spotify's own listening party functionality. Despite this, both services do not provide an easy to use "Control Panel" where listeners can alter the queue and insert new entries. It is with this in mind we are creating a bot, website and database to be easily available. As of now in individual components, but will in future be available as a docker container if not fully launchable without much configuration needed.  


### Built With
* [NodeJS](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com)
* [MySQL](https://www.mysql.com/)



## Getting Started

Both folders "DiscordBotBaackEnd" and "discordAppFrontEnd" are individual NodeJS projects, furthermore they also contain different dependencies which are required before getting started!

In addition, the discord bot stores all playlists and music queue into a Mysql database.
A Mysql init file will be committed at later stages, for example the project will most likely be made accessible as a Docker-container in future which require little to non configuration before running.

Lastly, the search for youtube videos functionality works with Google and youtube API which means an individual API key is needed.

### Prerequisites

clone this git repo and open a terminal into "DiscordBotBaackEnd":
* npm
  ```sh
  npm install @discordjs/opus
  npm install cors
  npm install dirscord.js
  npm install eslint
  npm install express
  npm install ffmpeg-static
  npm install mysql
  npm install node-fetch
  npm install opusscript
  npm install prism-media
  npm install ytdl-core
  ```
  
  Change directory to "discordAppFrontEnd":
* npm
  ```sh
  npm install @vaadin/router
  npm install es-dev-server
  npm install lit-element
  ```

### Installation

1. Get a free API Key at [Google API](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Clone the repo
   ```sh
   git clone https://github.com/nicholbs/Discord-app.git
   ```
3. Install NPM packages
   ```sh
   npm install ...
   ```
4. Enter your API and discord-bot token in `config.js`
   ```JS
   apiKey = 'ENTER YOUR API';
   token = 'ENTER YOUR TOKEN'
   ```
5. Lastly, Mysql database is necessarry. As of now there is no initializable database file, wait for future release!



## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_


 

<div align="center">
   <h3 align="center">Home view</h3>
    <p>There are three major functionalities on the music bot's website, namely Queue, Search and Playlist</p>
      <a href="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangHomePage.PNG">
      <img src="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangHomePage.PNG" alt="Logo" width="1500" height="500">
    </a>
</div>
  


<div align="center">
 <h3>Queue</h3>
  <p>The queue has a display of simple commands for handling the queue of songs, in addition a list is generated based on all songs in queue table in MySQL database</p>
    <a href="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangQueue.PNG">
    <img src="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangQueue.PNG" alt="Logo" width="600" height="800">
    </a>
</div>
  
<div align="center">
 <h3>Search</h3>
  <p>Search field will retrieve a list of youtube videos matching keywords given using the youtube API</p>
   <a href="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangSearch.PNG">
    <img src="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangSearch.PNG" alt="Logo" width="800" height="750">
  </a>
   <a href="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangSearchRad.PNG">
    <img src="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangSearchRad.PNG" alt="Logo" width="800" height="200">
  </a>
 </div>
 

 
<div align="center">
 <h3>Playlist</h3>
  <p>As of now, a new playlist is generated from the current queue</p>
  <a href="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangPlaylist.PNG">
    <img src="https://github.com/nicholbs/Discord-app/blob/master/application_pictures/GuttaGangPlaylist.PNG" alt="Logo" width="800" height="560">
  </a>
</div>


## Roadmap

See the [open issues](https://github.com/nicholbs/Discord-app/issues) for a list of proposed features (and known issues).




## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Nicholas bodvin Sellevåg - nicholbs@hotmail.com

Project Link: [https://github.com/nicholbs/Discord-app](https://github.com/nicholbs/Discord-app)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Youtube API Overview](https://developers.google.com/youtube/v3/getting-started)
* [Discord Developers Portal](https://discord.com/developers/docs/intro)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/nicholbs/Discord-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/nicholbs/Discord-app/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/nicholbs/Discord-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/nicholbs/Discord-app/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/nicholbs/Discord-app/blob/master/LICENSE
[product-screenshot]: images/screenshot.png
