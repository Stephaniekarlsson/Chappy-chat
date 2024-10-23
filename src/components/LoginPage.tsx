import '../css/loginPage.css'
import owl from '../assets/hi_owl3.png'
import { SignInForm } from './SignInForm'

export const LoginPage = () => {
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
                <p className='guest'>Use as guest</p>
                <p className='signup'>Sign up</p>
                </div>
                <SignInForm />
                </div>
            </div>
        </section>

    </>

    )
}