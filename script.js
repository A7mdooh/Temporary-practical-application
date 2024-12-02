let countdownInterval;
let remainingTime = 0;
let isExtendActive = false;
let soundPlayed = false; // للتأكد من تشغيل الصوت مرة واحدة فقط

function startTimer(minutes) {
    clearInterval(countdownInterval);
    isExtendActive = false;
    soundPlayed = false; // إعادة تعيين التحكم بالصوت عند بدء مؤقت جديد
    document.getElementById('extend-time').style.display = 'none';
    remainingTime = minutes * 60;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // تشغيل الصوت قبل انتهاء المؤقت بـ 11 ثانية
    if (remainingTime === 11 && !soundPlayed) {
        playSound();
        soundPlayed = true; // تأكيد تشغيل الصوت مرة واحدة فقط
    }

    if (remainingTime === 0) {
        clearInterval(countdownInterval);
        showExtendOption();
    } else {
        remainingTime--;
    }
}

function playSound() {
    const sound = new Audio('s.mp3'); // استخدام ملف الصوت من مجلد البرنامج
    sound.play();
}

function showExtendOption() {
    isExtendActive = true;
    document.getElementById('extend-time').style.display = 'block';
    setTimeout(() => {
        if (isExtendActive) {
            document.getElementById('extend-time').style.display = 'none';
        }
    }, 10000);
}

function extendTimer() {
    if (isExtendActive) {
        startTimer(1);
    }
}

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // تحويل الساعة إلى تنسيق 12 ساعة
    hours = hours % 12;
    hours = hours ? hours : 12; // إذا كانت الساعة 0، حولها إلى 12

    // تحديث الساعة على الصفحة مع التنسيق 12 ساعة وإضافة AM أو PM
    clockElement.textContent = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();