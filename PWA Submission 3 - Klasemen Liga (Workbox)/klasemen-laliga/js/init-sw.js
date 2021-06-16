// service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function () {
            console.log('serviceWorker: pendaftaran berhasil')
        }).catch(function () {
            console.log('sarviceWorker: pendaftaran gagal');
        })
    })
} else {
    console.log('serviseWorker: browser ini tidak mendukung serviceWorker');
}

// notifikasi
if ('Notification' in window) {
    Notification.requestPermission().then( perm => {
        if (perm == 'denied') {
            console.log("Fitur notifikasi tidak diijinkan.");
            return
        }else if(perm == 'default'){
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return
        }

        console.log("Fitur notifikasi diijinkan.");
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// PushNotifikasi API
navigator.serviceWorker.ready.then(() => {
if ('PushManager' in window) {
    navigator.serviceWorker.getRegistration().then( regis => {
        regis.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey : urlBase64ToUint8Array("BLCG4rFNXBnijqIvWCREr2Gy9z6HSZ5-ygvX6JxnYSf1rKDUO1jwU3c_w_jCR_S2R7nU6nNiyyRY3eYkBE4ympU")
        }).then(subscribe=>{
            console.log('berhasil melakukan subscribe dengan endpoin : ',subscribe.endpoint);
            console.log('berhasil melakukan subscribe dengan p265dh key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('berhasil melakukan subscribe dengan auth key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('auth')))));
        }).catch( err => {
            console.log('subscribetion error : ' +err.message)
        })
    }).catch(e => {
        console.log('push manager error : '+ e);
    })
}
});
