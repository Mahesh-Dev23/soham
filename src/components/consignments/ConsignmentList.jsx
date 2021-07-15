import React,{useContext} from 'react'
import { Consignments } from '../../App'

function ConsignmentList() {
    const consignments = useContext(Consignments)
    return (
        <div>
            <h4>Consignment List</h4>
            <h1>{consignments ? consignments.map(res => res.client ) : ''}</h1>
        </div>
    )
}

export default ConsignmentList
