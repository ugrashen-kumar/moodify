import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link , useNavigate} from "react-router-dom";
import {useAuth} from '../hooks/useAuth'
import login_background from '../../../assets/login_background.avif'


const Login = () => {

  const navigate = useNavigate()
  const {loading, handelLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handelSubmit = async (e) => {
  e.preventDefault();

  console.log(email, password);

  await handelLogin({ email, password });

  navigate("/");
};
  return (
    <main className="login-page" style={{
              backgroundImage: `url(${login_background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
      <h1 className="wlcome-heading">Enter the Sound World</h1>
      <div className="form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handelSubmit}>
          <FormGroup type="text" value={email} id="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
          <FormGroup type="text" value={password} id="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
