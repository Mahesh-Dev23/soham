import React, {useContext, useState} from 'react'
import {VisitTrack} from '../../App'
import Input from './Input'
import { FiPrinter } from 'react-icons/fi'
import SearchByDate from '../common/SearchByDate'

function Nav() {

    const captureNav = useContext(VisitTrack)
    const [searchAll, setSearchAll] = useState()
    return (
        <div>
            <nav> 
                {/* <li><input placeholder="Serach for clients, consignments etc..."/></li> */}
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Main'})}>Home</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'ClientList'})}>Clients</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'LoadingUnloading'})}>Loading/UnLoading</a></li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Status'})}>Schedules</a>  </li>
                <li><a onClick={()=>captureNav.countDispatch({type:'main', value:'Print'})}>Reports and Print <FiPrinter /></a>  </li>
                
            </nav>
            
            
        </div>
    )
}

export default Nav
