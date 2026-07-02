import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/auth"
import toast from "react-hot-toast"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = await loginUser({ username, password })

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            toast.success("Logged in successfully")
            navigate("/applications")
        } catch (e) {
            console.log(e)
            toast.error("Error logging in")
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

                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default Login