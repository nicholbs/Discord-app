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
            searchUrl: {type: String},
            searchTitle: {type: String},
            searchResult: {type: Array},

        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div id="Tab_Search">
            <!--Pure style. ikke bry deg om dette nå-->
          
            <form class="form">
                <!--Første rad-->
                <div class="row mt-2">
                    <label for="songName">Name of song</label>
                    <input type="text" name="songName"  id="songName" placeholder="Never gonna give you up" required> 
                </div>
                <div>
                    <button type="button" @click="${this.searchSong}" class="btn btn-primary">Search</button>
                </div>
            </form>


            <h5>${this.searchResult ? html`${this.searchResult.map(i => html`<search-rad .sang=${i}></search-rad>`)}` : html``}</h5>
        
      
     `;
    }


    addToQue(e) {
        fetch(`${window.MyAppGlobals.serverURL}addToQue`).then(res => res.json())
        .then(res => { 
            var result =  Object.values(res);  
            console.log("resultatet var: " + this.result[0])
        })
    }
    
    searchSong(e) {
        
        var inputVal = this.shadowRoot.getElementById("songName").value;
        console.log("inputVal: " + inputVal)
        // const song = new FormData(e.target.form); //Create a formdata from formen registerUser
        // e.preventDefault();
  
        fetch(`${window.MyAppGlobals.serverURL}searchSong`, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                sang: inputVal
            })
            
        }).then(res => res.json())
        .then(res => { 
          
            var result =  Object.values(res);  
            // console.log("resultatet var: " + this.result)       
            console.log("resultatet var: " + result[0].url)       
            console.log("resultatet var: " + result[1])       
            console.log("resultatet var: " + result[2]) 
            // this.searchUrl = result[1];
            // this.searchTitle = result[2];
            this.searchResult = result;
        })
    }
}
customElements.define('search-sang', search);