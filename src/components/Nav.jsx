import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        axios.get("https://news-williammason.herokuapp.com/api/topics").then((response) => {
            setTopics(response.data.topics)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return <section>
        <h2>Nav</h2>
        <nav>
            <Link to="/articles">Home</Link>
            {topics.map((topic) => {
                return <Link to={`/${topic.slug}`} key={topic.slug}>{topic.slug}</Link>
            })}
        </nav>
    </section>
}

export default Nav