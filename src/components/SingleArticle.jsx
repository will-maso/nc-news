import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"

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
    const ClickHandler = () => {
        axios.patch(`https://news-williammason.herokuapp.com/api/articles/${article_id}`, {
            inc_votes: 1
        }).then((data) => {
            setArticle(data.data.article)
        }).catch((err) => {
            console.log(err.response)
        })
    }
    return (
    <section>
        <h2>{article.title} </h2>
        <h3>{article.author}</h3>
        <h4>Votes: {article.votes} <button onClick={ClickHandler}>upVote</button></h4>
        <p>
            {article.body}
        </p>
        {/* <Link to={`/articles/${article_id}/comments`}>Comments</Link> */}
    </section>
    )
}

export default SingleArticle