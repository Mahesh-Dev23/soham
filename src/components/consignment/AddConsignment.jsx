import React, {useState, useContext, useEffect} from 'react'
import { ClientNames } from '../../App'
import { Consignments } from '../../App'
import {VisitTrack} from '../../App'
import Input from '../common/Input'
import Select from '../common/Select'
import Select2 from '../common/Select2'
import axios from 'axios'
import DatePicker from '../common/DatePicker'
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import getConsignments from '../crud/consignmentApi'
import getNames from '../crud/api'

const consignment = {
    client: '',
    consigner: '',
    consignee:'',
    PoD: '',
    Loading: '',
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

function AddConsignment({onclick, clientId, clientName, seltectedConsignerFromClientr}) {
    const captureNamesFromData = useContext(ClientNames)
    const captureConsignmentsAll = useContext(Consignments)
    const loadConsigments = () => getConsignments().then(res => setConsignmentRec(res.data) )
    let consignerIndex = 0
    const initailConsigner = seltectedConsignerFromClientr ? seltectedConsignerFromClientr : captureNamesFromData[0].consigner
    
    
    const [getClient, setgetClient] = useState()
    const [getConsigner, setConsigern] = useState(initailConsigner)
    const [loadingDate, setLoadingDate] = useState(null)
    const [unLoadingDate, setunLoadingDate] = useState(loadingDate)
    const [delivery, setDelivery] = useState(null)
    const [rate, setRate] = useState(0)
    const [weight, setWeight] = useState(0)
    const payment = ["To Pay", "Paid"]
    const [consignmentRec, setConsignmentRec] = useState([])
    //let addConsignment 
    //console.log(" unloading: " + new Date(loadingDate) + 2 )
    console.log(consignmentRec.length)
    const captureModal = useContext(VisitTrack)

    // get value of selected cilent
    let getClientId 
    let selectedConsignment = []
    let newConsignment 
    
    let clientNameSelect = captureNamesFromData.map(name => name.clientName)
    
    //let clientNameSelect = captureNamesFromData.map(name => name.id + " " +name.clientName)
    //let selectedConsigner = getConsigner.map(name => name)
    const selectedName = e =>{ setgetClient(e)}
    const x = document.getElementById("addCons")
    const constLength = parseInt(consignmentRec.length) + 1 // for id of new consignment
    console.log(constLength + 1)
    const getConsignerId = () =>{
        if(clientId){
            //getClientId = clientNameSelect.indexOf(clientId) // from client page
            getClientId = clientId // from client page           
        }else{
            getClientId = getClient
        }
    }
    getConsignerId()

    const weightGet = (e) => setWeight(e)
    const rateGet = (e) => setRate(e)
    useEffect(()=>{
        weightGet()
        rateGet()
        loadConsigments()
    },[] )
    
    
    
    // const getConsignerNames = async () => {
    //     return await axios.get(`http://localhost:5000/client/${getClientId}`) 
    //    .then(res =>  setConsigern(res.data.consigner) )
    // }

    const getConsignerNames = () => {
        captureNamesFromData.filter( (value, index) => {
            if (value.clientName === getClientId){
                setConsigern(value.consigner)
                //initailConsigner = value.consigner
            }
        })
        console.log(getClientId)
       // getNames(v).then(res => setConsigern(res.consigner) )
    
    }

     console.log("..." + getConsigner)

    useEffect (()=>{
        
        getConsignerNames() 
    },[getClientId])

    console.log("cons: " + getConsigner)



    const consignementResponce = () =>{
        
        let i
            for (i = 0; i < x.length ; i++) {
                selectedConsignment.push(x.elements[i].value)
            }
            // const unloading = () => {if (selectedConsignment[5] = ''){return (selectedConsignment[4].slice(0, 5) + " U")}}
            // unloading()
            const PoD = selectedConsignment[4].slice(0, 5) + " U"
            newConsignment = {
                client: selectedConsignment[0] + "/" + PoD + "/" + constLength, 
                consigner: selectedConsignment[1], 
                consignee: selectedConsignment[2],
                loading: selectedConsignment[3],
                uloading: selectedConsignment[4],
                load: Date.parse(selectedConsignment[3].slice(3,6) + selectedConsignment[3].slice(0,3) + selectedConsignment[3].slice(6,10)),
                unload: Date.parse(selectedConsignment[4].slice(3,6) + selectedConsignment[4].slice(0,3) + selectedConsignment[4].slice(6,10)),
                Pod:  PoD,
                package: selectedConsignment[5],
                package1: selectedConsignment[5],
                weight: selectedConsignment[6],
                cWeight: selectedConsignment[7],
                rate: selectedConsignment[8],
                amount: selectedConsignment[8] * selectedConsignment[7],
                payment: selectedConsignment[9],
                remark: selectedConsignment[10],
                tempo: selectedConsignment[11],
                delivery: selectedConsignment[12],
                delv: Date.parse(selectedConsignment[12].slice(3,6) + selectedConsignment[12].slice(0,3) + selectedConsignment[12].slice(6,10)),
                book: selectedConsignment[13],
                page: selectedConsignment[14]
            }   
            
            const postConsignment = async () => {
                 
                return await axios.post('http://localhost:5000/consignments', newConsignment) 
            }
            postConsignment()

            toast.success(JSON.stringify(
                "Consignment added: " + selectedConsignment[0] +
                ", by " + selectedConsignment[1] +
                ", to " + selectedConsignment[2] +
                ", of " + selectedConsignment[6] +
                ", for Rs." +  selectedConsignment[8] * selectedConsignment[7]
                ), {position: toast.POSITION.BOTTOM_CENTER})

            onclick(false)    
            captureModal.countDispatch({type:'modal', value:'', modal: false})

    }
    
    return (
        
        <div>
            <div style={{width: "1210px", margin: "auto"}}>
            <h3 className="modalTitle">  Add New Consignment </h3>  
                
                <form name="addclientform"  id="addCons" style={{width: "1010px"}} >
                    <div className="formSec">
                        <Select2 label="Client's Name" option={clientNameSelect} id="selectedClientName" selected={selectedName} selectedId={clientName ? clientName : clientNameSelect[0] }/>
                        <Select label="Consigner" option={getConsigner} />
                        <Input label="Consignee" />
                        <DatePicker label="Loading" selected={loadingDate} newDate={setLoadingDate} min={() =>new Date()}/>
                        <DatePicker label="Unoading" selected={unLoadingDate} newDate={setunLoadingDate} min={loadingDate}/>
                        <Input label="Package" />
                        <Input label="Weight" />
                        <div className="form-group" >
                            <label className="form-input-label">C-Weight</label>
                            <input label="C-Weight" id="weight" onChange={e=>weightGet(e.target.value)}/>
                        </div>
                    </div>
                    <div className="formSec">
                    
                        <div className="form-group" >
                            <label className="form-input-label">Rate</label>
                            <input label="Rate" id="rate" onChange={e=>rateGet(e.target.value)}/>
                        </div>
                        <div className="form-group" >
                            <p> Amount = {weight && rate ? weight * rate : 0} </p>
                        </div>
                        
                        <Select label="Payment" option={payment} selected={selectedName}/>
                        <Input label="Remark" />
                        <Input label="Tempo" />
                        <DatePicker label="Delivery" selected={delivery} newDate={setDelivery} min={() =>new Date()}/>
                        <Input label="Book No" />
                        <Input label="Page No" />
                    </div>
                </form>
                <button className="formButton" onClick={consignementResponce} >Submit</button>
                    
                </div>
                
            </div>
            
        
    )
}

export default AddConsignment
