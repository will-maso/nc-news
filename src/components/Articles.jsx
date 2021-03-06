import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(0)
    const [sortby, setSortby] = useState("created_at")
    const [orderby, setOrderby] = useState("desc")
    const [err, setErr] = useState(null)
    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles?page=${page}&&sort_by=${sortby}&&order=${orderby}`).then((data) => {
            setArticles(data.data.articles)
        }).catch((err) => {
            setErr(err.response.data)
            console.log(err)
        })
    }, [page, sortby, orderby])

    const nextHandler = () => {
        setPage((currPage) => {
            return currPage + 1
        })
    }
    const prevHandler = () => {
        setPage((currPage) => {
            return currPage - 1
        })
    }
    const sortHandler = (e) => {
        setSortby(e.target.value)
    }
    const orderHandler = (e) => {
        setOrderby(e.target.value)
    }
    if (err) return <p>{err}</p>
    return (
        <main>
            <br></br>
            <label htmlFor="sortby">Choose filter: </label>
            <select name="sortby" id="sortby" onChange={sortHandler}>
                <option value="created_at">date</option>
                <option value="votes">votes</option>
                <option value="title">title</option>
                <option value="comment_count">comment count</option>
            </select>
            <select name="orderby" id="orderby" onChange={orderHandler}>
                <option value="desc">descending</option>
                <option value="asc">ascending</option>
            </select>
    <h2 className="title">Articles</h2>
    <p>Current Page: {page + 1}</p>
    {page > 0 && <button onClick={prevHandler}>Previous Page</button>} 
    {articles.length === 10 && <button onClick={nextHandler}>Next Page</button> }
    <ul className="List">
        {articles.map((article) => {
            return <li key={article.article_id} className="listItem">
                Topic: {article.topic}.  
                <Link to={`/articles/${article.article_id}` } className="Link">
                "{article.title}"
                </Link>
                Comments: {article.comment_count}
            </li>
        })}
    </ul>
    </main>
    )
}

export default Articles