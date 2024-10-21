// const video = document.getElementById('myVideo');

// document.querySelector('.video_color').addEventListener('mouseenter', () => {
//     video.play();
//     video.style.filter = 'grayscale(0%)'; // 恢复彩色
//     setTimeout(() => {
//         video.pause();
//         video.style.filter = 'grayscale(100%)'; // 再次变成黑白
//     }, 5000); // 播放5秒后暂停
// });

// document.querySelector('.video_color').addEventListener('mouseleave', () => {
//     video.pause(); // 当鼠标离开时暂停视频
//     video.style.filter = 'grayscale(100%)'; // 再次变成黑白
// });

// const video = document.getElementById('myVideo');

// document.querySelector('.video_color').addEventListener('mouseenter', () => {
//     video.play();
//     video.style.filter = 'grayscale(0%)'; // 恢复彩色
// });

// document.querySelector('.video_color').addEventListener('mouseleave', () => {
//     video.pause(); // 暂停视频
//     video.style.filter = 'grayscale(100%)'; // 变成黑白
// });


const videos = document.querySelectorAll('.video');

videos.forEach(video => {
    const link = video.previousElementSibling; // 获取视频前面的链接
    link.addEventListener('mouseenter', () => {
        video.play();
        video.style.filter = 'grayscale(0%)'; // 恢复彩色
    });

    link.addEventListener('mouseleave', () => {
        video.pause(); // 暂停视频
        video.style.filter = 'grayscale(100%)'; // 变成黑白
    });
});