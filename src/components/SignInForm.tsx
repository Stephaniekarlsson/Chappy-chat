import '../css/signinForm.css'
import { useState } from 'react'

interface LoginResponse {
  jwt: string
}

export function SignInForm() {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json()
      localStorage.setItem('token', data.jwt)
      console.log('Successful login', data);
      setUsername('')
      setPassword('')
      
    } else {
      const errorData = await response.json()
      setError(errorData.message || 'Error occurred')
    }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      throw error
      
    }
    
  }

    return (
        
      <form className='form-container' onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className='input-container'>
          <label>Username</label>
          <input
            className='signin-input'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
        </div>

        <div className='input-container'>
          <label>Password</label>
          <input
            className='signin-input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
        </div>

        <button type='submit' className='signin-btn'>Sign in</button>
      </form>
    
    )
}