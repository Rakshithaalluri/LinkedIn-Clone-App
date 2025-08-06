const Database = require('better-sqlite3');
const db = new Database('./users.db');

db.prepare(`
         CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            bio TEXT,
            password TEXT
         )
        `).run();


db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    content TEXT,
    time TEXT
  )
`).run();


module.exports = db;
