import axios from "axios"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

const Comments = () => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({
        username: "jessjelly",
        body: ""
    })
    const [err, setErr] = useState(null)
    const [clicked, setClicked] = useState(false)
    const {article_id} = useParams()
    useEffect(() => {
        axios.get(`https://news-williammason.herokuapp.com/api/articles/${article_id}/comments`).then((data) => {
            setComments(data.data.comments)
        }).catch((err) => {
            console.log(err.response)
        })
    }, [article_id])
    const submitHandler = (e) => {
        setClicked(true)
        e.preventDefault()
        setComments([comment, ...comments])
        axios.post(`https://news-williammason.herokuapp.com/api/articles/${article_id}/comments`, comment).then((response) => {
            console.log(response.data.comment)
            setComments([response.data.comment, ...comments])
        }).catch((err) => {
            setClicked(false)
            setComments((currComments) => {
                let newComments = [...currComments]
                newComments.splice(0, 1);
                return newComments
            })
            setErr("Something went wrong, please try again.")
            console.log(err.response)
        })
    }
    const changeHandler = (e) => {
        setClicked(false)
        setComment((currComment) => {
            return {...currComment, body: e.target.value}
        })
    }
    if (err) return <p>{err}</p>
    return <section>
        <h3 className="title">Comments</h3>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={changeHandler} required />
            <button disabled={clicked}>Add Comment</button>
        </form>
        <ul>
            {comments.map((comment) => {
                return <li key={comment.comment_id}>
                    <h4 className="title">{comment.author}</h4>
                    {comment.body}
                    <br></br>
                    Votes: {comment.votes}
                </li>
            })}
        </ul>
    </section>
    
}

export default Comments