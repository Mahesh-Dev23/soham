import React, {useContext} from 'react'
import logo from '../../../src/siddhivinayak.png';
import background from "../../../src/bg.jpg";
import '../../App.css'
import {VisitTrack} from '../../App'

 function Start() {
     const captureMain = useContext(VisitTrack)
    return (
        
        <header className="App-header" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat'}}>
            <p>
            Welcom to Soham Logistics!
            </p>
            <img src={logo} className="App-logo" alt="logo" />
            
            <button className="button start" 
            onClick={()=>captureMain.countDispatch({type:'main', value:'Main'})}
            >Start
            </button>
        </header>
        
    )
}

export default Start
