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
    }, [])
    return <section>
        <nav>
            {!user ? <Link to="/Login" className="Link">Login</Link> : <button onClick={() => setUser(null)}>Logout</button>}
            <Link to="/" className="Link">Home</Link>
            {topics.map((topic) => {
                return <Link to={`/${topic.slug}`} key={topic.slug} className="Link">{topic.slug}</Link> 
            })}
        </nav>
    </section>
}

export default Nav