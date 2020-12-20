//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class search extends LitElement {

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
    #Tab_Search {
        // /*Size*/
        // width: 30%;
        // height: 80%;
        // min-width: 300px;
        // min-height: 500px;
       
        
        
        
        background-color: rgb(255,255,255,.7);
        margin: 30px;
        padding: 30px;
        border-radius: 10px;
        transition: .3s;
    }
    `;

    /**************************************************************************
     * All variables with relations to the lit-element is defined in properties
     * 
     * @author nicholbs 
     * @var searchResult - Array of all video information from song search
     **************************************************************************/
    static get properties() {
        return {
            searchResult: {type: Array},
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
        <div id="Tab_Search">
            <!--Pure style. ikke bry deg om dette nå-->
        <div class="container">    
            <div class="row"> 
                <h2>Search youtube for a song</h2>
                <form class="form-group form-group-lg">
                    <!--Første rad-->
                    <!-- <div class="row mt-2"> -->
                        <label for="songName"></label>
                        <input type="text" name="songName"  id="songName" placeholder="Never gonna give you up" required> 
                        <!-- </div> -->
                    </form>
                    
                    
                    <div class="col"> 
                        <button type="button" @click="${this.searchSong}" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            
            
            <div class="container">    
                <div class="row"> 
                    <h5>${this.searchResult ? html`${this.searchResult.map(i => html`<search-rad .sang=${i}></search-rad>`)}` : html``}</h5>
                </div>
            </div>
        
      
     `;
    }

    
    /**************************************************************************
     * Front-end sends a request to search youtube for a video with keywords
     * from user input 
     * 
     * @author nicholbs 
     * @param res - respone from Back-end
     * @var inputVal - input field containing user keyword to search for
     *************************************************************************/
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