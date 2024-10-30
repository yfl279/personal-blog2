require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// 从 .env 文件中读取 URL 和 Key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 创建 Supabase 客户端
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

// 设置一个 API 路由来获取评论
app.get('/api/comments', async (req, res) => {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    } else {
        res.json(data);
    }
});

// 设置一个 API 路由来插入评论
app.post('/api/comments', async (req, res) => {
    const { content } = req.body;
    const { data, error } = await supabase
        .from('comments')
        .insert([{ content }]);

    if (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    } else {
        res.json(data);
    }
});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
