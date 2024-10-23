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

// 根据屏幕尺寸动态检测
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        // 移动端设置
        setVideoForMobile();
    } else {
        // 桌面端可以不做任何操作，或者添加其他逻辑
    }
}

// 初始检测屏幕尺寸
checkScreenSize();

// 当窗口大小发生变化时，重新检测
window.addEventListener('resize', checkScreenSize);
