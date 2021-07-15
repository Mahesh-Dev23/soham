import React from 'react'
import PendingBills from '../main/PendingBills'
import Top from '../common/Top2'

function UnpaidBills({todayIs}) {
    return (
        <div className="print">
            <Top today={todayIs} />
            
            <PendingBills wid="500px"/>
        </div>
    )
}

export default UnpaidBills
