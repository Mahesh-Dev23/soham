import React, {useState, useContext, useEffect} from 'react'
import { ClientNames } from '../../App'
import { Consignments } from '../../App'
import getConsignments from '../crud/consignmentApi'
import consignmentArraySort from '../functions/consignmentArraySort'


function SelectPrint({clientPrint, consPrint, onclick}) {
    const captureNamesFromData = useContext(ClientNames)
    const captureConsData = useContext(Consignments)
    const [consignmentRec, setConsignmentRec] = useState([])
    //const loadConsigments = () => getConsignments().then(res => setConsignmentRec(res.data) )
    
    let clientNameSelect = captureNamesFromData.map(name => name.clientName).sort()
    const firstClient = captureNamesFromData.map(name => name.clientName).sort().splice(6, 1 ).toString()
    const [selectedCons, setSelectedCons] = useState([])
    const [clientName = firstClient , setClientName] = useState()
    const [consDisplay, setConsDisplay] = useState([])
    let x = document.getElementById("clients")
    //console.log(x)
    //const selectedClient = document.getElementById("getClient").value ? document.getElementById("getClient").value : ''
    let selectedConsignment = []
    
    let oneConsignment = []
    consignmentArraySort(captureConsData) // alphbetic order

    
    const handleChange = (v) => {
        setClientName(v.toString())
        setSelectedCons( captureConsData.map(cons => 
            { if(cons.client.startsWith( v.toString() ? v.toString() : firstClient ) ){
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
        //setConsDisplay( selectedCons.filter(value => value != undefined))
        //onclick(false)
    }
    const consChange = (v) =>{
        setConsDisplay({...consDisplay, v})
    }
    //consignementDisplay()
    //useEffect(()=>{ consignementDisplay() },[])
    
    

    
     ////
    //useEffect(()=>{consignementDisplay()},[clientName])
    
    let collect = []

    const collectConst = (v) =>{
        collect.push(v)
    }
    const dispatchCons = (v) =>{
        
        clientPrint(x.elements[0].value)
        onclick(false)
        //collect = x.elements[1].value
        //const collect = ()=>{ for(let i = 1; i < x.elements.length; i++){return x.elements[i].value}}
        console.log(collect)
        consPrint(collect)
    }

    
    return (
        <div>
            <div style={{width: "1210px", margin: "auto"}}>
                {/* <div id="checklist"></div>
                {consignmentRec.map(res => 
                    <button className="printButton" 
                        onClick={()=> consignementResponce(res)} >
                            {res.client}
                    </button>)} */}
                <form id= "clients" >
                    <div className="form-group" >
                        <label className="form-input-label">Select Client</label>
                        <select  name="clients"  onChange={e=>handleChange(e.target.value)}>
                            
                            {clientNameSelect.map(data => <option key={data} value={data} className="selectName">{data}</option> )}
                        </select>
                       
                    </div>
                    <div  >
                        {/* <label className="form-input-label">Select Consignments</label> */}
                        {selectedCons ? selectedCons.map(data => 
                            <div className="form-group" onChange={e=>collectConst(e.target.value)}>
                                <label className="checkbox-label" for={data.client} key={data.client}>
                                    <input type="checkbox" id={data.client}  name={data.client} 
                                    value={`${data.client}, ${data.consigner}, ${data.consignee}, ${data.Pod}, ${data.package1}, ${data.cWeight}, ${data.amount}, ${data.rate}`}></input> 
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
