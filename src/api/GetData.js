

const GetData = async (dataName) => {
    let dataToFetch = `http://localhost:5000/${dataName}`
    //let consignments  = 'http://localhost:5000/consignments'

    const res = await fetch(dataToFetch)
    const fetchedData = await res.json()
    return fetchedData
    // const res2 = await fetch(consignments)
    // consignmentNames ( await res2.json())

    //console.log(fetchedData)
  }

export default GetData
