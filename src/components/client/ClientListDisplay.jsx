import React, {useState, useEffect, useContext} from 'react'
import { ClientNames } from '../../App'
import Modal from 'react-modal'
import AddConsignment from '../consignment/AddConsignment'
import { FiTruck } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios'

function ClientListDisplay({resName, clickedId}) {

    const captureNamesFromData = useContext(ClientNames)
    const [modal , setModal] = useState(false)
    const [clientId, setClientId] = useState()
    const [clientName, setClientName] = useState()
    const [consigner, setConsigner] = useState()

    

    const getEditId = id =>  clickedId(id)

    const showModal = (modal) =>{
        setModal(modal)
    }
    const addCons = (modal, id, name, cons) =>{
        setModal(modal)
        setClientId(id - 1)
        setClientName(name)
        setConsigner(cons)
    }
    // delete client
    // const delCons = async (e) => {
    //     console.log(e)
    //     return await axios.delete(`http://localhost:5000/client/${e}`)
    // }
    // delCons()

    return (
        
                <div className="clientList">
                    <div className="clientName">
                        <p>Client:</p>
                        <h4>{resName.clientName}</h4> 
                    </div>
                    <div className="consigner">
                        
                            {resName.consigner.map(cons => <p>{cons}</p>)}
                        
                        
                    </div>
                    <div className="listButtons">
                        <button type="button"  className="roundClick" onClick={()=> getEditId(resName.id)}> <FiEdit /> </button>
                        <button type="button"  className="roundClick" onClick={()=> addCons(true, resName.id, resName.clientName, resName.consigner)}> <FiTruck /> </button>
                    </div>

                    <Modal isOpen={modal}
                        style={{
                        overlay: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(20, 20, 20, 0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 999
                        },
                        content:{
                            inset:0,
                            background: 'rgba(40, 44, 52, 0)'
                        }
                        } }
                        
                    
                    > 
                    
                        
                         <AddConsignment onclick= {() => showModal()} clientId ={clientId} clientName= {clientName}  seltectedConsignerFromClientr={consigner}/>
                    
                    
                        <button type="button"  className="roundButton" onClick={() => showModal(false, '')}> X </button>
                    </Modal>
                </div>
        
    )
}

export default ClientListDisplay
