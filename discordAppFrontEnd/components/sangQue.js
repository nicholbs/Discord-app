//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class que extends LitElement {

    static styles = css`
    #Tab_Player {
        /*Size*/
        width: 30%;
        height: auto;
        min-width: 300px;
        min-height: 200px;
     
      
       
        background: rgba(1, 1, 1, 0);
        /*border: 1px solid black;*/
        text-align: center;
        margin: 0;
        color: rgb(49, 49, 144);
    }

    .grid-container {
        display: grid;
        grid-template-rows: 300px auto auto;
        margin: 30px;
    }

    #stor-tekst {
        font-size: 60px;
    }
    
    #mellom-tekst {
        font-size: 40px;
    }

    `;


    static get properties() {
        return {
            sangerIQue: {type: Array},
            allePlaylist: {type: Array},
            alleSokTreff: {type: Array},
            currentSong: {type: Object},
            result: {type: Object}
        };
    }

    constructor() {
        super();
        this.getQue();
    }

    render() {
        return html`
               <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
          <div id="Tab_Player">
              <div class ="grid-container">
                    <!-- <div class="row" id="mellom-tekst">
                        Playing in channel: "Discord bot"
                    </div> -->

                        <div class="row">
                            
                            <div>
                            <button  @click="${this.playQue}" class="btn btn-primary">Play queue</button>
                            <button  @click="${this.skipQue}" class="btn btn-primary">Skip</button>
                            <button  @click="${this.stopQue}" class="btn btn-danger">Stop</button>
                           <!-- onclick="setTimeout(location.reload.bind(location), 1)" -->
                                <div id="stor-tekst">
                                    Queue:
                                </div>
                                ${this.sangerIQue.map(i => html`<sang-rad .sang=${i}></sang-rad>`)}
                            </div>
                        </div>
                </div>
          </div>
     `;
    }


    playQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}playQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }
    skipQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}skipQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }
    stopQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}stopQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }
       /**
     * This function take the desierd password and send it backend for registring the new password
     */
    getQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}getSongQue`)
        .then(res => res.json())
        .then(res => { 
            this.sangerIQue =  Object.values(res);
            this.sangerIQue.sort();
            this.currentSong = this.sangerIQue[0];
            // console.log("første sang navn " + this.sangerIQue[0].sang)
            // console.log("første sang artist " + this.sangerIQue[0].artist)
            // console.log("andre sang navn " + this.sangerIQue[1].sang)
            // console.log("andre sang artist " + this.sangerIQue[1].artist)
            // console.log("tredje sang navn " + this.sangerIQue[1].sang)
            // console.log("tredje sang artist " + this.sangerIQue[1].artist)
        })
    }

    getChannel(e) {
        fetch(`${window.MyAppGlobals.serverURL}getSongQue`)
        .then(res => res.json())
        .then(res => { 
            this.sangerIQue =  Object.values(res);  
        })
    }
}
customElements.define('sang-que', que);