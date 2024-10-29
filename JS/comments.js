import { createClient } from '@supabase/supabase-js';

import { config } from 'dotenv';
config(); // 加载 .env 文件中的变量

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", loadComments);
document.querySelector('.fa-paper-plane').addEventListener('click', addComment);

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
        addCommentToDOM(comment.text, comment.date);
    });
}

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
        .insert([{ text: commentText, date: formattedDate }]);

    if (error) {
        alert('插入评论失败，请稍后再试。');
        console.error('插入评论失败:', error);
        return;
    }

    addCommentToDOM(commentText, formattedDate);
    document.getElementById("coment").value = "";
}

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
