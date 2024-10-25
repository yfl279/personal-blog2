const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { createClient } = require('@supabase/supabase-js');

const app = express();

// 创建 Supabase 客户端
const supabaseUrl = 'https://lyf001.vercel.app/'; // 替换为你的项目 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdndyY2ttcnFpanpxZXN6d3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM0MzIsImV4cCI6MjA0NTI0OTQzMn0.7PdAPRofETNEGJSEziqRvrWfoFs11ZToTJHqM_VmT4g'; // 替换为你的匿名密钥
const supabase = createClient(supabaseUrl, supabaseKey);

// 配置 GitHub OAuth
passport.use(new GitHubStrategy({
  clientID: 'Ov23lii02aXrfmvfn4OO', // 替换为你的 GitHub Client ID
  clientSecret: '1159f09ac71da5fd3e88691cd49aba40232098e0', // 替换为你的 GitHub Client Secret
  callbackURL: "https://lyf001.vercel.app/api/auth/github/callback", // 使用你网站的回调 URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// 用户序列化与反序列化
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 中间件
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // 解析 JSON 请求体

// GitHub 登录路由
app.get('/auth/github', passport.authenticate('github'));

// GitHub 登录回调
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // 登录成功后的重定向
  }
);

// 退出登录
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// 添加评论的 API
app.post('/comments', async (req, res) => {
  const { content } = req.body;
  const user_id = req.user ? req.user.id : null; // 获取当前登录用户的 ID
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

// 不需要 app.listen(port) 部分
