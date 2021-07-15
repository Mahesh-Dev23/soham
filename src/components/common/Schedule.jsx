import React, {useContext} from 'react'
import { Consignments } from '../../App'
function Schedule({closeSchedule}) {
    const captureConsignmentsFromData = useContext(Consignments)
    const now = new Date()
    const today = now.setHours(0, 0, 0, 0)
    console.log(today)
    const closeUpdates = (e) => closeSchedule(e)
    
    return (
        <div className="schedule" style={{height:"490px", overflowY: "scroll"}}>
            <h4>Today's Schedule</h4>
            <div>
                <h4>Delivery Today</h4>  
                { captureConsignmentsFromData.map(res =>
                     res.delv === today ? <h5>{`${res.client}, Pkg: ${res.package}`}</h5> : null
                    )}
            </div>
            <div style={{marginTop:"10px"}}>
                <h4>Unloading Today</h4> 
                { captureConsignmentsFromData.map(res =>
                    res.unload === today ? <h5>{`${res.client}, Pkg: ${res.package}`}</h5> : null
                    )}
            </div>
            <button type="button"  className="roundButton" onClick={() => closeUpdates(false)}> X </button>
        </div>
    )
}

export default Schedule
