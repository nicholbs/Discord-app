//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class playListRad extends LitElement {

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


    static get properties() {
        return {
            playList: {type: Object},
            visible: {type: Boolean}
            // sangNavn: {type: String},
            // artistNavn: {type: String},     
            // picture: {type: String}     //Bildet vil i praksis være en link til bildets addresse?, kanskje droppe bilde i que
        };
    }

    constructor() {
        super();
    }

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
            // console.log("resultatet var: " + answer)
            // console.log(this.visible)
        })
    }

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
            // console.log("resultatet var: " + answer)
            // console.log(this.visible)
        })
    }
}
customElements.define('playlist-rad', playListRad);