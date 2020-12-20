//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class playListRad extends LitElement {
   
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
    #sanger {
        /*Size*/
        min-width: 800px;
        height: 100px;
        color: black;
        margin: 20px;
       
        
        background-color: rgb(255,255,255,.7);
        border-radius: 10px;
        transition: .3s;
    }

    #blue {
        color: blue;
        padding: 15px;
    }

    #black {
        color: black;
    }

    #tekst {
        padding: 30px;
    }
    #knapp {
       padding: 4px;
    }

    `;

    /**************************************************************************
     * All variables with relations to the lit-element is defined in properties
     * 
     * @author nicholbs 
     * @var playList - Name of the selected playlist 
     * @var visible - Might be used in future itteration to hide/show html
     **************************************************************************/
    static get properties() {
        return {
            playList: {type: Object},
            visible: {type: Boolean}
            // sangNavn: {type: String},
            // artistNavn: {type: String},     
            // picture: {type: String}     //Bildet vil i praksis være en link til bildets addresse?, kanskje droppe bilde i que
        };
    }

    /**************************************************************************
     * All variables with relations to the lit-element is defined in properties
     * 
     * @author nicholbs 
     **************************************************************************/
    constructor() {
        super();
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
         <div class="container">
            <div class="row justify-content-center" id="sanger">
                <div class="col-5"> 
                    <p id="blue">${this.playList}
     
                    </p>
                </div>
          
                <div class="col-4 align-self-center">     

                        <button type="button" @click="${this.queuePlayListSongs}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-primary btn-sm">Queue sangene</button>
                </div>  

                <div class="col-2 align-self-center">
                    <button type="button" @click="${this.removePlayList}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-danger btn-sm">Remove</button>
                </div> 
            </div>
        </div>
        `;
    }

    /************************************************************************
     * Front-end sends a request to remove the specified play list database
     * table.
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     * @var playList - Name of the specified play list
     ***********************************************************************/
    removePlayList(e) {
        console.log(this.playList)
        fetch(`${window.MyAppGlobals.serverURL}removePlayList`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                playListName: this.playList
            })
        }).then(res => res.json())
        .then(res => { 
            var answer =  Object.values(res);  
            if (answer == "ok") {
        
            }
        })
    }

    /************************************************************************
     * Front-end sends a request to put replace songs in queue database table
     * with songs from the specified play list database table
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     * @var playList - Name of the specified play list
     ***********************************************************************/
    queuePlayListSongs(e) {
        console.log(this.playList)
        fetch(`${window.MyAppGlobals.serverURL}queuePlayListSongs`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                playListName: this.playList 
            })
        }).then(res => res.json())
        .then(res => { 
            var answer =  Object.values(res);  
            if (answer == "ok") {
                this.visible = true;
            }
        })
    }
}
customElements.define('playlist-rad', playListRad);