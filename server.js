const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 4000;

// 创建 Supabase 客户端
const supabaseUrl = 'https://fjvwrckmrqijzqeszwxy.supabase.co'; // 替换为你的项目 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdndyY2ttcnFpanpxZXN6d3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM0MzIsImV4cCI6MjA0NTI0OTQzMn0.7PdAPRofETNEGJSEziqRvrWfoFs11ZToTJHqM_VmT4g'; // 替换为你的匿名密钥
const supabase = createClient(supabaseUrl, supabaseKey);

// 解析 JSON 请求体
app.use(express.json());

// 添加评论的 API
app.post('/comments', async (req, res) => {
  const { content, user_id } = req.body; // 从请求体获取评论内容和用户 ID
  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, user_id }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
});

// 获取评论的 API
app.get('/comments', async (req, res) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(comments);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
