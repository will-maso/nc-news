import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
const SingleTopic = () => {
const [articles, setArticles] = useState([])
const {topic_slug} = useParams()
const [page, setPage] = useState(0)
const [sortby, setSortby] = useState("created_at")
const [orderby, setOrderby] = useState("desc")

    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/?topic=${topic_slug}&&page=${page}&&sort_by=${sortby}&&order=${orderby}`).then((data) => {
            setArticles(data.data.articles)
        }).catch((err) => {
            console.log(err.response)
        })
    }, [topic_slug, page, sortby, orderby])
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
    <ul>
        {articles.map((article) => {
            return (
            <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                Topic: {article.topic}.  "{article.title}"
                Comments: {article.comment_count}
                </Link>
            </li>
            )
        })}
    </ul>
    </main>
    )
}

export default SingleTopic