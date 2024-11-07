import '../../css/signinForm.css'
import { useState } from "react";
import { useUserStore } from "../../data/UserStore";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import { filteredUsers } from '../../functions/userFunctions';
import { useTabStore } from '../../data/tabStore';

interface LoginResponse {
  jwt: string;
  _id?: string;
  username: string;
  image?: string;
}

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const setData = useTabStore((state) => state.setData);
  const setUsers = useUserStore((state) => state.setUsers);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data: LoginResponse = await loginUser(username, password );

      localStorage.setItem("token", data.jwt);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, username: data.username, image: data.image || "" })
      );

      const userData = {
        _id: data._id ?? '',
        username: data.username,
        image: data.image || "",
      };

      setIsAuthenticated(true);
      setUser(userData);
      const filteredData = await filteredUsers(data._id ?? '')
      setUsers(filteredData); 
      setData(filteredData)
      setUsername("");
      setPassword("");
      navigate("/guest");
    } catch (error) {
      setIsLoading(false);
      setError("Wrong username or password, try again!.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="signin-btn">
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
