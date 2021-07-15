import React from 'react'


const datefunctions = new Promise(function(myResolve, myReject) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const day = new Date()
    //let today = ''
    //const thisDay = DateInt(today) 
    
    console.log(day.getDate() + " " + months[day.getMonth()] + " " + day.getFullYear())
    let getMonth = day.getMonth()
    let getDay = day.getDate()
    let month = getMonth + 1
    const addZero = (ins, outs) =>{
      if(ins <= 9){
        outs = "0"  + outs
      } else {
        outs =  outs
      }
      return outs
    }
    
    myResolve (
      addZero(getDay, getDay) + "/" + addZero(getMonth, month) + "/" + day.getFullYear()
    )
    myReject("Day not set")
})

export default datefunctions
