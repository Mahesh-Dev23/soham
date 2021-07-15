import React, {useState, useContext, useEffect} from 'react'
import { ClientNames } from '../../App'
import Input from '../common/Input'


function ClientForm({nameCheck}) {
    const captureNamesFromData = useContext(ClientNames)
    let clientNameSelect = captureNamesFromData.map(name => name.clientName)
    //const [alertName, setAlertName] = useState(false)
   
    const getOnChange = (nameValue) => {

        let i
        for(i = 0; i<= clientNameSelect.length; i++ ){
            if( clientNameSelect[i] === nameValue ){
                //console.log("Select " + clientNameSelect[i])
                //setAlertName(true)
                nameCheck(clientNameSelect[i])
                //alert(`The client name "${clientNameSelect[i]}" already exists! Plaese choose another name.`)
            }
        }
        //console.log(clientNameSelect.length)
    }
    getOnChange()
//     useEffect(()=>{
//       getOnChange()  
//     },[])
//    // 

    return (
        <form name="addclientform" id="getClient" >
            <Input label="Client's Name" onchange={ getOnChange}/>    
            <Input label="Consigner1"/>   
            <Input label="Consigner2"/>
            <Input label="Consigner3"/>
            <Input label="Consigner4"/> 
        </form>
    )
}

export default ClientForm
