document.querySelector('.submit-button').addEventListener('click', async () => {
    const comment = document.getElementById('comment').value;
    const userId = 'some-user-id'; // 用户ID，可以动态生成或从后台获取

    const response = await fetch('https://fjvwrckmrqijzqeszwxy.supabase.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: comment, user_id: userId })
    });

    if (response.ok) {
        console.log('评论添加成功');
    } else {
        console.log('评论添加失败');
    }
});
