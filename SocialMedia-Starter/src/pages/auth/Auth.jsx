import React from "react";
import "./Auth.css";
import Logo from "../../img/logonew.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signup } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    username: "",
    lastname: "",
    password: "",
  });
  const [confirmpass, setConfirmpass] = useState(true);
const [error,setError]=useState("")

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
    
  const navigate = useNavigate();
  console.log(loading)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  

     if (isSignup) {
      data.password === data.confirmpass
        ? dispatch(signup(data))
        : setConfirmpass(false);
    } else  if (data.email === '' || data.password === '') {
      setError('Please fill the form')
    }

    else {
      dispatch(logIn(data));
    }
   
  };

  const resetForm = () => {
    setConfirmpass(true);
    setData({ firstname: "", username: "", lastname: "", password: "" });
    setError("");
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" className="" />
        <div className="webName">
          <h1>Reach the World</h1>
          <h6>Invent the new world of friends</h6>
        </div>
      </div>

      {/* righside */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Signup" : "Log in"}</h3>

          {isSignup && (
            <div>
              {" "}
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />{" "}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="User Name"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
          <span
            style={{
              display: confirmpass ? "none" : "block",
              color: "red",
              fontSize: "13px",
              alignSelf: "end",
              marginRight: "5px",
            }}
          >
            * password didn't match !
          </span>
          <div>
            <span
              style={{ fontSize: "13px", cursor: "pointer" }}
              onClick={() => {
                resetForm();
                setIsSignup((prev) => !prev);
              }}
            >
              {isSignup
                ? "Already have an account?. Login"
                : "Dont have an account?. Signup here..!"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
             disabled={loading}
          >
            {loading ? "Loading..." : isSignup ? "signup" : "Login"}
          </button>
        </form>
      </div>

      {/* <Login/> */}
    </div>
  );
};

export default Auth;
