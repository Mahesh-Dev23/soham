import React, { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print';
import Nav from '../common/Nav'
import '../../main.scss'
import PrintContainer from '../pdf/PrintContainer'
import MainReport from '../main/MainReport'
import PrintClientList from '../client/PrintClientList'
import UnpaidBills from './UnpaidBills';
import PendingStockList from './PendingStocksList'
import PrintConsignments from './PrintConsignments'
import Invoice from './Invoice'



function ForPrint({colorsStates, todayIs}) {
    const [printContent, setPrintContent] = useState()
    const componentRef = useRef();
    const content = printContent === "Main Report" ? <MainReport colorsStates={colorsStates} todayIs={todayIs}/>:
                    printContent === "Client List" ? <PrintClientList todayIs={todayIs}/> : 
                    printContent === "Pending Bills" ? <UnpaidBills todayIs={todayIs}/> : 
                    printContent === "Pending Stocks" ? <PendingStockList todayIs={todayIs}/> : 
                    printContent === "Consignments" ? <PrintConsignments todayIs={todayIs}/> : 
                    printContent === "Invoice" ? <Invoice todayIs={todayIs}/> :
                    <MainReport colorsStates={colorsStates} todayIs={todayIs}/>
    const printThis = (value) => setPrintContent(value)
    return (
        <div className="printLayout" >
            <p > Select from left side menu, preview and save 'Save to PDF' from the button at the bottom</p>
            <div className="printable">
                <div>
                    <div className="printMenu">
                        <h4 onClick={()=> printThis("Main Report")}>Main Report</h4>
                        <h4 onClick={()=> printThis("Client List")}>Client List</h4>
                        <h4 onClick={()=> printThis("Consignments")}>Consignments</h4>
                        <h4 onClick={()=> printThis("Pending Bills")}>Pending Bills</h4>
                        <h4 onClick={()=> printThis("Pending Stocks")}>Pending Stocks</h4>
                        <h4 onClick={()=> printThis("Invoice")}>Invoice</h4>
                    </div>
                    <div className="printView">
                        <PrintContainer ref={componentRef} content={"content"} >
                            {content}
                        </PrintContainer> 
                    </div>
                </div>
            </div>
            <ReactToPrint
                trigger={() => <button className="button">Save to PDF</button>}
                content={() => componentRef.current}
            /> 
            
            
            
            <Nav />
        </div>
    )
}

export default ForPrint
