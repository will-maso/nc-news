import axios from "axios"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles`).then((data) => {
            setArticles(data.data.articles)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <main>
    <h2>Articles</h2>
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