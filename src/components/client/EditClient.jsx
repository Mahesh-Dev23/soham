import React, {useState, useContext, useEffect} from 'react'

import Input from '../common/Input'
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import axios from 'axios'
import { FiTrash2 } from 'react-icons/fi'
import {VisitTrack} from '../../App'


function AddClient({onclick, id, noId}) {
    const [clientUpdate, setClientUpdate] = useState()
    const [consUpdate, setConsUpdate] = useState([])
    let addClientList 
    
    const getNames = async () => {
       return await axios.get(`http://localhost:5000/client/${id}`) 
    }
    
    const editClient =  () => getNames().then(res=> {
        const consNames = res.data.consigner.map(res => res)
        setClientUpdate(res.data.clientName)
        setConsUpdate(res.data.consigner.map(res => res))
    })
    
    
    //console.log("c: " + consUpdate)
    const captureModal = useContext(VisitTrack)

    const delCons = async (e) => {
        console.log(e)
        //return await axios.delete(`http://localhost:5000/client/${id}?consigner[${e}]`)
    }
    delCons()
    const updateCons = (ev, index) => consUpdate[index]= ev
    const closeUpdates = (e) => noId(e)

    const clientResponce = (index, value) =>{
        const x = document.getElementById("getClient")
        //const personNames = []
        

        let i
        consUpdate.push( x.elements[x.length -1].value)
            // for (i = 1; i < x.length ; i++) {
            //     if(x.elements[i].value !== null){
                    
            //         console.log(consUpdate)
            //     }
               
            // }
            addClientList = { clientName: x.elements[0].value ? x.elements[0].value : clientUpdate, 
                consigner: consUpdate}
            
                const postNames = async () => {
                
                return await axios.put(`http://localhost:5000/client/${id}`, addClientList) 
            }
            postNames()
            //setClient(addClientList)

            toast.success(JSON.stringify(addClientList), {position: toast.POSITION.BOTTOM_CENTER})
            captureModal.countDispatch({type:'modal', value:'', modal: false})

            

        //onclick(false, '')

    }

    useEffect(()=>{ 
        editClient() 
        updateCons()
    },[])

    return (
        <div className="clientUpdate">
            <h3 className="modalTitle">  Update Client </h3>  

            <form name="addclientform" id="getClient" >
                <div className="form-group" >
                    <label className="form-input-label" >Client's Name</label>
                    <input value={clientUpdate} onChange={e=>setClientUpdate(e.target.value)}/>
                </div>    
                {consUpdate.map((res, index) => 
                <div className="form-group" >
                    <label className="form-input-label" >{`Consigner${ index + 1 }`}</label>
                    <input  
                        placeholder={res} 
                        //onChange={ e => setConsUpdate(...consUpdate, consUpdate[index] = e.target.value)  }
                    // del= {<button type="button"  className="roundClick" onClick={() => delCons(index)}> 
                    // <FiTrash2 /> 
                    // </button>}
                /> </div>)}  
                
                <Input label="Add more Consigner" /> 
            </form>
                  
            <button className="formButton" onClick={() => clientResponce()} >Submit</button>
            <button type="button"  className="roundButton" onClick={() => closeUpdates()}> X </button>
        </div>
    )
}

export default AddClient
