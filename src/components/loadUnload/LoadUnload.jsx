import React,{useContext, useState, useEffect} from 'react'
import Nav from '../common/Nav'
import { Consignments } from '../../App'
import ConsignmentList from '../consignment/ConsignmentList'
import Pagination from '../common/Pagination'
import EditConsignment from '../consignment/EditConsignment'
import AddConsignment from '../consignment/AddConsignment'
import ConsTitles from './ConsTitles'
import SearchByDate from '../common/SearchByDate'
import {VisitTrack} from '../../App'
import { FiDownload } from 'react-icons/fi'
import Modal from '../common/Modal'

export default function LoadUnload({todayInSeconds}) {
    const[idNew, setIdNew] = useState()
    const[client, setClient ] = useState()
    const [modal , setModal] = useState(false)
    const [consignment, setConsignment] = useState([])
    const [sortColumn, setSortColumn] = useState()

    const captureSearchTerm = useContext(VisitTrack)

    const sortThis = (v) => setSortColumn(v)
    console.log(sortColumn)

    const captureConsignmentsFromData = useContext(Consignments)
    const getId = (id, name) => {
        console.log(name +"..." + id)
        setIdNew(id)
        setClient(name)
    }
    

    const showModal = (e) => setModal(e)
    console.log(modal + "now")
    
    let consArray = []
    

    const arraySort = () => {
        
        if( sortColumn === "amount" || sortColumn === "package1" ||
            sortColumn === "load" || sortColumn === "unload" ||
            sortColumn === "weight" || sortColumn === "cWeight"  || 
            sortColumn === "rate" || sortColumn === "delivery" ){
            captureConsignmentsFromData.sort((a, b) => b[sortColumn] - a[sortColumn])  
        } else if ( sortColumn === "client" || sortColumn === "consigner" ||
                    sortColumn === "consignee" || sortColumn === "Pod" ||
                    sortColumn === "payment" 
        ){
            captureConsignmentsFromData.sort((a, b) => {
                let x = a[sortColumn].toLowerCase();
                let y = b[sortColumn].toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        } 
        
    }
    arraySort()
    
    const getData = () => {
        consArray = captureConsignmentsFromData.map( res => 
        <ConsignmentList resConsgn={res} clickedId={getId} todayInSeconds={todayInSeconds}/>)  
    }
    getData()

    const closeUpdates = (e) => setIdNew(e)
    
    const searchNames = (e) => {
        const x = document.getElementById("searchCons").elements[0].value
        captureSearchTerm.countDispatch({type:'searchTerm', value: x})
    }
   
    useEffect(()=>{ arraySort()},[sortColumn])
    
    useEffect(()=>{ getData() },[captureConsignmentsFromData])
    useEffect(()=>{ getData() },[modal])

    return (
        <div>
            
            <div className="consSearchPanel" >
                <div style={{position: "relative", float: "left"}}>
                    <form name="searchCons"  id="searchCons"   >
                            <input type="text" name="searchTerm" placeholder="Search by name" ></input>
                            <button type="button"  className="roundClick"  onClick={searchNames}><FiDownload /></button>
                    </form>
                </div>
                
                <div className="datePad" style={{position: "relative", float: "left", width: "400px"}}> 
                    <h5>Search by Date</h5>   
                    <SearchByDate />
                </div>
                <div style={{position: "relative", float: "left", paddingTop: "10px"}}>
                    <button type="button"  className="button center" onClick={() => showModal(true)}> Add Consignment </button>
                </div>
            </div>
            <div>
                <h3 className="title">Consignment List</h3>
                <ConsTitles sorter={sortThis}/>
                <div className="consContent"><Pagination listData={consArray} len={consArray.length} entries={6} /></div>
            </div>
            <Modal modal={modal}> 
                <AddConsignment onclick= {() => showModal()}/>
                <button type="button"  className="roundButton" onClick={() => showModal(false)}> X </button>
            </Modal>

            {idNew ? <EditConsignment id={idNew} nameC={client} noId={closeUpdates} onclick={showModal}/> : ''}
            <Nav />
        </div>
    )
}
