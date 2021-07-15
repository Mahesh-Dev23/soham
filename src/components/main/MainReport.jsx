import React, {useState, useContext, useEffect} from 'react'


import { Consignments } from '../../App'
import Top from '../common/Top2'
import StockStatus from './StockStatus'
import BIllCounter from './BIllCounter'
import ConsignmentStatus from './ConsignmentStatus'
import Counter from '../common/Counter'
import addLoop from '../functions/add'



//Modal.setAppElement('#main')



function MainReport({colorsStates, todayIs}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [totalAmt, setAmt] = useState([])
    const [perClient, setPerClient] = useState([])
    const [totalPkg, setPkg] = useState([])
    const [inStock, setinStock] = useState([])

    let bigBill5=[]
    let unpaidStock = []
    let paidStock = []
    let unpaidCons = []
    let unloadingToday = []
    let openCons = []
    let closedCons = []

    
   

    const getTotal = (total, value) => {
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
                id: res.id
            } : '')
        )
        setAmt( captureConsignmentsFromData.map(resConsgn => resConsgn.payment != "Paid" ? resConsgn.rate * resConsgn.cWeight : 0 ))
        
        setPerClient( captureConsignmentsFromData.map(resConsgn => 
            resConsgn.payment != "Paid" ? 
                        {"client":resConsgn.client, "amount": resConsgn.rate * resConsgn.cWeight }
                     : '' ))

        setPkg( captureConsignmentsFromData.map(resConsgn =>  resConsgn.package * 1 ))
        setinStock(captureConsignmentsFromData.map(resConsgn =>  resConsgn.package1 * 1 ))


        return total + value;
    }
    useEffect(()=>{ getTotal() },[])

    const clientConcat = () =>{
        perClient.sort()
        

        for(let i = 0; i < consignmentCaptured.length; i++ ){
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" && consignmentCaptured[i].amount > 10000){
                bigBill5.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" ){
                unpaidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" ){
                paidStock.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid" ){
                unpaidCons.push( {client:consignmentCaptured[i].client , amount: consignmentCaptured[i].amount, package1:consignmentCaptured[i].package1} )
            }
            if(consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment != "Paid" || consignmentCaptured[i].package1 > 0 && consignmentCaptured[i].payment === "Paid" || consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment != "Paid"){
                openCons.push(parseInt(consignmentCaptured[i].package1))
            }
            if(consignmentCaptured[i].package1 <= 0 && consignmentCaptured[i].payment === "Paid" ){
                closedCons.push(parseInt(consignmentCaptured[i].package1))
            }
        }
        bigBill5.sort(function(a, b){
            for(let i = 0; i < 3; i++){
              return b.amount - a.amount  
            }
            
        })
         
      
    }
    clientConcat()
    
    return (
        <div className="print">
            <div  >
                <Top today={todayIs} stateColor={colorsStates.colorStateDBlue}/>
                <div className="resultBox" style={{borderRight: "1px solid #dcdcdc", borderLeft: "1px solid #dcdcdc", height: "500px" , backgroundColor: "white"}}>
                    <StockStatus total={addLoop(totalPkg)} 
                                stock={addLoop(inStock)} 
                                unpaid={addLoop(unpaidStock)} 
                                paid={addLoop(paidStock)}
                                paidColor={colorsStates.colorStateGreen}
                                unpaidColor={colorsStates.colorStateOrange}
                                />
                    <BIllCounter totalAmt={addLoop(totalAmt)}/>
                </div>
                <div className="resultBox" style={{padding: "0px", width: "500px"}}>
                    <Counter cl={"result2"} content={bigBill5.length} label={"Undelevered consignments above Rs.10000"}/>
                    <Counter cl={"result2"} content={unpaidCons.length} label={"Unpaid consignments post delivery"}/>
                    <Counter cl={"result2"} content={unloadingToday.length} label={"Consignments unloading today"}/>
                    
                    <div className="result2" >
                        <h5 style={{color: colorsStates.colorStateOrange}}><span>Open: </span>{openCons.length}</h5>
                        <h5 style={{color: colorsStates.colorStateGreen}}><span>Closed: </span>{closedCons.length}</h5>
                        
                        <p className="pCons"><span>Consignments stats </span>{captureConsignmentsFromData.length}</p>
                    </div>
                    
                    < ConsignmentStatus closed={closedCons.length} paid={paidStock.length} unpaid={unpaidStock.length} opened={unpaidCons.length}/>
                
                </div>
			</div>   
                
        </div>
    )
}

export default MainReport