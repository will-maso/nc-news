import axios from "axios"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

const Comments = () => {
    const [comments, setComments] = useState([])
    const {article_id} = useParams()
    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/${article_id}/comments`).then((data) => {
            console.log(data.data.comments)
            setComments(data.data.comments)
        }).catch((err) => {
            console.log(err.response)
        })
    }, [article_id])
    return <section>
        <h3>Comments</h3>
        <ul>
            {comments.map((comment) => {
                return <li key={comment.comment_id}>
                    <h4>{comment.author}</h4>
                    {comment.body}
                    <br></br>
                    Votes: {comment.votes}
                </li>
            })}
        </ul>
    </section>
    
}

export default Comments