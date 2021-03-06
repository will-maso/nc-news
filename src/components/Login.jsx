import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/User"
import { useState } from "react"
import axios from "axios"

const Login = () => {   
    const [newUser, setNewUser] = useState()

    const [users, setUsers] = useState([])

    const {user, setUser} = useContext(UserContext)
    
    const [err, setErr] = useState(null)

    const login = (e) => {
        e.preventDefault()
        setUser(users.filter(username => username.username === newUser)[0].username)
    }

    const changeHandler = (e) => {
        setNewUser(e.target.value)
    }
    useEffect(() => {
        localStorage.setItem("user", user)
        axios.get(`https://news-williammason.herokuapp.com/api/users`).then((response) => {
            setUsers(response.data.users)
        }).catch((err) => {
            setErr(err.response.data)
        })
    }, [err, user])
    
    if (localStorage.getItem("user") !== "null" && localStorage.getItem("user").length !== 0) {
        console.log(localStorage.getItem("user"))
        localStorage.setItem("user", user)
        return <p>Successful login press the home button to view the list of all articles, where you can now add/remove comments and upVote articles as you please</p>
    }
   
    return <section>
        {err && err}
    <br></br>
        <form onSubmit={login}>
            <label>Username: </label>
            <input type={"text"} required onChange={changeHandler}></input>
            <button>Login</button>
        </form>
    </section>
}

export default Login