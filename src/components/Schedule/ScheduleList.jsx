import React,{useContext} from 'react'
import { Consignments } from '../../App'
import Nav from '../common/Nav'
function ScheduleList() {
    const captureConsignmentsFromData = useContext(Consignments)
    const now = new Date()
    const today = now.setHours(0, 0, 0, 0)
    //console.log(now.setHours(0, 0, 0, 0))
    return (
        <div className="main">
            <h3 className="title">Upcoming tasks</h3>
            
            <div className="resultBox" style={{marginLeft:"250px", marginRight:"20px", height:"480px", overflowY: "scroll"}}>
                <h5>Deliveries ahead</h5>  
                { captureConsignmentsFromData.map(res =>
                     res.delv >= today ? <h4 style={{marginTop:"5px"}}>{`${res.delivery},  ${res.client}, Pkg: ${res.package}`}</h4> : null
                    )}
            </div>
            <div className="resultBox" style={{height:"480px", overflowY: "scroll"}}>
                <h5>Unloading ahead</h5> 
                { captureConsignmentsFromData.map(res =>
                    res.unload >= today ? <h4 style={{marginTop:"5px"}}>{`${res.uloading},  ${res.client}, Pkg: ${res.package}`}</h4> : null
                    )}
            </div>
            <Nav />
        </div>
    )
}

export default ScheduleList
