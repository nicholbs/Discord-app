//LitElement for uploading a profile picture ore chaning a password for a user
import { LitElement, html, css } from '../node_modules/lit-element';

export class sangRad extends LitElement {

    static styles = css`
    #sanger {
        /*Size*/
        min-width: 600px;
        height: auto;
        color: black;
       
        
        background-color: rgb(255,255,255,.7);
        border-radius: 10px;
        transition: .3s;
    }

    #blue {
        color: blue;
    }

    #black {
        color: black;
    }
    `;


    static get properties() {
        return {
            sang: {type: Object},
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
         
           <div class="row" id="sanger">
            <p id="blue">${this.sang.navn} 
                <!-- <small class="text-muted">${this.sang.artist}</small> -->
                <cite title="Source Title" id="black">- ${this.sang.artist}</cite>
            </p>
           
        </div>
     `;
    }
}
customElements.define('sang-rad', sangRad);