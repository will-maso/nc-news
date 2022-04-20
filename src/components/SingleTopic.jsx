import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
const SingleTopic = () => {
const [articles, setArticles] = useState([])
const {topic_slug} = useParams()

    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/?topic=${topic_slug}`).then((data) => {
            setArticles(data.data.articles)
        }).catch((err) => {
            console.log(err.response)
        })
    }, [topic_slug])
    return (
        <main>
    <h2 className="title">Articles</h2>
    <ul>
        {articles.map((article) => {
            return (
            <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                Topic: {article.topic}.  "{article.title}"
                </Link>
            </li>
            )
        })}
    </ul>
    </main>
    )
}

export default SingleTopic