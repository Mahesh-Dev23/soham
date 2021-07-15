import React from 'react'

function BIllCOunter({totalAmt}) {
    return (
        <div className="result"  style={{background:"#dcdcdc", borderTop: "1px solid #dcdcdc", borderBottom: "1px solid #dcdcdc", padding: "20px" }}>
            <p id="p2">Pending bills</p>
            <h1 style={{color:"#dc143c", background:"white", borderRadius: "10px", width: "auto", marginTop: "10px"}}>
                <span style={{fontSize:"20px", color:"gray"}}>Rs. </span>
                {totalAmt}
            </h1>
        </div>
    )
}

export default BIllCOunter
