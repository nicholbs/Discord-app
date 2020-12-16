//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class kontrollSenter extends LitElement {

    static styles = css`
    
    `;


    static get properties() {
        return {
            result: {Type: Object}
        };
    }

    constructor() {
        super();
    }



    render() {
        return html`
          <!--Queue listen. "Queue_Song" er stilen. Referer til den når en sang blir lagt til i queuen-->
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
         
        <div class="container-fluid"> <!-- container start -->
        <div class="row">   <!-- row slutt -->    

        
       

        <div class="col h-75">
            <search-sang></search-sang>
        </div>

        <div class="col">
            <sang-que></sang-que>
        </div>

        <div class="col h-75">
            <play-list></play-list>

        </div>

    </div>      <!-- row slutt -->
</div>  <!-- container slutt -->
     `;
    }

    
     /**
     * This function take the desierd password and send it backend for registring the new password
     */
    // getQue(e) {
    //     fetch(`${window.MyAppGlobals.serverURL}getSongQue`)
    //     .then(res => res.json())
    //     .then(res => { 
    //         this.sangerIQue =  Object.values(res);  
    //         this.currentSong = this.sangerIQue[0];
    //         console.log("første sang navn " + this.sangerIQue[0].navn)
    //         console.log("første sang artist " + this.sangerIQue[0].artist)
    //         console.log("andre sang navn " + this.sangerIQue[1].navn)
    //         console.log("andre sang artist " + this.sangerIQue[1].artist)
    //         console.log("tredje sang navn " + this.sangerIQue[1].navn)
    //         console.log("tredje sang artist " + this.sangerIQue[1].artist)
    //     })
    // }


}
customElements.define('kontroll-senter', kontrollSenter);