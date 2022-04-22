import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"
import Comments from "./Comments"
import { UserContext } from "../contexts/User"
import { useContext } from "react"

const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const [err, setErr] = useState(null)
    const [clicked, setClicked] = useState(false)
    const {article_id} = useParams()
    const {user} = useContext(UserContext)

    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/${article_id}`).then((data) => {
            setArticle(data.data.article)
        }).catch((err) => {
            setErr(err.response.data)
            console.log(err.response)
        })
    }, [article_id])

    const ClickHandler = () => {
        if (user) {
            setArticle((currArticle) => {
                return {...currArticle, votes: currArticle.votes +1 }
            })
            setClicked(true)
            setErr(null)
    
            axios.patch(`https://news-williammason.herokuapp.com/api/articles/${article_id}`, {
                inc_votes: 1
            }).then((data) => {
                setArticle(data.data.article)
            }).catch((err) => {
                setArticle((currArticle) => {
                return {...currArticle, votes: currArticle.votes -1 }
                })
                setErr("Something went wrong, please try again.")
                setClicked(false)
                console.log(err.response)
            })
        } else {
            setErr("Please login to vote")
        }
    }
    
    if(err) return <p>{err}</p>

    return (
    <section className="articlePage">
        <h2 className="title">{article.title} </h2>
        <h3 className="title">Author: {article.author}</h3>
        <h4 className="title">Votes: {article.votes} </h4><button onClick={ClickHandler} disabled={clicked}>upVote</button>
        <p className="Article">
            {article.body}
        </p>
        <Comments />
    </section>
    )
}

export default SingleArticle