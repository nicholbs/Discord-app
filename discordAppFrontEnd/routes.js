import {Router} from '@vaadin/router'; //importerer modul
//Her legges stien til litelementene
import './components/kontrollSenter.js'
import './components/sangRad.js'
import './components/playList.js'
import './components/sangQue.js'
import './components/search.js'
import './components/searchRad.js'
import './components/playListRad.js'



			const outlet = document.getElementById('outlet'); //Rendrer innholdet i index.html
			const router = new Router(outlet);
			router.setRoutes([
			  {path: '/', component: 'kontroll-senter'},  //path er hvilken sti etter 8080 den skal ha, component er samme navnet siom lit elementet
			  {path: '/sang', component: 'sang-rad'},
			]);

			// <div id="outlet"></div> <!--Ikke rør, tilknyttet rutingen, se routes.js-->		legg denne til i index.html i body om du vil bruke routes
			
