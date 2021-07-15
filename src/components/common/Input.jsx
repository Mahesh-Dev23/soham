import React,{useEffect, useRef} from 'react'


function Input( { label,  value, style, type, placeholder, del, id, inputchange}) {
    const inputValue = useRef("")

        const handleChange = (ev) => {
            //inputchange(inputValue.current.value)
        }
        

        useEffect(()=>{
            handleChange()
        })

        return (    
            <div className="form-group" id ={id}>
                
                {
                    label ? 
                    (<label className="form-input-label">
                        {label}
                    </label>)
                    : null }
                <input ref={inputValue} className = "form-input" onChange = {e=>handleChange(e.target.value)} value={value} style={style} type={type} placeholder={placeholder}  otherprops/> 
                {del ? del : ''}   
            </div>
        )

}


export default Input
