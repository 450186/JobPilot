import { Link, useNavigate, useLocation } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()
    const location = useLocation();

    const isAuthPage = 
        location.pathname === "/login" ||
        location.pathname === "/register";

    const handleLogOut = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <nav className="navbar">
            <h1>JobPilot</h1>
            {!isAuthPage && (
                <div className="navbar-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/applications">Applications</Link>
                    <button className="logout-button" onClick={handleLogOut}>Log Out</button>
                </div>
            )}
        </nav>
    )
}

export default Navbar