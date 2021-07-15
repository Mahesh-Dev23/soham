import React from 'react'
import { Bar } from 'react-chartjs-2';
function ConsignmentStatus({closed, paid, unpaid, opened}) {
    const data = {
        labels: ['Paid-Delivered', 'Paid-Undelivered', 'Unpaid-Undelivered', 'Unpaid-Delivered'],
        datasets: [
          {
            label: '',
            data: [closed, paid, unpaid, opened],
            backgroundColor: [
                "#888888",
                "#9acd32",
                "#ff6347",
                "#dc143c"
            ]
            
             
            
	
            
          },
        ],
      };

      const options = {
        indexAxis: 'y',
        
        responsive: true,
        
      };
    return (
        <div  className="result2" style={{background: "white", width: "340px", padding: "10px", height: "auto"}} >
            <div style={{ margin:"auto"}} ><Bar data={data} options={options} /></div>
            <p style={{fontSize: "14px"}}>Consignment Status</p>             
        </div>
    )
}

export default ConsignmentStatus
