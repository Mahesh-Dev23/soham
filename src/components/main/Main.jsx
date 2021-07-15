import React, {useState, useContext, useEffect} from 'react'


import Nav from '../common/Nav'
import Modal from 'react-modal'
import Input from '../common/Input'
import AddClient from '../client/AddClient'
import { Consignments } from '../../App'
import AddConsignment from '../consignment/AddConsignment'

import datefunctions from '../functions/datefunctions'



import Top from '../common/Top'
import StockStatus from './StockStatus'
import PendingBills from './PendingBills'
import BIllCounter from './BIllCounter'
import ConsignmentStatus from './ConsignmentStatus'
import Counter from '../common/Counter'
import Schedule from '../common/Schedule'

//Modal.setAppElement('#main')

const consignment = {
    client: '',
    consigner: '',
    consignee:'',
    PoD: '',
    Loading: '',
    UnLoading: '',
    package: null,
    package1: null,
    weight: null,
    cWeight: null,
    rate: null,
    amnount: null,
    payment: '',
    remark:'',
    id: null
}

function Main({modalOut, modalContentOut, colorsStates, todayInSeconds}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [totalAmt, setAmt] = useState([])
    const [perClient, setPerClient] = useState([])
    const [totalPkg, setPkg] = useState([])
    const [inStock, setinStock] = useState([])
    const [modal , setModal] = useState(false)
    const [modalInside, setModalInside] = useState()
    const [bigBill, setBigBill] = useState([])
    const [todayIs, setTodayIs] = useState()
    
    
    const modalContent = modalInside
    let allConsignments = []
    let bigBill5=[]
    let unpaidStock = []
    let paidStock = []
    let unpaidCons = []
    let unloadingToday = []
    let deliveryToday = []
    let openCons = []
    let closedCons = []

    // const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    // const day = new Date()
    
    //const getToday = today => setTodayIs(today) 
    datefunctions.then(function(value){setTodayIs(value)})
    // const thisDay = DateInt(today)  
    //getToday()
    
    const showModal = (modal, content) =>{
        setModal(modal) 
        setModalInside(content) 
    }
    const modalFromOtherComp = () =>{
        setModal(modalOut) 
        setModalInside(modalContentOut) 
    }
    const myLoop = (arrayLoop) =>{
        var sum = 0;
        for(var i = 0; i < arrayLoop.length; i++)
        {
                sum += arrayLoop[i];  
        }
        return(sum);          
    }

    const getTotal = (total, value, index, array) => {
        setConsignmentCaptured(
        captureConsignmentsFromData.map(res => res ?
            {   client: res.client,
                consigner: res.consigner,
                consignee: res.consignee, 
                PoD: res.Pod, 
                package: res.package,
                package1: res.package1,
                weight: res.weight,
                cWeight: res.cWeight,
                rate: res.rate,
                remark: res.remark,
                payment: res.payment,
                amount:res.amount,
                loading: res.loading,
                UnLoading: res.uloading,
                load: res.load,
                unload: res.unload,
                id: res.id
            } : '')
        )
        setAmt( captureConsignmentsFromData.map(resConsgn => resConsgn.payment != "Paid" ? resConsgn.rate * resConsgn.cWeight : 0 ))
        
        setPerClient( captureConsignmentsFromData.map(resConsgn => 
            resConsgn.payment != "Paid" ? 
                        {"client":resConsgn.client, "amount": resConsgn.rate * resConsgn.cWeight }
                     : '' ))

        

        setPkg( captureConsignmentsFromData.map(resConsgn => resConsgn.unload < todayInSeconds ? resConsgn.package * 1 : null ))
        setinStock(captureConsignmentsFromData.map(resConsgn => resConsgn.unload < todayInSeconds ? resConsgn.package1 * 1 : null))

        


        return total + value;
    }
    useEffect(()=>{
         
        //datefunctions()
        getTotal() 
    },[])

    useEffect(()=>{ getTotal()},[captureConsignmentsFromData])

    const clientConcat = () =>{
        perClient.sort()
        

        for(let i = 0; i < consignmentCaptured.length; i++ ){
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" && consignmentCaptured[i].amount > 10000){
                bigBill5.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if( consignmentCaptured[i].unload < todayInSeconds && consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid"   ){
                unpaidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if( consignmentCaptured[i].unload < todayInSeconds && consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" ){
                paidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid"){
                unpaidCons.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" || consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" || consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid"){
                openCons.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment === "Paid" ){
                closedCons.push(parseInt(consignmentCaptured[i].package1))
            }
            if( consignmentCaptured[i].unload === todayInSeconds ){
                unloadingToday.push(consignmentCaptured[i].client)
            }
            if( consignmentCaptured[i].delv === todayInSeconds){
                deliveryToday.push(consignmentCaptured[i].client)
            }
        }
        bigBill5.sort(function(a, b){
            for(let i = 0; i < 3; i++){
              return b.amount - a.amount  
            }
            
        })
         
       
    }
    clientConcat()
    console.log(unloadingToday)
    
    //console.log(paidStock.length)

    
        
    
    return (
        <div id="main">
            <div className="main" >
                    
                <Top today={todayIs} stateColor={colorsStates.colorStateDBlue}/>
                    
                <div className="resultBox" style={{height:"480px", overflowY: "scroll"}}>
                   < PendingBills />
                </div>
                    <div className="resultBox" style={{borderRight: "1px solid #dcdcdc", borderLeft: "1px solid #dcdcdc", height: "495px" , backgroundColor: "white"}}>
                        <StockStatus total={myLoop(totalPkg)} 
                                    stock={myLoop(inStock)} 
                                    unpaid={myLoop(unpaidStock)} 
                                    paid={myLoop(paidStock)}
                                    paidColor={colorsStates.colorStateGreen}
                                    unpaidColor={colorsStates.colorStateOrange}
                                    />
                        <BIllCounter totalAmt={myLoop(totalAmt)}/>
                        
                        <div className="result">
                            <button type="button" style={{marginRight: "2px"}} className="button " onClick={() => showModal(true, 'Consignment')} > Add Consignment</button>
                            <button type="button"  className="button " onClick={() => showModal(true, 'Client') } fromClient={showModal}> Add Client </button>
                        </div>
                        
                    </div>
                    <div className="resultBox" style={{padding: "0px"}}>
                        <Counter cl={"result2"} content={bigBill5.length} label={"Undelevered consignments above Rs.10000"}/>
                        <Counter cl={"result2"} content={unpaidCons.length} label={"Unpaid consignments post delivery"}/>
                        <Counter cl={"result2"} content={unloadingToday.length} label={"Consignments unloading today"}/>
                        <Counter cl={"result2"} content={deliveryToday.length} label={"Consignments delivery today"}/>
                        
                        {/* <div className="result2" >
                            <h5 style={{color: colorsStates.colorStateOrange}}><span>Open: </span>{openCons.length}</h5>
                            <h5 style={{color: colorsStates.colorStateGreen}}><span>Closed: </span>{closedCons.length}</h5>
                            
                            <p className="pCons"><span>Consignments stats </span>{captureConsignmentsFromData.length}</p>
                        </div> */}
                        
                        < ConsignmentStatus closed={closedCons.length} paid={paidStock.length} unpaid={unpaidStock.length} opened={unpaidCons.length}/>
                        
                    </div>
			</div>
				
                 
                
                <Nav />
                
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
                    content = {modalContent}
                   
                > 
                   
                    { modalContent === "Client"?  <AddClient onclick= {() => showModal()}/> : 
                    modalContent === "Consignment"?  <AddConsignment onclick= {() => showModal()}/>:''}
                   
                
                    <button type="button"  className="roundButton" onClick={() => showModal(false, '')}> X </button>
                </Modal>
                
        </div>
    )
}

export default Main