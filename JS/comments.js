// 导入 Supabase 客户端库
// import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = 'https://fjvwrckmrqijzqeszwxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdndyY2ttcnFpanpxZXN6d3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM0MzIsImV4cCI6MjA0NTI0OTQzMn0.7PdAPRofETNEGJSEziqRvrWfoFs11ZToTJHqM_VmT4g'; // 请替换为你的匿名密钥
const supabase = createClient(supabaseUrl, supabaseKey);

// 加载评论
document.addEventListener("DOMContentLoaded", loadComments);

// 提交评论按钮的事件监听器
document.querySelector('.fa-paper-plane').addEventListener('click', addComment);
document.querySelector('.submit-button').addEventListener('click', async () => {
    const comment = document.getElementById('comment').value;
    const userId = 'some-user-id'; // 用户 ID，可以动态生成或从后台获取

    const { data, error } = await supabase
        .from('comments')
        .insert([{ content: comment, user_id: userId }]);

    if (error) {
        console.error('评论添加失败:', error.message);
    } else {
        console.log('评论添加成功:', data);
    }
});

// 加载评论的函数
async function loadComments() {
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        alert('获取评论失败，请稍后再试。');
        console.error('获取评论失败:', error);
        return;
    }

    comments.forEach(comment => {
        addCommentToDOM(comment.content, comment.date); // 使用正确的字段名
    });
}

// 添加评论的函数
async function addComment() {
    const commentText = document.getElementById("coment").value;
    if (!commentText.trim()) {
        alert("请输入评论内容");
        return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // 更灵活的日期格式

    const { data, error } = await supabase
        .from('comments')
        .insert([{ content: commentText, date: formattedDate }]);

    if (error) {
        alert('插入评论失败，请稍后再试。');
        console.error('插入评论失败:', error);
        return;
    }

    addCommentToDOM(commentText, formattedDate);
    document.getElementById("coment").value = ""; // 清空输入框
}

// 添加评论到 DOM 的函数
function addCommentToDOM(commentText, formattedDate) {
    const newComment = document.createElement("div");
    newComment.classList.add("user_comment");
    newComment.innerHTML = `
        <div class="user_comment_2">
            <div class="user_avatar">
                <img src="./log/logo2.png">
            </div>
            <div class="text_coment">
                <span>${commentText}</span>
                <span class="time">${formattedDate}</span>
            </div>
        </div>
    `;

    const commentSection = document.querySelector(".comment-section");
    commentSection.insertBefore(newComment, commentSection.querySelector(".user_input"));
}
