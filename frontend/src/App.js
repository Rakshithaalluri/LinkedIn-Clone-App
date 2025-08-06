
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useState} from 'react'

import './styles.css'


import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PostFeed from './components/PostFeed';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

function App() {
 // const user = JSON.parse(localStorage.getItem("user"));
   const [user, setUser] = useState(null);

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
   },[])

  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <div style={{ padding: "20px" }}> 

        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setUser={setUser}/>} />
              <Route path="/feed" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/feed" />} />
              <Route path="/feed" element={<PostFeed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Navigate to="/feed" />} />
              <Route path="/login" element={<Navigate to="/feed" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

