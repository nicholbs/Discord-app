//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class sangRad extends LitElement {

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
         <div class="container">
            <div class="row justify-content-center" id="sanger">
                <div class="col-8"> 
                    <p id="blue">${this.sang.sang} 
                        <!-- <small class="text-muted">${this.sang.artist}</small> -->
                        <cite title="Source Title" id="black">- ${this.sang.artist}</cite>
                    </p>
                </div>
          
                
       
                <div class="col-1">
                    <div class="row">
                        <button @click="${this.orderUpp}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-primary btn-sm" id="knapp">&#8593</button>  
                    </div>
                    
                    <div class="row">
                        <button @click="${this.orderDown}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-primary btn-sm" id="knapp">&#8595</button>
                    </div>
                </div>  

                <div class="col-2 align-self-center">
                    <button type="button" @click="${this.removeSong}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-danger btn-sm">Remove</button>
                </div> 
            </div>
        </div>
        `;
    }
    removeSong(e) {
        console.log(this.sang.indeks)
        fetch(`${window.MyAppGlobals.serverURL}removeSong`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                indeks: this.sang.indeks 
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

    orderUpp(e) {
        console.log(this.sang.indeks)
        fetch(`${window.MyAppGlobals.serverURL}orderUpp`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                indeks: this.sang.indeks 
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

    orderDown(e) {
        console.log(this.sang.indeks)
        fetch(`${window.MyAppGlobals.serverURL}orderDown`, {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify({
                indeks: this.sang.indeks 
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
customElements.define('sang-rad', sangRad);