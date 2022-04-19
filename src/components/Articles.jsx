import axios from "axios"
import {useState, useEffect} from "react"

const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get("https://news-williammason.herokuapp.com/api/articles").then((data) => {
            console.log(data.data.articles)
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
                Topic: {article.topic}.  "{article.title}"
            </li>
        })}
    </ul>
    </main>
    )
}

export default Articles