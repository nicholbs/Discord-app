//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class playListSongs extends LitElement {

    static styles = css`
    #Tab_Playlists {
        /*Size*/
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


    static get properties() {
        return {
            playListResult: {type: Array},
        };
    }

    constructor() {
        super();
        this.getPlayLists()
    }

    render() {
        return html`
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <div id="Tab_Playlists">
            <!--Pure style. ikke bry deg om dette nå-->
            <h4>Save queue to playlist</h4>
            <div class="container">    
                <div class="row"> 
                    <form class="form-group form-group-lg">
                        <!--Første rad-->
                        <!-- <div class="row mt-2"> -->
                            <label for="playListName"></label>
                            <input type="text" name="playListName"  id="playListName" placeholder="ikke skriv store bokstaver" required> 
                            <!-- </div> -->
                        </form>
                        
                        
                        <div class="col"> 
                            <button type="button" @click="${this.saveQueue}" onclick="setTimeout(location.reload.bind(location), 1)" class="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
            
            
            <div class="container">    
                <br>
                <h4>All playlists</h4>
                <div class="row"> 
                    <h5>${this.playListResult ? html`${this.playListResult.map(i => html`<playlist-rad .playList=${i}></playlist-rad>`)}` : html``}</h5>
                </div>
            </div>
     `;
    }

    getPlayLists(e) {
        fetch(`${window.MyAppGlobals.serverURL}getPlayLists`)
        .then(res => res.json())
        .then(res => { 
            var result =  Object.values(res);
            console.log(result)
            console.log(result[0])
            this.playListResult = result;
            // console.log("første sang navn " + this.sangerIQue[0].sang)
            // console.log("første sang artist " + this.sangerIQue[0].artist)
            // console.log("andre sang navn " + this.sangerIQue[1].sang)
            // console.log("andre sang artist " + this.sangerIQue[1].artist)
            // console.log("tredje sang navn " + this.sangerIQue[1].sang)
            // console.log("tredje sang artist " + this.sangerIQue[1].artist)
        })
    }

    saveQueue(e) {
        
        var inputVal = this.shadowRoot.getElementById("playListName").value;
        console.log("playListName: " + inputVal)
        // const song = new FormData(e.target.form); //Create a formdata from formen registerUser
        // e.preventDefault();
  
        fetch(`${window.MyAppGlobals.serverURL}saveQueue`, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                playListName: inputVal
            })
            
        }).then(res => res.json())
        .then(res => { 
          
            var result =  Object.values(res);  
            console.log("resultatet var: " + result)       
            // console.log("resultatet var: " + this.result)       
            // console.log("resultatet var: " + result[0].url)       
            // console.log("resultatet var: " + result[1])       
            // console.log("resultatet var: " + result[2]) 
            // // this.searchUrl = result[1];
            // // this.searchTitle = result[2];
            // this.searchResult = result;
        })
    }
}
customElements.define('play-list', playListSongs);