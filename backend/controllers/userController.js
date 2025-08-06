const db = require('../db');
const bcrypt = require('bcryptjs');
 

const registerUser = async (req, res) => {
  const { name, email, bio, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (name, email, bio, password) VALUES (?, ?, ?, ?)`,
    [name, email, bio, hashedPassword],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ message: 'User registered', id: this.lastID });
    }
  );
}
 
const getAllUsers = (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
            res.send(rows);
    }
)
}

/* const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, user) => {
    if (err) return res.status(500).send(err.message);

    if (user) {
      res.send({ message: "Login successful", user });
    } else {
      // Automatically register if not found
      db.run(
        `INSERT INTO users (name, email, bio, password) VALUES (?, ?, ?, ?)`,
        ["New User", email, "Auto-created", password],
        function (err) {
          if (err) return res.status(500).send(err.message);

          const newUser = {
            id: this.lastID,
            name: "New User",
            email,
            bio: "Auto-created",
            password
          };

          res.send({ message: "User registered and logged in", user: newUser });
        }
      );
    }
  });
};

*/

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).send(err.message);
    if (!user) return res.status(401).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Incorrect password" });

    res.send({ message: "Login successful", user });
  });
};

const addPost = (req, res) => {
  const { author, content } = req.body;
  const time = new Date().toLocaleString();
  db.run(
    `INSERT INTO posts (author, content, time) VALUES (?, ?, ?)`,
    [author, content, time],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ message: 'Post added' });
    }
  );
};

const getPosts = (req, res) => {
  db.all(`SELECT * FROM posts ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
};

module.exports = { registerUser, getAllUsers, loginUser, addPost, getPosts };




