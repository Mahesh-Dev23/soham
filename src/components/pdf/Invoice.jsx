import React, {useState, useEffect} from 'react'
import SelectPrint from './SelectPrint'

import 'react-toastify/dist/ReactToastify.css' 
import Modal from '../common/Modal'
import addLoop from '../functions/add'
import InvoiceRow from './InvoiceRow'

function Invoice({todayIs}) {
    
    const [modal, setModal] = useState(true)
    const [client, setClient] = useState()
    const [consignment, setConsignment] = useState()

    const showModal = (e) => setModal(e)

    const clientName = (v) => setClient(v)
    
    let fianlCons = consignment ? consignment.map(data => data.split(",")) : ''
    let total = fianlCons ? fianlCons.map(data =>parseInt(data[6])) : 0
    let pkg = fianlCons ? fianlCons.map(data =>parseInt(data[4])) : 0
    let weight = fianlCons ? fianlCons.map(data =>parseInt(data[5])) : 0
    let rate = fianlCons ? fianlCons.map(data =>parseInt(data[7])) : 0
    //console.log(total)
    const printConsignments = (v, modal) => {
        setConsignment(v)
        setModal(modal)
    }

    useEffect(()=>{clientName()},[])

    return (
        <div className="invoice">
            <div style={{height: "100px", borderBottom:"1px solid black"}} onClick={()=>setModal(true)}></div>
           
            <p className="invoiceDate" style={{textAlign:"right"}}>{todayIs}</p>
            <p>To</p>
            <div style={{borderBottom:"1px solid black"}}>
                <p><b>{client}</b></p>
                {/* <p><b>Address</b></p> */}
            </div>
            <div style={{padding: "20px 0"}}>
                <div style={{background:"#dcdcdc", height:"40px"}}><InvoiceRow /></div>
                {fianlCons ? fianlCons.map(res =><>
                    <InvoiceRow billRow={res}/>
                </>
                ):''}
            </div>
            
            <div style={{marginTop: "0", float: "left", width:"900px"  }}>
                <div style={{width:"560px", float: "left", textAlign: "left"}}><p>Grand Total</p></div>
                <div style={{width:"75px", float: "left", textAlign: "left"}}><p>{addLoop(pkg)}</p></div>
                <div style={{width:"75px", float: "left", textAlign: "left"}}><p>{addLoop(weight)}</p></div>
                <div style={{width:"75px", float: "left", textAlign: "left"}}><p>{addLoop(rate)}</p></div>
                <div style={{width:"75px", float: "left", textAlign: "left"}}><p>{addLoop(total)}</p></div>
            </div>

            <Modal modal={modal}> 
                <SelectPrint onclick= {showModal} consPrint={printConsignments} clientPrint={clientName}/>
                <button type="button"  className="roundButton" onClick={() => showModal(false)}> X </button>
            </Modal>

            
            
        </div>
    )
}

export default Invoice
