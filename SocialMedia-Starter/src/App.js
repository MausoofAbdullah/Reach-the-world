import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import OtpVerification from "./components/OtpVerification/OtpVerification";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Chat from "./pages/chat/Chat";


import Profileside from "./components/profileSide/Profileside";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
 import AdminHome from "./pages/admin/adminHome/AdminHome";
 import UserList from "./pages/admin/userList/UserList";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        {/* <Route path="/" element={<Auth/>}/> */}
        {/* <Route path="/" element={<Home/>}/> */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        {/* <Route path="/home" element={<Navigate to="home" />} /> */}
        <Route
          path="/auth"
          element={user?.user?.isAdmin?(<Navigate to="../admin" />):user?(<Navigate to="../home" />) : (<Auth />)}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
<<<<<<< HEAD
          element={user ? <Chat /> : <Navigate to="../auth" />}
=======
          element={user ? <Chat/> : <Navigate to="../home" />}
        
>>>>>>> otpSignup
        />
        <Route
          path="/admin"
          element={user?.user?.isAdmin? <AdminHome/>:<Navigate to="../auth" />}
        
        />
        <Route path="/admin/user-list" element={<UserList />}/>

        <Route
          path="/otpverification"
          element={user ? <Navigate to="../home" /> : <OtpVerification />}
        />
      </Routes>
    </div>
  );
}

export default App;
