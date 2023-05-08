import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql"
});

db.connect((err, result) => {
  if (err) throw err;
  console.log(result);
});

app.get("/", (req, res) => {
  res.send("Page Loaded Successfully...");
});

// Create database - nodemysql
app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database - nodemysql | Created Successfully...");
  });
});

// Create table - Posts
app.get("/createPostsTable", (req, res) => {
  const sql =
    "Create TABLE Posts (id INT AUTO_INCREMENT PRIMARY KEY, title varchar(255) NOT NULL, body varchar(255) NOT NULL)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts Table created successfully in nodemysql database");
  });
});
// Create table - Posts
app.get("/readPosts", (req, res) => {
  const sql = "SELECT * FROM Posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts Table read successfully in nodemysql database");
  });
});

// INSERT
app.get("/addPost/:id", (req, res) => {
  const receivedParams = req.params.id;
  const Post = {
    id: receivedParams,
    title: `Post ${receivedParams}`,
    body: `This is the description of the Post ${req.params.id}`
  };

  const sql = "INSERT INTO Posts SET ? ";
  db.query(sql, Post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} added successfully ...`);
  });
});

//update
app.get("/updatePost/:id", (req, res) => {
  const receivedParams = req.params.id;
  const updateTitle = "New Updated Title";

  const sql = `Update Posts SET title=? WHERE id=${receivedParams} `;
  db.query(sql, updateTitle, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} Updated successfully ...`);
  });
});

//delete
app.get("/deletePost/:id", (req, res) => {
  const receivedParams = req.params.id;
  const sql = `DELETE FROM Posts WHERE id=?`;
  // OR DELETE FROM Posts WHERE id={receivedParams}

  db.query(sql, receivedParams, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} deleted successfully ...`);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
