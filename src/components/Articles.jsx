import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(0)
    
    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles?page=${page}`).then((data) => {
            setArticles(data.data.articles)
        }).catch((err) => {
            console.log(err)
        })
    }, [page])

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

    return (
        <main>
    <h2 className="title">Articles</h2>
    <p>Current Page: {page + 1}</p>
    {page > 0 && <button onClick={prevHandler}>Previous Page</button>} 
    {articles.length === 10 && <button onClick={nextHandler}>Next Page</button> }
    <ul>
        {articles.map((article) => {
            return <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}` } >
                Topic: {article.topic}.  "{article.title}"
                </Link>
            </li>
        })}
    </ul>
    </main>
    )
}

export default Articles