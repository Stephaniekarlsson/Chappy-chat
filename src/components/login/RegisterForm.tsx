import '../../css/registerForm.css'
import { createUser } from "../../api/userApi";
import "../../css/signinForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../api/userApi";
import { validatePassword } from '../../functions/userFunctions';
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

export function RegisterForm({ toggleMode }: { toggleMode: () => void }) {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState("");
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorUsername, setErrorUsername] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);


  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setErrorPassword(passwordValidationError);
      setIsLoading(false);
      return;
    }

    const checkUsers = await fetchUsers()

    if (password !== confirmPassword) {
      setErrorPassword("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const usernameExists = checkUsers.some(user => user.username === username);
    if (usernameExists) {
      setErrorUsername("Username is already taken.");
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
      setErrorPassword("Password not valid");
      console.error(error);

    } finally {
      setIsLoading(false);
      setErrorPassword('')
      setErrorUsername('')
    }
  }


  return (
    <form className="form-container" onSubmit={handleRegister}>
      <h2 className="register-header">Register</h2>
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
        <div className="username-help-container">
          <p className="register-help">8-20 characters</p>
          {errorUsername && <p className="error-username">{errorUsername}</p>}
        </div>
      </div>

      <div className="login-input-container">
        <label>Password</label>
        <div className="password-container">
          <input
            className="signin-input"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <RxEyeClosed /> : <RxEyeOpen />} 
          </button>
        </div>
        <p className="register-help">At least 8 characters, 1 capital, 1 lowercase, 1 digit, 1 special character  </p>
      </div>

      <div className="login-input-container">
        <label>Confirm Password</label>
        <div className="password-container">
          <input
            className="signin-input"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <RxEyeClosed /> : <RxEyeOpen />} 
          </button>
        </div>
        {errorPassword && <p className="error-password">{errorPassword}</p>}
      </div>
      {message && <p className="success-message">{message}</p>}
      <button type="submit" className="signin-btn">
        {isLoading ? "Creating new user..." : "Sign up"}
      </button>
    </form>
  );
}
