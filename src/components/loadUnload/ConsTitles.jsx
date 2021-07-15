import React from 'react'

function ConsTitles({sorter}) {
    const clickHandle = (v) => sorter(v)

    return (
        <div className="consTitle">
                <div  >
                    <div className="consCell consCellButton" style={{width:"205px" }} onClick={()=>clickHandle("client")}>
                        <p>Client:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"90px"}} onClick={()=>clickHandle("consigner")}>
                        <p>Consignee:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"90px"}} onClick={()=>clickHandle("consignee")}>
                        <p>Consigner:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"100px"}} onClick={()=>clickHandle("load")}>
                        <p>L/UL:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"100px"}} onClick={()=>clickHandle("delv")}>
                        <p>Delivery:</p>
                        
                    </div>
                
                    <div className="consCell consCellButton" style={{width:"80px"}} onClick={()=>clickHandle("Pod")}> 
                        <p>PoD:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"70px"}} onClick={()=>clickHandle("package1")}>
                        <p>Pkg:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"70px"}} onClick={()=>clickHandle("weight")}>
                        <p>Weight:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"70px"}} onClick={()=>clickHandle("cWeight")}>    
                        <p>C-Weight:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"50px"}} onClick={()=>clickHandle("rate")}>
                        <p>Rate:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"80px"}} onClick={()=>clickHandle("amount")}> 
                        <p>Amount:</p>
                        
                    </div>
                    <div className="consCell consCellButton" style={{width:"80px", border:"none"}} onClick={()=>clickHandle("payment")}> 
                        <p>Payment:</p>
                        
                    </div>
                    
                    
                
                    
                    <div  style={{height: "80px"}} >
                        
                    </div>        
                </div>
               
            </div>
    )
}

export default ConsTitles
