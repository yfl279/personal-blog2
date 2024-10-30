import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 替换为你的 Supabase 项目 URL 和匿名公钥
const supabaseUrl = 'https://fjvwrckmrqijzqeszwxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdndyY2ttcnFpanpxZXN6d3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM0MzIsImV4cCI6MjA0NTI0OTQzMn0.7PdAPRofETNEGJSEziqRvrWfoFs11ZToTJHqM_VmT4g';
const supabase = createClient(supabaseUrl, supabaseKey);

// 示例：打印 Supabase 客户端
console.log(supabase);


// 用户github登入
// GitHub 登录函数
const signInWithGitHub = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: 'github'
    });
  
    if (error) {
      console.error('Error signing in with GitHub:', error);
    } else {
      console.log('User signed in successfully:', user);
      fetchComments(); // 登录成功后获取评论
    }
  };
  
  // 示例：调用 GitHub 登录函数
  // document.getElementById('github-login').addEventListener('click', signInWithGitHub);
  


//   储存评论
const addComment = async (content) => {
    const user = supabase.auth.user(); // 获取当前用户
    if (!user) {
      console.error('User not logged in');
      return; // 用户未登录
    }
  
    const { data, error } = await supabase
      .from('comments')
      .insert([{ content, user_id: user.id }]); // 存储用户 ID
  
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Comment added successfully:', data);
      fetchComments(); // 添加评论后刷新评论列表
    }
  };
  

//   查询评论
  const fetchComments = async () => {
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*, users(username)'); // 假设 users 表中有 username 列
  
    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
    } else {
      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML = ''; // 清空之前的内容
      comments.forEach(comment => {
        const p = document.createElement('p');
        p.textContent = `${comment.users.username}: ${comment.content}`; // 显示用户名和评论内容
        commentsDiv.appendChild(p);
      });
    }
  };
  