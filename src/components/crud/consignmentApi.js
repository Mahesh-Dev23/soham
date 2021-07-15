import axios from 'axios'


const getConsignments = async (name) => {
    
   return await axios.get('http://localhost:5000/consignments') 
}

export default getConsignments