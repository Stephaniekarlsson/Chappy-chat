import '../css/signinForm.css'

export function SignInForm() {
    return (
        
      <form className='form-container'>
        <div className='input-container'>
          <label>Username</label>
          <input
            className='signin-input'
            type="text"
            placeholder='Username'/>
        </div>

        <div className='input-container'>
          <label>Password</label>
          <input
            className='signin-input'
            type="password"
            placeholder="Password"/>
        </div>

        <button type='submit' className='signin-btn'>Sign in</button>
      </form>
    
    )
}