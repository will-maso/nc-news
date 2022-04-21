import axios from "axios"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

const Comments = () => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({
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
        setComments([newComment, ...comments])
        axios.post(`https://news-williammason.herokuapp.com/api/articles/${article_id}/comments`, newComment).then((response) => {
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
        setNewComment({
        username: "jessjelly",
        body: ""
    })
    }
    const changeHandler = (e) => {
        setClicked(false)
        setNewComment((currComment) => {
            return {...currComment, body: e.target.value}
        })
    }
    const deleteHandler = (comment_id) => {
        let newComments = [...comments]
        for(let i = 0; i < newComments.length; i++) {
            if(newComments[i].comment_id === comment_id && newComments[i].author === "jessjelly") {
                newComments.splice(i, 1)
            }
        }
        setComments(newComments)
        axios.delete(`https://news-williammason.herokuapp.com/api/comments/${comment_id}`)
        .catch((err) => {
            setErr("Something went wrong, please try again.")
            console.log(err.response)
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
                    Votes: {comment.votes} {comment.author === "jessjelly" && <button onClick={() => deleteHandler(comment.comment_id, comment.author)}>Delete Comment</button>}
                </li>
            })}
        </ul>
    </section>
    
}

export default Comments