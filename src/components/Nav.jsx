import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../contexts/User";
import { useContext } from "react";

const Nav = () => {
    const [topics, setTopics] = useState([]);
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        axios.get("https://news-williammason.herokuapp.com/api/topics").then((response) => {
            setTopics(response.data.topics)
        }).catch((err) => {
            console.log(err)
        })
    }, [user])
    const logoutHandler = () => {
        setUser("")
        localStorage.setItem("user", "")
    }
    return <section>
        <nav id="nav">
            {!localStorage.getItem("user") ? <Link to="/Login" className="Link">login</Link> : <button onClick={logoutHandler}>Logout</button>}
            <br></br>
            {topics.map((topic) => {
                return <Link to={`/${topic.slug}`} key={topic.slug} className="Link" >{topic.slug}</Link> 
            })}
        </nav>
    </section>
}

export default Nav