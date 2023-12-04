import React,{useState,useEffect} from 'react'
import axios from "axios"
import "./Home.css"
const Home = () => {
    const [data,setData] = useState([])
    const [filteredData,setFilteredData] = useState([])
    const [search, setSearch] = useState("")
    const [perPage, setPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/todos/").then((response)=>
        setData(response.data))
    },[])

    useEffect(()=>{
        const filtered = data.filter((item)=>
        item.title.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(filtered)
    },[search,data])

    const pages = Math.ceil(filteredData.length/perPage)
    const pagesArray = [...Array(pages+1).keys()].slice(1)
    
    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const pageData = filteredData.slice(firstIndex,lastIndex)

  return (
    <>
    <input
    type='text'
    onChange={(e)=> setSearch(e.target.value)}
    value={search}
    placeholder='search by title'
    />
    <select onChange={(e)=>setPerPage(e.target.value)}>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
    </select>
    <table className='todo-table'>
    <thead>
    <tr>
    <td>ID</td>
    <td>TITLE</td>
    <td>STATUS</td>
    </tr>
    </thead>
    <tbody>
    {pageData.map((item,index)=>(
        <tr key={index}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.completed.toString()}</td>
        </tr>
    ))}
    </tbody>
    <div className='pagination'>
    <button style={{display: currentPage !== 1 ? "" : "none" }} onClick={()=> setCurrentPage(currentPage !== 1 ? currentPage-1 : currentPage)}>Previous</button>
    {
        pagesArray.map((page,index)=>(
            <span onClick={()=> setCurrentPage(page)} style={{fontSize : page == currentPage ? "25px":"15px", color:currentPage == page ? "blue":""}}>{`${page} |`}</span>
        ))
    }
    <button style={{display: currentPage !== pages ? "" : "none" }} onClick={()=> setCurrentPage(currentPage !== pages ? currentPage + 1 : currentPage)}>Next</button>
    </div>
    </table>
    </>
  )
}

export default Home