

function DateInt(thisDate) {
    const dateInt = new Date(thisDate)
    
    return (
        parseInt(dateInt.getTime())
        
    )
    
}
export default DateInt
