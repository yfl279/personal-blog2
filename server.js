const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'comments_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('数据库已连接');
});

// 获取评论
app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 添加评论
app.post('/comments', (req, res) => {
    const comment = req.body.content;
    db.query('INSERT INTO comments (content) VALUES (?)', [comment], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, content: comment });
    });
});

app.listen(port, () => {
    console.log(`服务器在 http://localhost:${port} 上运行`);
});
