/* import React, { useState } from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:3000/users/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setUploadedPath(data.path);
  };

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Photo</button>

      {uploadedPath && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={`http://localhost:3000/${uploadedPath}`} alt="profile" width="150" />
        </div>
      )}
    </div>
  );
}

export default Profile;
*/

import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      fetchUserPosts(userData.name);
    }
  }, []);

  const fetchUserPosts = async (author) => {
    try {
      const response = await fetch("http://localhost:3000/users/posts");
      const data = await response.json();
      const userPosts = data.filter((post) => post.author === author);
      setPosts(userPosts.reverse());
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    }
  };

  return (
    <div className={`profile-container ${localStorage.getItem("theme") === "dark" ? "dark-mode" : ""}`}>
      <div className="profile-card">
        <h2>{user?.name}</h2>
        <div className="profile-avatar">
            {user?.name?.[0].toUpperCase()}
        </div>
      </div>
        
      <div className="profile-posts">
        <h3>Your Posts</h3>
        <p>Email: {user?.email}</p>
        
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post, index) => (
  <div key={index} className="profile-post">
    <p>{post.content}</p>
    <small className="post-time">{post.time}</small>
  </div>
))

        )}
      </div>
    </div>
  );
}

export default Profile;



