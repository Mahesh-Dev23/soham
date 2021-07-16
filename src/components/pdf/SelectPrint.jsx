import React, {useState, useContext, useEffect} from 'react'
import { ClientNames } from '../../App'
import { Consignments } from '../../App'
import getConsignments from '../crud/consignmentApi'
import consignmentArraySort from '../functions/consignmentArraySort'


function SelectPrint({clientPrint, consPrint, onclick}) {
    const captureNamesFromData = useContext(ClientNames)
    const captureConsData = useContext(Consignments)
    const [consignmentRec, setConsignmentRec] = useState([])
    
    
    let clientNameSelect = captureNamesFromData.map(name => name.clientName).sort()
    const firstClient = captureNamesFromData.map(name => name.clientName).sort().splice(6, 1 ).toString()
    const [selectedCons, setSelectedCons] = useState([])
    const [clientName = firstClient , setClientName] = useState()
    const [consDisplay, setConsDisplay] = useState([])
    let x = document.getElementById("clients")
    
    let selectedConsignment = []
    
    let oneConsignment = []
    consignmentArraySort(captureConsData) // alphbetic order

    const getUnpaidCons = () => setConsignmentRec(captureConsData.filter(value => value.payment === "To Pay"))
    
    useEffect(()=>{getUnpaidCons()},[])
    console.log(consignmentRec)
    const handleChange = (v) => {
        setClientName(v.toString())
        
        setSelectedCons( consignmentRec.map(cons => 
            { if(cons.client.startsWith( v.toString() ? v.toString() : firstClient  ) ){
                return cons
            }}
        ).filter(value => value != undefined))
    }
    
    
    const consignementDisplay = () =>{
        setSelectedCons( captureConsData.map(cons => 
                    { if(cons.client.startsWith( clientName ? clientName : firstClient ) ){
                        return cons
                    }}
                ))
      
    }
    const consChange = (v) =>{
        setConsDisplay({...consDisplay, v})
    }
    
    
    let collect = []

    const collectConst = (v) =>{
        collect.push(v)
    }
    const dispatchCons = (v) =>{
        
        clientPrint(x.elements[0].value)
        onclick(false)
        console.log(collect)
        consPrint(collect)
    }

    
    return (
        <div>
            <div style={{width: "1210px", margin: "auto"}}>
               
                <form id= "clients" >
                    <div className="form-group" >
                        <label className="form-input-label">Select Client</label>
                        <select  name="clients"  onChange={e=>handleChange(e.target.value)}>
                            
                            {clientNameSelect.map(data => <option key={data} value={data} className="selectName">{data}</option> )}
                        </select>
                       
                    </div>
                    <div  >
                       
                        {selectedCons ? selectedCons.map(data => 
                            <div className="form-group" onChange={e=>collectConst(e.target.value)}>
                                <label className="checkbox-label" for={data.client} key={data.client}>
                                    <input type="checkbox" id={data.client}  name={data.client} 
                                    value={`${data.client}, ${data.consigner}, ${data.consignee}, ${data.Pod}, ${data.package}, ${data.cWeight}, ${data.amount}, ${data.rate}, ${data.book}, ${data.page}`}></input> 
                                    <span className="checkmark"></span>
                                    {`${data.client}, ${data.Pod}, Rs.${data.amount}`}
                                </label></div>)
                         : 'no pending consignments'}
                            
                    </div>
                    <button className="formButton" onClick={()=>dispatchCons()} >Submit</button>
                </form>    
            </div>
                
        </div>
    )
}

export default SelectPrint
