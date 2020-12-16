//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class playListSongs extends LitElement {

    static styles = css`
    #Tab_Playlists {
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
        <div id="Tab_Playlists">
            <button>Playlists</button>
            <button>New</button>

        </div>
     `;
    }
}
customElements.define('play-list', playListSongs);