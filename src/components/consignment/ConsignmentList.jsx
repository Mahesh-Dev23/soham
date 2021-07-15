import React, {useContext, useState, useEffect} from 'react'
import { Consignments } from '../../App'
import { FiTrash2 } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiFilePlus } from 'react-icons/fi'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import {VisitTrack} from '../../App'
import axios from 'axios'

function ConsignmentList({resConsgn, clickedId, todayInSeconds, clickedName, sortColumn}) {
    //const captureConsignmentsFromData = useContext(Consignments)
    const captureModal = useContext(VisitTrack)
    const colorStateGreen = "#9acd32"
    const colorStateGray = "#888888"
    const colorStateOrange = "#ff6347"
    const colorStateRed = "#dc143c"
    const colorStateBlue = "#1e90ff"
    let amnt
    const totalAmount = 0

    const amount = ( W , R ) => {
       return( 
        amnt = W * R
        ) 
    }
    
    const getEditId = (id, name) => { 
        clickedId(id, name)
        captureModal.countDispatch({type:'modal',  modal: true, value: ''})
    }
    
    // delete client
    const delCons = async (e) => {
        console.log(e)
       // return await axios.delete(`http://localhost:5000/client/${e}`)
    }
    delCons()

    let consStatus = "L"
    let statColor

    const setConsStatus = () =>{
        if(resConsgn.payment === "paid" && resConsgn.status === "Billed"){
            consStatus = "P"
            statColor = colorStateGray
        } else if(resConsgn.status === "Billed" || resConsgn.payment === "paid" && resConsgn.package1 < 1){
            consStatus = "B"
            statColor = colorStateGreen
        } else if(resConsgn.package1 < 1 || resConsgn.payment === "paid" && resConsgn.package1 < 1){
            consStatus = "D"
            statColor = colorStateRed
        } else if(resConsgn.unload < todayInSeconds){
            consStatus = "U"
            statColor = colorStateBlue
        } else{
            consStatus = "L"
            statColor = colorStateOrange
        }
    }
    setConsStatus()

    
        
    return (
        <div>
            
            <div className="consList">
                <div className="consName" >
                    <div className="consCell" style={{width:"200px",  borderRight: `5px solid ${
                        resConsgn.payment === "Paid" && resConsgn.package1 < 1 ? colorStateGray  :
                        resConsgn.payment === "Paid"  ? colorStateGreen :
                        resConsgn.package1 < 1 ? colorStateRed :
                        resConsgn.payment === "To Pay" ? colorStateOrange :
                        colorStateGray
                        }`}}>
                        <p>Client:</p>
                        <h4 style={resConsgn.payment === "Paid" ? {color:`${colorStateGreen}`} :
                                    resConsgn.package1 < 1 ? {color:`${colorStateRed}`} :
                                    resConsgn.payment === "To Pay" ? {color:`${colorStateOrange}`} :
                                    {color:`${colorStateGray}`}
                    }>{resConsgn.client}</h4> 
                    </div>
                    <div className="consCell" style={{width:"90px"}}>
                        <p>Consignee:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{resConsgn.consigner}</h4>
                    </div>
                    <div className="consCell" style={{width:"90px"}}>
                        <p>Consigner:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{resConsgn.consignee}</h4>
                    </div>
                    <div className="consCell" style={{width:"100px"}}>
                        <p>Loading:</p>
                        <h4 className="ulDate" style={{ color:resConsgn.unload < todayInSeconds ? `${colorStateGray}` : `${colorStateBlue}` }}>{`${resConsgn.loading}
                        ${resConsgn.uloading}`}</h4>
                    </div>
                    <div className="consCell" style={{width:"100px"}}>
                        <p>Unloading:</p>
                        <h4 className="ulDate" style={{ color:resConsgn.delv < todayInSeconds ? `${colorStateGray}` : `${colorStateBlue}` }}>{resConsgn.delivery}</h4>
                    </div>
                
                    <div className="consCell" style={{width:"80px"}}> 
                        <p>PoD:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{resConsgn.Pod}</h4>
                    </div>
                    <div className="consCell" style={{width:"70px"}}>
                        <p>Pkg:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{`${resConsgn.package1} / ${resConsgn.package}`}</h4>
                    </div>
                    <div className="consCell" style={{width:"70px"}}>
                        <p>Weight:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{resConsgn.weight}</h4>
                    </div>
                    <div className="consCell" style={{width:"70px"}}>    
                        <p>C-Weight:</p>
                        <h4>{resConsgn.cWeight}</h4>
                    </div>
                    <div className="consCell" style={{width:"50px"}}>
                        <p>Rate:</p>
                        <h4 >{resConsgn.rate}</h4>
                    </div>
                    <div className="consCell" style={{width:"80px"}}> 
                        <p>Amount:</p>
                        <h4 style={resConsgn.payment === "Paid" ? {color:`${colorStateGreen}`} :
                                    resConsgn.package1 < 1 ? {color:`${colorStateRed}`} :
                                    resConsgn.payment === "To Pay" ? {color:`${colorStateOrange}`} :
                                    {color:`${colorStateGray}`}
                    }>
                            {resConsgn.amount}</h4>
                    </div>
                    <div className="consCell" style={{width:"80px", border:"none"}}> 
                        <p>Payment:</p>
                        <h4 style={{color:`${colorStateGray}`}}>{resConsgn.payment}</h4>
                    </div>
                    
                    
                
                    
                    <div className="listButtons tooltip"  >
                        <button type="button"  className="roundClick" onClick={()=> getEditId(resConsgn.id, resConsgn.client)}> <FiEdit /> </button>
                        <Tippy content={`book: ${resConsgn.book}, page: ${resConsgn.page}, ${resConsgn.remark}, ${resConsgn.tempo}`}><button type="button"  className="roundClick" style={{background:`${statColor}`}}>{consStatus} </button></Tippy>
                    </div>        
                </div>
               
            </div>
                
            
           
            
        </div>
    )
}

export default ConsignmentList
