import React, {useState} from 'react'
import SearchByDate from '../common/SearchByDate'
import Schedule from './Schedule'

function Top({today, stateColor}) {
    const [schedule, setSchedule] = useState(false)
    const scheduleOpen = (e) => setSchedule(e)
    return (
        <>
        <div className="welcome">
            <div className="caption"><h4>Welcome to <span style={{color: stateColor }}>Soham Logistics</span></h4></div>
            <div className="datePad"> <h5>Search by Date</h5>   <SearchByDate /></div>
            <div className="today" onClick={()=>scheduleOpen(true)} >{today}</div>
        </div>
        {schedule ? <Schedule closeSchedule={setSchedule}/> : null}
        </>
    )
}

export default Top
