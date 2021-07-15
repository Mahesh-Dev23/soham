import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DatePick(props) {
    console.log(props)
    const pickDate = (d) => {

        props.newDate(d)
    }
    return (
        <div className="form-group">
            <label className="form-input-label">
                    {props.label}
                </label>
            <DatePicker  selected={props.selected} dateFormat='dd/MM/yyyy' onChange={date => pickDate(date)} minDate={props.min} />    
        </div>
    )
}

export default DatePick
