import { createUser } from "../../api/userApi";
import "../../css/signinForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../api/userApi";

export function RegisterForm({ toggleMode }: { toggleMode: () => void }) {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const checkUsers = await fetchUsers()

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const usernameExists = checkUsers.some(user => user.username === username);
    if (usernameExists) {
      setError("Username unavailable.");
      setIsLoading(false);
      return;
    }

    const newUser = {
      username: username,
      password: password,
    };

    try {
      await createUser(newUser)
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setMessage('User created successfully!')

      setTimeout(() => {
        toggleMode()
        navigate("/");
      }, 1500);
     

    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
      console.error(error);

    } finally {
      setIsLoading(false);
      setError('')
    }
  }


  return (
    <form className="form-container" onSubmit={handleRegister}>
      <h2 className="register-header">Register</h2>
      {error && <p className="error">{error}</p>}
      <div className="login-input-container">
        <label>Username</label>
        <input
          className="signin-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p className="register-help">8-20 characters</p>
      </div>

      <div className="login-input-container">
        <label>Password</label>
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="register-help">At least 8 characters, 1 capital, 1 lowercase, 1 digit, 1 special character  </p>
      </div>

      <div className="login-input-container">
        <label>Confirm Password</label>
        <input
          className="signin-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {message && <p className="success">{message}</p>}
      <button type="submit" className="signin-btn">
        {isLoading ? "Creating new user..." : "Sign up"}
      </button>
    </form>
  );
}
