import React, { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import register_background from '../../../assets/register_background.avif'

const Register = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handelRegister } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await handelRegister({ username, email, password });
    navigate("/");
  };

  return (
    <main
      className="register-page"
      style={{
        backgroundImage: `url(${register_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="register-heading">Unlock Your Personal Soundspace</h1>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handelSubmit}>
          <FormGroup
            name="username"
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormGroup
            name="email"
            value={email}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            name="password"
            value={password}
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
