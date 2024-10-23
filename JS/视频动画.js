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

// 获取所有视频元素
const videos = document.querySelectorAll('.video');

// 设置视频为移动端播放
function setVideoForMobile() {
    videos.forEach(video => {
        video.loop = true; // 设置视频循环播放
        video.play(); // 自动播放视频
        video.style.filter = 'grayscale(0%)'; // 始终彩色
    });
}

// 桌面端视频播放控制
function setVideoForDesktop() {
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
}

// 根据屏幕尺寸动态检测
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        // 移动端设置
        setVideoForMobile();
    } else {
        // 桌面端设置
        setVideoForDesktop();
    }
}

// 确保在 DOM 完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始检测屏幕尺寸
    checkScreenSize();

    // 当窗口大小发生变化时，重新检测
    window.addEventListener('resize', checkScreenSize);
});
