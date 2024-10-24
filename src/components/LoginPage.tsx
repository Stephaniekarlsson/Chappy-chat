import '../css/loginPage.css'
import owl from '../assets/hi_owl3.png'
import { SignInForm } from './SignInForm'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    
    const navigate = useNavigate()
    const handleUseAsGuest = () => {
        navigate('/guest')
    }

    return (
    <>
        <section className="section-container">
            <div className="overlay-container">
                <div className="img-container">
                <img src={owl} alt="owl" className='owl-img' />
                </div>
                <div className="login-container">
                <h1>Chappy</h1>
                <div className="p-container">
                <p className='guest'
                onClick={handleUseAsGuest}>Use as guest</p>
                <p className='signup'>Sign up</p>
                </div>
                <SignInForm />
                </div>
            </div>
        </section>

    </>

    )
}