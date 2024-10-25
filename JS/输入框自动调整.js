
const inputBox = document.querySelector('.input_box');

inputBox.addEventListener('input', function () {
    // 重置高度，防止增加高度后不能缩小
    this.style.height = 'auto';
    // 动态调整高度，设定最大高度
    this.style.height = Math.min(this.scrollHeight, 140) + 'px';
});
