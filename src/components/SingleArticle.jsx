import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const SingleArticle = () => {
    const [article, setArticle] = useState("")
    const {article_id} = useParams()
    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/${article_id}`).then((data) => {
            console.log(data.data.article)
            setArticle(data.data.article)
        }).catch((err) => {
            console.log(err.response)
        })
    }, [article_id])
    return (
    <section>
        <h2>{article.title} </h2>
        <h3>{article.author}</h3>
        <p>
            {article.body}
        </p>
        {/* <Link to={`/articles/${article_id}/comments`}>Comments</Link> */}
    </section>
    )
}

export default SingleArticle