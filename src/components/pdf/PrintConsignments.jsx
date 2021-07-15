import React, {useContext, useState, useEffect} from 'react'
import { Consignments } from '../../App'
import Top from '../common/Top2'

function PrintConsignments({todayIs}) {
    const captureConsignmentsFromData = useContext(Consignments)

    const [consignmentCaptured, setConsignmentCaptured] = useState([])
    const [perClient, setPerClient] = useState([])

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
                        {"client":resConsgn.client, "stocks": `${resConsgn.package1} / ${resConsgn.package}`, "payment" : resConsgn.payment }
                     : '' ))
    }   
    useEffect(()=>{ 
        getUnpaidList() 
        perClient.sort()
    },[])          

    return ( 
        <div className="print " >
            <Top today={todayIs} />
            <p >Consignment List</p>
            <div className="printCons" style={{color:"#dc143c", width:"1300px", margin: "auto"}}>
                { captureConsignmentsFromData.map(res =>  
                                        <p className="pClient" >
                                            <span style={{width: "250px"}}><b>{`${res.client} `}</b></span> 
                                            <span style={{width: "140px"}}>{`${res.consigner} `}</span>
                                            <span style={{width: "70px"}}>{`${res.consignee} `}</span>
                                            <span style={{width: "70px"}}>{`${res.loading} `}</span>
                                            <span style={{width: "70px"}}>{`${res.uloading} `}</span>
                                            <span style={{width: "80px"}}>{`${res.Pod} `}</span>
                                            <span style={{width: "50px"}}>{`${res.package1} / ${res.package} `}</span>
                                            <span style={{width: "35px"}}>{`${res.weight} `}</span>
                                            <span style={{width: "35px"}}>{`${res.cWeight} `}</span>
                                            <span style={{width: "30px"}}>{`${res.rate} `}</span>
                                            <span style={{width: "60px"}}>{`${res.amount} `}</span>
                                            <span style={{width: "45px"}}>{`${res.payment} `}</span>
                                            <span style={{width: "100px"}}>{`${res.remark} `}</span>
                                        </p>)}
            </div>
        </div>
    )
}

export default PrintConsignments
