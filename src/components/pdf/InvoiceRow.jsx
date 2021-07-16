import React from 'react'

function InvoiceRow(props) {
    //console.log(props.billRow)
    return (
        <div className="invoiceRow">
            <p style={{width:"8%"}}>Row Labels</p>
            <p>{props.billRow ? props.billRow[1] : "Consigner"}</p>
            <p style={{width:"19%"}}>{props.billRow ? props.billRow[0] : "Consignee"}</p>
            <p>{props.billRow ? props.billRow[3] : "PoD"}</p>
            <p style={{width:"7%"}}>{props.billRow ? props.billRow[8] : "Book"}</p>
            <p style={{width:"7%"}}>{props.billRow ? props.billRow[9] : "Page"} </p>
            <p>{props.billRow ? props.billRow[4] : "Package"}</p>
            <p>{props.billRow ? props.billRow[5] : "Weight"}</p>
            <p style={{width:"7%"}}>{props.billRow ? props.billRow[7] : "Rate"}</p>
            <p>{props.billRow ? props.billRow[6] : "Amount(Rs.)"}</p>
        </div>
    )
}

export default InvoiceRow
