import React from 'react'
import SearchByDate from './SearchByDate'

function Top2({today, stateColor}) {
    return (
        <div className="welcome2">
            <div className="caption"><h4>Welcome to <span style={{color: stateColor }}>Soham Logistics</span></h4></div>
            <div className="datePad"> <h5>Search by Date</h5>   <SearchByDate /></div>
            <div className="today" >{today}</div>
        </div>
    )
}

export default Top2
