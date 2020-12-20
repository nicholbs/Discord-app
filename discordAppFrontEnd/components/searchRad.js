//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class searchRad extends LitElement {

    static styles = css`
    #kort {
        // background-color: rgb(255,255,255,.7);
        // border-radius: 10px;
        // transition: .3s;
        margin: 20px;
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
            sang: {type: Object},
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
        <div class="card" id="kort" style="width: auto;">
        <img class="card-img-top" src="${this.sang.bilde}" alt="Card image cap">
        <div class="card-body">
            <!-- <h5 class="card-title">${this.sang.title}</h5> -->
            <p class="card-text">${this.sang.sang}</p>
            <button type="button" @click="${this.addToQue}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-primary btn-sm">Add to queue</button>
        </div>
        </div>
        `;
    }


    addToQue(e) {
        // console.log(this.sang.indeks)
        fetch(`${window.MyAppGlobals.serverURL}addToQue`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                // artist: this.sang.artist,
                songName: this.sang.sang,
                url: this.sang.url
            })
        }).then(res => res.json())
        .then(res => { 
            var answer =  Object.values(res);  
            if (answer == "ok") {
                this.visible = null;
            }
            // console.log("resultatet var: " + answer)
            // console.log(this.visible)
        })
    }
    
 
}
customElements.define('search-rad', searchRad);