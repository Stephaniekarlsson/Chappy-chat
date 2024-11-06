import '../../css/loginPage.css'
import owl from "../../assets/hi_owl3.png";
import { SignInForm } from "./SignInForm";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../data/UserStore";
import { useState } from "react";
import { RegisterForm } from "./RegisterForm";

export const LoginPage = () => {
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();
  const [registerMode, setRegisterMode] = useState(false)
  const setUser = useUserStore((state) => state.setUser);

  const handleUseAsGuest = () => {
    setIsAuthenticated(false);
    setUser(null)
    navigate("/guest");
  };

  const toggleMode = () => {
    setRegisterMode(!registerMode)
  }

  return (
    <>
      <section className="section-container">
        <div className="overlay-container">
          <div className="img-container">
          {!registerMode && <img src={owl} alt="owl" className="owl-img" />}
          </div>
          <div className="login-container">
            <h1>Chappy</h1>
            <div className="p-container">
              <p className="guest" onClick={handleUseAsGuest}>
                Use as guest
              </p>
              <p className="signup" onClick={toggleMode}>
                {registerMode ? "Sign in" : "Sign up"}
              </p>
            </div>
            {registerMode ? <RegisterForm toggleMode={toggleMode} /> : <SignInForm />}
          </div>
        </div>
      </section>
    </>
  );
};
