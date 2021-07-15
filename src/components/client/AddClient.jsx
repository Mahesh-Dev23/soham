import React, {useState, useContext} from 'react'
import ClientForm from './ClientForm'


import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import axios from 'axios'
//import { ClientNames } from '../../App'
import {VisitTrack} from '../../App'


function AddClient({onclick}) {
    const [checkName, setCheckName] = useState('')
    //const [client, setClient] = useState()
    let addClientList 
    //const captureNamesFromData = useContext(ClientNames)
    //let clientNameSelect = captureNamesFromData.map(name => name.clientName)
    const captureModal = useContext(VisitTrack)

        //console.log("clientNameSelect " + clientNameSelect)

    const clientResponce = () =>{
        const x = document.getElementById("getClient")
        const personNames = []
        if(checkName){
            toast.warn(
                'Data can not be created with the client name that already exits!',
                {position: toast.POSITION.BOTTOM_CENTER}
            )
            
        }else{
            let i
            for (i = 1; i < x.length ; i++) {
                if(x.elements[i].value){
                    personNames.push(x.elements[i].value)
                }   
            }

            addClientList = { clientName: x.elements[0].value, consigner: personNames}
                const postNames = async () => {
                return await axios.post('http://localhost:5000/client', addClientList) 
            }

            postNames()
            //setClient(addClientList)

            toast.success(JSON.stringify(addClientList), {position: toast.POSITION.BOTTOM_CENTER})
            captureModal.countDispatch({type:'modal', value:'', modal: false})

            onclick(false)
        }    
    }

    return (
        <div>
            <h3 className="modalTitle">  Add Client </h3>  

            <ClientForm nameCheck={() => setCheckName()}/>
                  
            <button className="formButton" onClick={() => clientResponce()} >Submit</button>
        </div>
    )
}

export default AddClient
