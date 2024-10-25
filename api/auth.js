// api/auth.js
import { NowRequest, NowResponse } from '@vercel/node';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import session from 'express-session';

const GITHUB_CLIENT_ID = '你的 GitHub Client ID';
const GITHUB_CLIENT_SECRET = '你的 GitHub Client Secret';

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://lyf001.vercel.app/api/auth/callback" // 这里是你的回调 URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

const app = require('express')();
app.use(session({ secret: 'your secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // 登录成功后的逻辑
    res.redirect('/'); // 或者重定向到用户评论页面
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// 这里是导出 Serverless Function
export default app;
