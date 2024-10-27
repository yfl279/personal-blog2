document.querySelector('.fa-paper-plane').addEventListener('click', addComment);
function addComment() {
    // 获取用户输入的评论内容
    const commentText = document.getElementById("coment").value;
    if (!commentText.trim()) {
        alert("请输入评论内容");
        return;
    }

    // 获取当前时间
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

    // 创建新的评论结构
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

    // 将新评论添加到评论区
    const commentSection = document.querySelector(".comment-section");
    commentSection.insertBefore(newComment, commentSection.querySelector(".user_input"));

    // 清空输入框
    document.getElementById("coment").value = "";
}