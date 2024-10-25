import '../css/signinForm.css'
import { useState } from 'react'
import { useUserStore } from '../data/store'
import { useNavigate } from 'react-router-dom'

interface LoginResponse {
  jwt: string
  username: string;
  image?: string;
}

export function SignInForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    setIsLoading(false);
    
    if (response.ok) {
      const data: LoginResponse = await response.json()
      console.log('Received user data:', data);
      localStorage.setItem('token', data.jwt)
      console.log('Successful login', data);
      const userData = {
        username: data.username,
        image: data.image || '', 
      }; 
      setIsAuthenticated(true)
      setUser(userData)
      setUsername('')
      setPassword('')
      navigate('/guest')
      
    } else {
      const errorData = await response.json()
      setError(errorData.message || 'Error occurred')
    }
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
      console.error(error);
      
      
    }
    
  }

    return (
        
      <form className='form-container' onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className='login-input-container'>
          <label>Username</label>
          <input
            className='signin-input'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
        </div>

        <div className='login-input-container'>
          <label>Password</label>
          <input
            className='signin-input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
        </div>

        <button type='submit' className='signin-btn'>{isLoading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    
    )
}