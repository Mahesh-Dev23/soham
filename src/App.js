
import './App.css';
import './main.scss'
import React, {useReducer, useEffect, useState} from 'react'

import Frame from './components/Frame'
import Start from './components/main/Start'
import Main from './components/main/Main'

import ClientList from './components/client/ClientList'
import ForPrint from './components/pdf/ForPrint'
import LoadUnload from './components/loadUnload/LoadUnload'
import  {toast}  from 'react-toastify'
import getNames from './components/crud/api'
import datefunctions from './components/functions/datefunctions'
import ScheduleList from './components/Schedule/ScheduleList';

export const VisitTrack = React.createContext()
export const ClientNames = React.createContext()
export const Consignments = React.createContext()

toast.configure()



function App() {
  
  const display = {
    displayFrame:'',
    modal: false,
    modalContent: '',
    startDate:'Jan 8 2021',
    endDate: '',
    client: 'client?_sort=clientName',
    consignments: 'consignments',
    searchTerm: ''

}
  const colorsStates ={
    colorStateGreen : "#9acd32",
    colorStateGray : "#888888",
    colorStateOrange : "#ff6347",
    colorStateRed : "#dc143c",
    colorStateDBlue : '#000080'
  }

  
  const reducer = (state=display, action) =>{
    switch(action.type){
      case 'main':
        return {displayFrame:action.value}

      case 'modal':
        return {...state, modalContent: action.value, modal: action.modal}  

      case 'nav':
        return {displayFrame:action.value}  

      case 'searchByDate':
        return {...state, startDate: action.startDate, endDate: action.endDate}

      case 'searchTerm':
        return {...state, searchTerm: action.value}  

      case 'sorter':
          return {consignments:action.value}
    
      default :
        return state   
    }

  }

  // user reducer 
  const [newState, dispatch] = useReducer( reducer, display)

  //////// end use reducer

  const now = new Date()
  const todayInSeconds = now.setHours(0, 0, 0, 0)

  let loading = Date.parse(new Date('01/01/2021'))
  let unloading = Date.parse(new Date())

  const [load = loading, setLoad] = useState()
  const [unLoad = unloading, setUnLoad] = useState()

  //////// clicent list from server
  const [clientName, setclientName] = useState([])

  //////// consigment list from server
  const [consignment , setConsignment] = useState([])
  

  const [todayIs, setTodayIs] = useState()
  datefunctions.then(function(value){setTodayIs(value)})

  // data capture
  
  const loadNames = (v) => getNames(v).then(res => setclientName(res) )
  const loadConsigments = (v) => getNames(v).then(res => setConsignment(res))
  
  useEffect(() => { 
    loadNames(newState.client ? newState.client : display.client)
    loadConsigments(newState.consignments ? newState.consignments : display.consignments)
  },[newState.modal])
 
  const setDateBracket = (v) =>  {
    consignment.filter((value) => value.load >= load ? load : loading  && value.unload <= unLoad ? unLoad : unloading )
  }
  
  const searchTermFilter = () => {
    if(newState.searchTerm){
      loadConsigments(`consignments?q=${newState.searchTerm}`)
    }else{
      loadConsigments("consignments")
    }
  }
  
  useEffect(() =>{ 
    searchTermFilter()
    console.log(newState.searchTerm)
    },[newState.searchTerm])
  
  const loadingUnloading = () =>{
    setLoad( Date.parse(newState.startDate) )
    setUnLoad( Date.parse(newState.endDate) )
  }
  useEffect(()=>{loadingUnloading() },[])

  useEffect(() =>{ 
    loadingUnloading() 
    setDateBracket()
  },[newState.startDate, newState.endDate])
  
  console.log( loading + "," + unloading )
  console.log( load + "," + unLoad )


  const displayRoute = newState.displayFrame === "Main" ? <Main modalOut={newState.modal} modalContentOut={newState.modalContent} colorsStates = {colorsStates} todayInSeconds={todayInSeconds}/> : 
  newState.displayFrame === "ClientList" ? <ClientList /> : 
  newState.displayFrame === "Status" ? <ScheduleList /> :
  newState.displayFrame === "LoadingUnloading" ? <LoadUnload todayInSeconds={todayInSeconds}/> :
  newState.displayFrame === "Print" ? <ForPrint colorsStates = {colorsStates} todayIs={todayIs}/> :<Start />

  

  return (
    <VisitTrack.Provider value={{countState: newState, countDispatch: dispatch}}>
      <ClientNames.Provider value={clientName}>
        <Consignments.Provider value= {consignment.filter((value) =>  load ? value.load >= load : value.load >= loading  &&  unLoad ? value.unload <= unLoad : value.unload <= unloading )}>
          <div className="App" id="route">
           
            <Frame > {displayRoute} </Frame>
        
          </div>  
        </Consignments.Provider>
      </ClientNames.Provider>
    </VisitTrack.Provider>
    
  );
}

export default App;
