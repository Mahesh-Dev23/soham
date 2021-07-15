import React, {useContext, useState, useEffect} from 'react'
import { Consignments } from '../../App'
import Top from '../common/Top2'
import addLoop from '../functions/add'


function PendingBills({todayIs}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [perClient, setPerClient] = useState([])
    const [paidStock, setPaidStock] = useState([])
    const [unPaidStock, setUnPaidStock] = useState([])
    const [totalStock, setTotalStock] = useState([])

    
    const getUnpaidList = (total, value, index, array) => {
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
        setPerClient( captureConsignmentsFromData.map(resConsgn => 
            resConsgn.package1 > 0 ? 
                        {"client":resConsgn.client, "pending": `${resConsgn.package1} `, "total": `${resConsgn.package}`, "payment" : resConsgn.payment }
                     : '' ))
        setPaidStock(captureConsignmentsFromData.map(resConsgn => resConsgn.payment === "Paid" ? parseInt(resConsgn.package1) : 0 ))             

        setUnPaidStock(captureConsignmentsFromData.map(resConsgn => resConsgn.payment !== "Paid" ? parseInt(resConsgn.package1) : 0 ))
        
        setTotalStock(captureConsignmentsFromData.map(resConsgn => parseInt(resConsgn.package1) ))
    }   
    useEffect(()=>{ 
        getUnpaidList() 
        
    },[])       
    let sortedClient = []   
    const arraySort = () =>{
        sortedClient = perClient.filter(res => res.client != null || undefined)
        sortedClient.sort(
            (a, b) => {
                let x = a.client.toLowerCase();
                let y = b.client.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
    }
    arraySort()
    return ( 
        <div className="print" >
            <Top today={todayIs} />
            <p >Pending stocks per consignments</p>
            <div style={{margin: "10px auto", width: "520px", height: "30px"}}>
                <div style={{width: "150px", padding:"10px", border:"1px solid black", textAlign: "center", float: "left"}}>
                    <h5>{`Paid: ${addLoop(paidStock)}`}</h5>
                </div>
                <div style={{width: "150px", padding:"10px", border:"1px solid black", textAlign: "center", float: "left"}}>
                    <h5>{`Unpaid: ${addLoop(unPaidStock)}`}</h5>
                </div>
                <div style={{width: "150px", padding:"10px", border:"1px solid black", textAlign: "center", float: "left"}}>
                    <h5>{`Total: ${addLoop(totalStock)}`}</h5>
                </div>
            </div>
            <div style={{color:"#dc143c", width:"600px", margin: "auto"}}>
                { sortedClient.map(res =>  <h3 className="pClient" >
                                            <div style={{width:"250px", display:"inline-block"}}>
                                                <span >{`${res.client}: `}</span>
                                            </div>
                                            <div style={{width:"40px", display:"inline-block", textAlign:"right"}}>{res.pending}</div> 
                                            <div style={{width:"40px", display:"inline-block"}}><span>{` / ${res.total}`}</span></div>
                                            <div style={{width:"115px", display:"inline-block"}}>
                                                <span > payment status: </span>
                                            </div>
                                            {res.payment === "Paid" ? <span>paid</span> : "Unpaid" }
                                        </h3> )}
            </div>
        </div>
    )
}

export default PendingBills
