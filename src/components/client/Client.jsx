import React, {useState, useContext} from 'react'
import Nav from '../common/Nav'
import Input from '../common/Input'
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import axios from 'axios'
import { ClientNames } from '../../App'
import {VisitTrack} from '../../App'



function Client({onclick}) {
    const [client, setClient] = useState()
    let addClientList 
    const captureNamesFromData = useContext(ClientNames)
    const captureModal = useContext(VisitTrack)

    const clientResponce = () =>{
        
        // const x = document.getElementById("getClient")
        // const personNames = []
        
        // let i
        
        //     for (i = 1; i < x.length ; i++) {
                    
        //         personNames.push(x.elements[i].value)
        //     }
        //     addClientList = {id:captureNamesFromData.length +1, clientName: x.elements[0].value, consigner: personNames}
            
        //         const postNames = async () => {
                
        //         return await axios.post('http://localhost:5000/client', addClientList) 
        //     }
        //     postNames()
        //     setClient(addClientList)

        //     toast(JSON.stringify(addClientList))
        //     captureModal.countDispatch({type:'modal', value:'', modal: false})
            onclick(false, '')

    }

       
    return (
        <div>
            <h3 className="modalTitle">  Add Client </h3>  
                
                <form name="addclientform" id="getClient" >
                    <Input label="Client's Name" />    
                    <Input label="Consigner1"/>   
                    <Input label="Consigner2"/>
                    <Input label="Consigner3"/>
                    <Input label="Consigner4"/>
                    
                </form>
                <button className="formButton" onClick={() => clientResponce()} >Submit</button>
                <Nav />
                
                {client ? `"client":"${client.clientName}", "consigner":[${client.consigner.map(person => `"${person}"`) }]` : ''}
        </div>
    )
}

export default Client
