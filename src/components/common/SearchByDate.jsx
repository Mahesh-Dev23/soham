import React, {useContext, useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {VisitTrack} from '../../App'
import { FiDownload } from 'react-icons/fi'

function SearchByDate() {
    const captureSearchDate = useContext(VisitTrack)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const [begin, setBegin] = useState()
    const [endD, setEndD] = useState()
    const [changeDate, setChangeDate] = useState(false)
    
    let beginDt 
    let endDt 
    useEffect(()=>{
        setBegin(new Date('01/01/2021'))
        setEndD(new Date())
        
    },[])
    const startDate = (d) => setBegin(d)

    const endDate = (d) => setEndD(d)

    const selectDates = () => {
        
        captureSearchDate.countDispatch({type:'searchByDate', value:'', startDate: begin, endDate: endD})
    }
    useEffect(()=>{
         
        selectDates()
    },[])
    
    

    //console.log(Date.parse(begin.toString))
    
    return (
        <div className="searchDatePad">
            <div className="searchbyDate">
                <DatePicker  selected={begin} dateFormat='dd/MM/yyyy' onChange={date => startDate(date)}  />   
            </div>
            {/* <p style={{float:"left", display:"inline-block"}}>to</p> */}
            <div  className="searchbyDate">
                <DatePicker  selected={endD} dateFormat='dd/MM/yyyy' onChange={date => endDate(date)}  />  
            </div >
            <div  className="searchbyDate" style={{width: "40px", paddingTop:"10px"}}>
                <button type="button"  className="roundClick"  onClick={selectDates}><FiDownload /></button>
            </div>
        </div>
    )
}

export default React.memo(SearchByDate)
