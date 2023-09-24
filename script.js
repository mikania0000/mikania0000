const startScanButton = document.getElementById('startScan');
const qrResult = document.getElementById('qrResult');

// 當按鈕被點擊時，啟動鏡頭
startScanButton.addEventListener('click', () => {
    // 使用 getUserMedia 啟動網頁鏡頭
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(handleSuccess)
        .catch(handleError);
});

// 成功啟動鏡頭時的處理函數
function handleSuccess(stream) {
    const video = document.createElement('video');
    document.body.appendChild(video);
    video.srcObject = stream;

    // 建立一個 QR 碼掃描器
    const qrScanner = new window.QRScanner(video, result => {
        // 當成功掃描到 QR 碼時，顯示結果
        qrResult.innerHTML = `掃描結果: ${result}`;
        qrScanner.stop(); // 停止掃描
        stream.getTracks().forEach(track => track.stop()); // 停止鏡頭
    });

    qrScanner.start();
}

// 錯誤處理函數
function handleError(error) {
    console.error('啟動鏡頭失敗：', error);
}
