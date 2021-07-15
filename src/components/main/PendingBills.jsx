import React, {useContext, useState, useEffect} from 'react'
import { Consignments } from '../../App'
import addLoop from '../functions/add'

function PendingBills({wid}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [perClient, setPerClient] = useState([])
    const [sortValue, setSortValue] = useState()
    const [total, setTotal] = useState([])

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
            resConsgn.payment != "Paid" ? 
                        {"client":resConsgn.client, "amount": resConsgn.rate * resConsgn.cWeight }
                     : '' ))
        setTotal(captureConsignmentsFromData.map(resConsgn => 
            resConsgn.payment != "Paid" ? parseInt( resConsgn.rate * resConsgn.cWeight ) : 0 ))             

    }   
    let sortedClient = []
    const arraySort = () => {
        sortedClient = perClient.filter(res => res.client != null || undefined)
        
        if(sortValue === "lower"){
            sortedClient.sort((a, b) => a.amount - b.amount)  
        } else if(sortValue === "higher"){
            sortedClient.sort((a, b) => b.amount - a.amount)  
        } else if(sortValue === "alphabetic"){
            sortedClient.sort((a, b) => {
                let x = a.client.toLowerCase();
                let y = b.client.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        } else {
            sortedClient.sort((a, b) => {
                let x = a.client.toLowerCase();
                let y = b.client.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        }
    }
    arraySort()
    console.log("sort " + sortedClient)

    useEffect(()=>{ getUnpaidList() },[captureConsignmentsFromData]) 
    useEffect(()=>{ arraySort() },[sortValue])  

    return ( 
        <div className="result" style={{width: `${wid}`}}>
            <p style={{marginTop:"0"}}> Pending bills per Consignment: </p>
            <p style={{marginTop:"0", marginBottom: "10px"}}> <b>{` Rs. ${addLoop(total)}`}</b> </p>
            
            <button className="tabButton" 
                onClick={()=>setSortValue("alphabetic")}>
                    Alphabetic
            </button>
            <button className="tabButton" 
                onClick={()=>setSortValue("higher")}>
                    Higher
            </button>
            <button className="tabButton" 
                onClick={()=>setSortValue("lower")}>
                    Lower
            </button>
            <div style={{color:"#dc143c"}}>
                { sortedClient.map(res =>   <div className="pClient" style={{height:"35px", display:"block"}}>
                                            <h4 style={{width: "200px",float:"left", margin: "0", padding: "0"}} >
                                                <span style={{width: "200px", textAlign: "left"}}>{`${res.client}: `}</span>
                                            </h4>
                                            <h4 style={{textAlign: "right", float:"left", margin: "0", padding: "0"}}>{`Rs. ${res.amount}`}</h4> 
                                            </div> )}
            </div>
        </div>
    )
}

export default PendingBills
