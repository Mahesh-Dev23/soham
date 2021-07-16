import React, {useState, useContext, useEffect} from 'react'
import { ClientNames } from '../../App'
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

import Select2 from '../common/Select2'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FiTrash2 } from 'react-icons/fi'
import { FiRefreshCw } from 'react-icons/fi'
import {VisitTrack} from '../../App'
import Input from '../common/Input'


const consignment = {
    client: '',
    consigner: '',
    consignee:'',
    PoD: '',
    Loading: null,
    UnLoading: null,
    package: null,
    package1: null,
    weight: null,
    cWeight: null,
    rate: null,
    amnount: null,
    payment: '',
    remark:'',
    tempo:'',
    id: null
}
function EditConsignment({nameC, id, noId, onclick}) {
    const captureModal = useContext(VisitTrack)
    const captureNamesFromData = useContext(ClientNames)
    let clientNameSelect = captureNamesFromData.map(name => name.clientName)
    const nameOnly = nameC.split("/")
    const initailConsigner = captureNamesFromData[clientNameSelect.indexOf(nameOnly[0])].consigner

    const [cons, setCons] = useState(consignment)
    const [minus, setMinus] = useState(0)
    const [resetPkg, setRestPkg] = useState()
    const [getConsigner, setConsigern] = useState()
    const [loadingDate, setLoadingDate] = useState()
    const [newLoadingDate, setNewLoadingDate] = useState()
    //     const [unLoadingDate, setunLoadingDate] = useState()  
    
    

    const closeUpdates = (e) =>{
                noId(e)
            }
            console.log(id)
    const getCons = async () =>  await axios.get(`http://localhost:5000/consignments/${id}`)        
    
//     const [clientNameId, setClientNameId] = useState()
    
    
        const [consUpdate, setConsUpdate] = useState()
        let selectedConsignment = [] // submit values
        const x = document.getElementById("addCons")
        let updateConsignment 
    
    
    
    
//     //const clientNameToArray = new Array(clientNameSelect)
//     console.log("This time: " + clientNameSelect)
//     //console.log("gotname " + captureNamesFromData[10].clientName + clientNameSelect.length)
        const payment = ["Paid", "To Pay", "Billed"]
    
    
    
    
     
    const editClient =  () => getCons().then(res=> {
//         setConsUpdate(res.data.id)
            setConsigern(res.data.consigner)
            setCons({...cons, consignee: `${res.data.consignee}`, 
            PoD:`${res.data.Pod}`, 
            package: `${res.data.package}`,
            package1: `${res.data.package1}`,
            weight: `${res.data.weight}`,
            cWeight: `${res.data.cWeight}`,
            rate: `${res.data.rate}`,
            remark: `${res.data.remark}`,
            payment: `${res.data.payment}`,
            loading: res.data.loading,
            UnLoading: `${res.data.uloading}`,
            tempo: `${res.data.tempo}`,
            id: `${res.data.id}`,
            delivery: `${res.data.delivery}`,
            book: `${res.data.book}`,
            page: `${res.data.page}`
            } )
            setLoadingDate( res.data.loading.toString().slice(6) + "/" + 
                            res.data.loading.toString().slice(3,5) + "/" + 
                            res.data.loading.toString().slice(0,2)) //loadingDate
            setRestPkg(res.data.package1)
            console.log("loads " + res.data.loading.slice(6))

            onclick(false)
       })
        const reducePackages = () => {
            
            setCons({...cons, package1: `${cons.package1 - minus}`})
        }
        useEffect(()=>{reducePackages()}, [minus])
        const resetPackage = () => {
            setCons({...cons, package1: `${resetPkg}`})
            setMinus(0)
        }
    
        


        useEffect(()=>{ 
//         //setClientNameId(clientNameSelect.indexOf("Abbas") + 1)
            editClient() 
            resetPackage()
//         setCons({...cons, loading: loadingDate, UnLoading: unLoadingDate})
        
        },[])
        //let load = cons.loading.toString().slice(0,2) + "/" + cons.loading.toString().slice(3,5) + "/" + cons.loading.toString().slice(6)
       const consignementUpdate = () =>{
        setMinus(selectedConsignment[10])
        let i
            for (i = 0; i < x.length ; i++) {
                selectedConsignment.push(x.elements[i].value)
            }
            updateConsignment = {
                client: selectedConsignment[0], 
                consigner: selectedConsignment[1], 
                consignee: selectedConsignment[2],
                loading: selectedConsignment[3],
                uloading: selectedConsignment[4],
                load: Date.parse(selectedConsignment[3].slice(3,6) + selectedConsignment[3].slice(0,3) + selectedConsignment[3].slice(6,10)),
                unload: Date.parse(selectedConsignment[4].slice(3,6) + selectedConsignment[4].slice(0,3) + selectedConsignment[4].slice(6,10)),
                Pod: selectedConsignment[4].slice(0, 5) + " U",
                package:cons.package,
                package1: cons.package1 ? cons.package1 : 0,
                weight: selectedConsignment[6],
                cWeight: selectedConsignment[7],
                rate: selectedConsignment[8],
                amount: selectedConsignment[7] * selectedConsignment[8],
                payment: selectedConsignment[11],
                remark: selectedConsignment[12],
                tempo: selectedConsignment[13],
                delivery: selectedConsignment[14],
                delv: Date.parse(selectedConsignment[14].slice(3,6) + selectedConsignment[14].slice(0,3) + selectedConsignment[14].slice(6,10)),
                book: selectedConsignment[15],
                page: selectedConsignment[16]
            }       
        const postCons = async () => {
            
            return await axios.put(`http://localhost:5000/consignments/${id}`, updateConsignment) 
        }
        postCons()    

        captureModal.countDispatch({type:'modal',  modal: false, value: ''})

        toast.success("Consignment is updated", {position: toast.POSITION.BOTTOM_CENTER})
        
        }
//     console.log("cons: " + selectedConsignment)
//     const selectedName = () =>{

//     }

    

    return (
        <div className="consUpdate">
            <h3 className="modalTitle"> Update Consignment </h3> 
            <form name="addclientform"  id="addCons" style={{width: "1010px"}} >
                    <div className="formSec">
                        <Select2 label="Client's Name" option={clientNameSelect} selectedId={nameC} id="selectedClientName" />
                        <Select2 label="Consigner" option={initailConsigner} selectedId={getConsigner}/>
                        <div className="form-group" >
                            <label className="form-input-label">Consignee</label>
                            <input label="Consignee" value={cons.consignee} onChange={e=>setCons({...cons,consignee: e.target.value})}/>
                        </div> 
                        <div className="form-group" >
                            <label className="form-input-label">Loading</label>
                            <input  value={cons.loading} onChange={e=>setCons({...cons,loading: e.target.value})} style={{width: "140px"}}/>
                            {/* <button className="button" style={{marginLeft: "-70px"}} onClick={loadingNew}>Change Date</button> */}
                        </div> 
                        <div className="form-group" >
                            <label className="form-input-label">Unloading</label>
                            <input  value={cons.UnLoading} onChange={e=>setCons({...cons,UnLoading: e.target.value})} style={{width: "140px"}}/>
                            {/* <button className="button" style={{marginLeft: "-70px"}} onClick={unLoadingNew}>Change Date</button> */}
                        </div> 
                        {/* <DatePicker selected={cons.loading.toString()} dateFormat='dd/MM/yyyy'  openToDate={new Date(cons.loading.toString())} /> */}
                        {/* <DatePicker label={`Unoading: ${cons.UnLoading}`} selected={unLoadingDate} newDate={setunLoadingDate} min={loadingDate} /> */}
                           
                        <div className="form-group" >
                            <label className="form-input-label" >PoD</label>
                            <input  value={cons.PoD} onChange={e=>setCons({...cons,PoD: e.target.value})}/>
                        </div> 
                        <div className="form-group" >
                            <label className="form-input-label">Weight</label>
                            <input value={cons.weight} onChange={e=>setCons({...cons,weight: e.target.value})}/>
                        </div>  
                        <div className="form-group" >  
                            <label className="form-input-label">C-Weight</label>
                            <input value={cons.cWeight} onChange={e=>setCons({...cons,cWeight: e.target.value})}/>
                        </div> 
                        
                        <div className="form-group" > 
                            <label className="form-input-label">Rate</label>  
                            <input value={cons.rate} onChange={e=>setCons({...cons,rate: e.target.value})}/>
                        </div>
                    </div>
                    <div className="formSec">
                        <div className="form-group" >
                            <label className="form-input-label">Package</label>
                            <p style={{width: "70px", float: "left", margin: "0"}}>{`${ cons.package1 } / ${cons.package}`}</p>
                            <h5 style={{width: "50px", float: "left", margin: "0 10px"}}>minus</h5>
                            <input type="number" onChange={e=> setMinus(e.target.value) } style={{width: "70px", float: "left"}} max ={cons.package1} />
                            <button type="button"  className="roundClick"  onClick={()=>resetPackage()} style={{float: "left", margin: "5px 10px"}}> 
                                <FiRefreshCw />
                            </button>
                             
                        </div>
                        
                        
                        <p className="amount"> Amount = {cons.cWeight && cons.rate ? cons.cWeight * cons.rate : 0} </p>
                        <div className="form-group" > 
                            <label className="form-input-label">Payment</label>
                            
                            <select   >
                                <option key={cons.payment} value={cons.payment} className="selectName" selected>{cons.payment}</option>
                                {payment.map(data => <option key={data} value={data} className="selectName">{data}</option> )}
                            </select>
                        
                        </div>
                        <div className="form-group" >
                            <label className="form-input-label">Remark</label>    
                            <input  value={cons.remark} onChange={e=>setCons({...cons,remark: e.target.value})}/>
                        </div>
                        <div className="form-group" >
                            <label className="form-input-label">Tempo</label>    
                            <input  value={cons.tempo} onChange={e=>setCons({...cons,tempo: e.target.value})}/>
                        </div>
                        <div className="form-group" >
                            <label className="form-input-label">Delivery</label>
                            <input  value={cons.delivery} onChange={e=>setCons({...cons,delivery: e.target.value})} style={{width: "140px"}}/>
                            
                        </div> 
                        <div className="form-group" >
                            <label className="form-input-label">Book No</label>
                            <input label="Consignee" value={cons.book} onChange={e=>setCons({...cons,book: e.target.value})}/>
                        </div>
                        <div className="form-group" >
                            <label className="form-input-label">Page No</label>
                            <input label="Consignee" value={cons.page} onChange={e=>setCons({...cons,page: e.target.value})}/>
                        </div>
                        
                    </div>
            </form>
            <button className="formButton" onClick={() => consignementUpdate()} >Submit</button> 
            <button type="button"  className="roundButton" onClick={() => closeUpdates()}> X </button>
            
            {/* <div >
                <DatePicker 
                        selected={newLoadingDate} 
                        dateFormat='dd/MM/yyyy'  
                        onChange={date => setNewLoadingDate(date)} 
                        withPortal
                        openToDate={new Date(loadingDate)}/>
            </div> */}
        
        </div>
    )
}

export default EditConsignment
