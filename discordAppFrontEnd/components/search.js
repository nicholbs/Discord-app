//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class search extends LitElement {

    static styles = css`
    #Tab_Search {
        /*Size*/
        width: 30%;
        height: 80%;
        min-width: 300px;
        min-height: 500px;
       
        
        
        
        background-color: rgb(255,255,255,.7);
        margin: 30px;
        padding: 100px;
        border-radius: 10px;
        transition: .3s;
    }
    `;


    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div id="Tab_Search">
            <!--Pure style. ikke bry deg om dette nå-->
          
          <!--Søkefelt -->
          <input id="Searchfield">
          <button @click="${this.addToQue}" class="btn btn-primary">add song to queue</button>
        </div>
     `;
    }


    addToQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}addToQue`).then(res => res.json())
        .then(res => { 
            this.result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
            
        })
    }
}
customElements.define('search-sang', search);