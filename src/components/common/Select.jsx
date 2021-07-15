import React, {useEffect, useRef} from 'react'


function Select({label, option, id, selected, selectedId }) {

    const x = document.getElementsByClassName("selectName")
    
    const handleChange = (ev) =>{
        selected(ev) 
        //alert("select " + ev)
    }
    // console.log("selectedId " + numId + 1) 
    // //const setName = () => x[selectedId].setAttribute("selected", "")
    // useEffect(()=>{
    //     //setName()
    // },[])

    return (
        <div className="form-group" >
            
            {
                label ? 
                (<label className="form-input-label"
                    >
                    {label}
                </label>)
                : null }
            <select   name="select"  id={id} onChange={e=>handleChange(e.target.value)}>
                
                {option.map(data => <option key={data} value={data} className="selectName">{data}</option> )}
                
            </select>    
        </div>
    )
}

export default Select
