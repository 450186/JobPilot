import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const handleLogOut = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <nav className="navbar">
            <h1>JobPilot</h1>
            <div className="navbar-links">
                <Link to="/">Dashboard</Link>
                <Link to="/applications">Applications</Link>
                <button className="logout-button" onClick={handleLogOut}>Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar