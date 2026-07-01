import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar">
            <h1>JobPilot</h1>
            <div>
                <Link to="/">Dashboard</Link>
                <Link to="/applications">Applications</Link>
            </div>
        </nav>
    )
}

export default Navbar