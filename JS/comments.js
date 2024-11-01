// <!-- 引入 Supabase JavaScript 库 -->
    // <script>
        // 初始化 Supabase 客户端
        const SUPABASE_URL = "https://fjvwrckmrqijzqeszwxy.supabase.co";
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdndyY2ttcnFpanpxZXN6d3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NzM0MzIsImV4cCI6MjA0NTI0OTQzMn0.7PdAPRofETNEGJSEziqRvrWfoFs11ZToTJHqM_VmT4g"; // 替换为你的真实匿名密钥
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // 获取评论数据
        async function fetchComments() {
            try {
                const { data, error } = await supabaseClient
                    .from('comments')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error("Error fetching comments:", error);
                } else {
                    console.log("Fetched comments:", data);
                    displayComments(data);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        }

        // 渲染评论到页面
        function displayComments(comments) {
            const commentsContainer = document.getElementById("commentsContainer");
            commentsContainer.innerHTML = ""; // 清空已有内容
            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("user_comment");
                commentElement.innerHTML = `
                    <div class="user_comment_2">
                        <div class="user_avatar">
                            <img src="./log/logo2.png" alt="Avatar">
                        </div>
                        <div class="text_coment">
                            <div class="user_id">${comment.username}</div>
                            <span>${comment.content}</span>
                            <span class="time">${new Date(comment.created_at).toLocaleString()}</span>
                        </div>
                    </div>
                `;
                commentsContainer.appendChild(commentElement);
            });
        }

        // 提交评论
        document.getElementById('commentForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // 阻止默认提交行为
            const username = document.getElementById('usernameInput').value;
            const commentContent = document.getElementById('commentInput').value;

            const { data, error } = await supabaseClient
                .from('comments')
                .insert([{ content: commentContent, username: username }]);

            if (error) {
                console.error("Error inserting comment:", error);
            } else {
                document.getElementById('usernameInput').value = ''; // 清空输入框
                document.getElementById('commentInput').value = ''; // 清空输入框
                fetchComments(); // 重新获取评论
            }
        });

        // 页面加载时获取评论
        window.onload = fetchComments;