import { useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { loginUser } from "../api/auth"
import toast from "react-hot-toast"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    if(token) {
        return <Navigate to="/applications" replace />
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = await loginUser({ username, password })

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success("Logged in successfully")
            navigate("/")
        } catch (e: any) {
            if(e.response?.status === 401) {
                toast.error("Invalid username or password")
            } else {
                toast.error("Unable to connect to server. Please try again.")
            }
        }
    }

    return (
        <main>
            <form onSubmit={handleLogin} className="login-form">
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button disabled={!username || !password} className="login-btn" type="submit">Login</button>
                <p style={{textAlign: "center"}}>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </main>
    )
}

export default Login