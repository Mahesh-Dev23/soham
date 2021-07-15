import react, {useState, useEffect} from 'react'

function Pagination({listData, len, entries}) {
    const getData = [listData]
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(entries)

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currenctPost = listData.slice( indexOfFirstPost, indexOfLastPost)

    const pageNumber = []
    //console.log("length= "+ listData)
    if (len > postPerPage){
        for (let i=1; i<= Math.ceil( len / postPerPage); i++){
            pageNumber.push(i)
        }
    }

    const paginate = num => setCurrentPage(num)

    return (
        <>
            {currenctPost}
            
            <ul className="pagination">
                {pageNumber.map( number => 
                    <li key={number} onClick={()=> paginate(number)} href="!#">
                            {number}
                        
                    </li>)}    
                   
            </ul>
            
        </>
    )
}

export default Pagination
