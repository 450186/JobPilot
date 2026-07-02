import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import { registerUser } from "../api/auth"
function Register() {
    const [step, setStep] = useState(1)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const progress = (step / 5) * 100

    const validPassword = 
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)

    const canGoNext = 
        (step === 1 && first_name.trim() !== "") ||
        (step === 2 && last_name.trim() !== "") ||
        (step === 3 && username.trim() !== "") ||
        (step === 4 && validPassword) ||
        (step === 5 && /\S+@\S+\.\S+/.test(email))

    const handleRegister = async(e : React.FormEvent) => {
        e.preventDefault();

        if(step < 5) {
            if(canGoNext) {
                setStep(step + 1)
            }
            return;
        }
        try {
            const data = await registerUser({
                username,
                password,
                first_name,
                last_name,
                email
            })
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("User registered successfully")
            navigate("/")
        } catch (e: any) {
            toast.error("Unable to register user. Please try again.")
        }
    }
    return (
        <main>
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Register</h2>
                {step === 1 && (
                    <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                )}
                {step === 2 && (
                    <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                )}
                {step === 3 && (
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                )}
                {step === 4 && (
                    <>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <p className="password-hint">Password must be at least 8 characters long and contain at least one uppercase letter and one number</p>
                    </>
                )}
                {step === 5 && (
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                )}
                <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${progress}%`}} />
                </div>
                <div className="form-actions">
                    {step > 1 ? (
                        <button type="button" onClick={() => setStep(step - 1)}>
                            Back
                        </button>
                    ) : (
                        <div className="button-placeholder" />
                    )}

                    {step === 5 ? (
                        <button type="submit" className="register-btn" disabled={!canGoNext}>
                            Register
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            disabled={!canGoNext}
                        >
                            Next
                        </button>
                    )}
                </div>
                <p style={{textAlign: "center"}}>Already have an account? <Link to="/login">Login</Link></p>
            </form>

        </main>
    )
}

export default Register