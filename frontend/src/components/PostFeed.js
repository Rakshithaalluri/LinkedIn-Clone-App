import React, { useState, useEffect } from "react";
import "./PostFeed.css";

function PostFeed() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/users/posts");
    const data = await res.json();
    setPosts(data.reverse());
  };

  const handlePost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !content.trim()) return;

    const response = await fetch("http://localhost:3000/users/add-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: content.trim(),
        author: user.name,
        time: new Date().toLocaleString(), // Add timestamp
      }),
    });

    const newPost = await response.json();
    setContent("");
    fetchPosts(); // Refresh
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={`feed-container ${localStorage.getItem("theme") === "dark" ? "dark-mode" : ""}`}>
      <h2 className="feed-heading">Start a post</h2>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="post-button" onClick={handlePost}>Post</button>

      <div className="post-list">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="post">
              <strong>{post.author}</strong>
              <p className="post-time">{post.time}</p>
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostFeed;



