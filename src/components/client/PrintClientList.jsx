import React, {useContext, useState, useEffect} from 'react'

import { ClientNames } from '../../App'

import Top from '../common/Top2'



export default function ClientList({todayIs}) {

    const captureNamesFromData = useContext(ClientNames)
     
    
    const arraySort = () => {
        captureNamesFromData.sort((a, b) => {
            let x = a.clientName.toLowerCase();
            let y = b.clientName.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        })
    }
    arraySort()
    
    const clientArray = captureNamesFromData.map( res => 
        <div style={{width: "800px", height:"40px", border:"1px solid gray"}}>
            
            <div style={{width: "300px", float:"left", textAlign:"left", padding:"10px", borderRight:"1px solid gray"}}>{res.clientName}</div>    
           
            <div style={{ float:"left", textAlign:"left", padding:"10px"}}>{res.consigner.toString()}</div>    
            

        </div>
        
        )
    
    return (
        <div style={{padding:"30px"}}>
            <Top today={todayIs} />
            <h3>Client List</h3>
            {clientArray}
        </div>
    )
}
