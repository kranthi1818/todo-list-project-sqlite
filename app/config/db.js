import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose()

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const relativePath =  "../database/data.db"
const absolutePath = path.resolve(__dirname, relativePath)

const DB = new sqlite.Database(
  absolutePath
  ,
  sqlite3.OPEN_READWRITE,
  connected
)

function connected(err) {
  if (err) {
    console.log("Database connection error:", err.message)
    return
  }
  console.log("Connected to SQLite database.")
}

DB.serialize(() => {
    DB.run(
      `CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        is_favorite INTEGER DEFAULT 0
      )`,
      (err) => {
        if (err) console.error("Error creating projects table:", err.message);
        else console.log("Projects table created.");
      }
    );
  
    DB.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        is_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        project_id INTEGER,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) console.error("Error creating tasks table:", err.message);
        else console.log("Tasks table created.");
      }
    );
  }); 

  DB.exec( 'PRAGMA foreign_keys = ON' )

export default DB