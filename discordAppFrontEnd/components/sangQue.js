//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class que extends LitElement {

    /**************************************************************************
     * Cascade Style Sheeting for this lit-element.
     * 
     * Each lit-element is created inside the 'shadow document object model'
     * and is not affected by inherited styling.
     * 
     * @author nicholbs 
     * @var styles - defined in litElement module to contain CSS for lit-element 
     **************************************************************************/
    static styles = css`
    #Tab_Player {
        // /*Size*/
        // width: 30%;
        // height: auto;
        // min-width: 300px;
        // min-height: 200px;
     
      
       
        background: rgba(1, 1, 1, 0);
        /*border: 1px solid black;*/
        text-align: center;
        margin: 0;
        color: rgb(49, 49, 144);
    }

    .grid-container {
        display: grid;
        grid-template-rows: auto auto auto;
        margin: 30px;
    }

    #stor-tekst {
        font-size: 60px;
    }
    
    #mellom-tekst {
        font-size: 40px;
    }

    `;

    /**************************************************************************
     * All variables with relations to the lit-element is defined in properties
     * 
     * @author nicholbs 
     * @var sangerIQue - Array of all songs in queue database table
     * @var currentSong - Not currently in use, shows the song with indeks 1
     * @var result - variable for holding response results from Back-end 
     **************************************************************************/
    static get properties() {
        return {
            sangerIQue: {type: Array},
            currentSong: {type: Object},
            result: {type: Object}
        };
    }

    /**************************************************************************
     * All variables with relations to the lit-element is defined in properties
     * 
     * @author nicholbs 
     * @function getQue - retrieves all songs in queue database table
     **************************************************************************/
    constructor() {
        super();
        this.getQue();
    }

    /**************************************************************************
     * When a lit-element's tags are put into a document object module it will
     * render the following html
     * 
     * @author nicholbs 
     **************************************************************************/
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
                            <button  @click="${this.clearQue}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-danger">Clear</button>
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

    /*************************************************************************
     * Front-end sends a request to play all songs in the queue database table
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     ************************************************************************/
    playQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}playQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }

    /**************************************************************************
     * Front-end sends a request to delete all songs in the queue database table
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     *************************************************************************/
    clearQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}clearQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }

    /**************************************************************************
     * Front-end sends a request to skip one song currently playing from local
     * queue variable in Back-end.
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     *************************************************************************/
    skipQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}skipQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }
    
    
    /**************************************************************************
     * Front-end sends a request to stop playing songs, in practice destroying
     * the dispatcher
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     *************************************************************************/
    stopQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}stopQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }


    /*****************************************************************************
     * Front-end sends a request to retrieve all songs in the queue database table
     * 
     * All songs retrieved are put into the 'sangerIQue' variable which maps each
     * entry into a <sang-rad> lit-element.
     * 
     * @author nicholbs
     * @param res - respone from Back-end
     * @var sangerIQue - Array of all songs retrieved from queue database table
     * @var currentSong - refference to the song with indeks 1 in queue database table 
     ****************************************************************************/
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

}
customElements.define('sang-que', que);