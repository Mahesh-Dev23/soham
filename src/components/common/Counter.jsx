import React from 'react'

function Counter({cl, content, label}) {
    return (
        <div className={cl} >
            <h3>{ content}</h3>
            <p className="pCons"><span>{label} </span></p>
                           
        </div>
    )
}

export default Counter
