//import axios from 'axios'


const getNames = async (dataName) => {
    
   //return await axios.get('http://localhost:5000/client') 

   let dataToFetch = `http://localhost:5000/${dataName}`
    

    const res = await fetch(dataToFetch)
    const fetchedData = await res.json()
    return fetchedData
}

export default getNames