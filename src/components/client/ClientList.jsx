import React, {useContext, useState, useEffect} from 'react'
import Nav from '../common/Nav'
import EditClient from '../client/EditClient'
import { ClientNames } from '../../App'

import ClientListDisplay from './ClientListDisplay'
import Pagination from '../common/Pagination'
import Modal from 'react-modal'

import AddClient from '../client/AddClient'


export default function ClientList() {

    const captureNamesFromData = useContext(ClientNames)
    const [modal , setModal] = useState(false)

    const [idNew, setIdNew] = useState()

    const getId = (id) => setIdNew(id)

    const showModal = (e) => setModal(e)

    const closeUpdates = (e) => setIdNew(e)
    
  

    const clientArray = captureNamesFromData.map( res => <ClientListDisplay resName={res} clickedId={getId}/>)
    
    
    return (
        <div className="clientDisplay">
            <h3 className="title">Client List</h3>
            <button type="button"  className="button center" onClick={() => showModal(true)}> Add Client </button>
            <Pagination listData={clientArray} len={clientArray.length} entries={8}>
            
            </Pagination>
            {idNew ? <EditClient id={idNew} noId={closeUpdates}/> : ''}

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
                   
                     <AddClient onclick= {() => showModal()}/>
                   
                
                    <button type="button"  className="roundButton" onClick={() => showModal(false)}> X </button>
                </Modal>
            
            <Nav />
        </div>
    )
}
