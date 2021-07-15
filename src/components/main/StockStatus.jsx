import React from 'react'
import { Doughnut } from 'react-chartjs-2';
function StockStatus({total, stock, paid, unpaid, paidColor, unpaidColor}) {
    const data = {
        
        datasets: [
          {
            
            data: [paid, unpaid],
            backgroundColor: [
                "#9acd32",
              "#ff6347"
            ],
            
            borderWidth: .5,
            
	
            
          },
        ],
      };
    return (
        <div className="result" >
            <p id="p1">Remaining Stock out of <b>{total}</b></p>
            <div style={{width: "50%", height: "50%", margin:"auto"}} ><Doughnut data={data} width={150} height={150} /></div>
            
            <h1 style={{color:"#000080", marginTop: "-100px", marginBottom:"50px"}} >{stock}</h1> 
            <p style={{margin: "10px 0", marginTop: "20px"}}>
              <span style={{color:"#ff6347", padding: "0 10px"}}>Unpaid <b>{unpaid}</b></span>
              
              <span style={{color:"#9acd32", padding: "0 10px"}}>Paid <b>{paid}</b></span>
            </p>
            
                            
        </div>
    )
}

export default StockStatus
