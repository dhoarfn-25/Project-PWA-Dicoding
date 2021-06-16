const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BLCG4rFNXBnijqIvWCREr2Gy9z6HSZ5-ygvX6JxnYSf1rKDUO1jwU3c_w_jCR_S2R7nU6nNiyyRY3eYkBE4ympU",
    privateKey : "CPule0bzBJoD6ZVodNRQQKBeWUuPbg4EA7ZlhAlCbD0"
}
const subscription = {
    endpoint : "https://fcm.googleapis.com/fcm/send/fF8W7UgLAPo:APA91bFsjvc3BScd3Cu8EEUJzIJSaQaKFPYOTQVMx2XquHEmswJ_mYXwky3nK7rPho90fUQ8c4c5weedFPXh9azy90cF28QJa5j-IYtLpXeGrFdimOKPg4rTMbwaTQoJ9zx-LhmU7wYM",
    keys : {
        p256dh : "BPWcfi04pbkhP00sFVugv7WAwGMDiHjqadksoFJE7fiMzAH0Bkg/V/5i5a6JGh38Cd2nF72Q/gyJIY5DQTjyBuE=",
        auth : "SRddYligJQeDIlp8bYq8Pg=="
    }
}
const options = {
    gcmAPIKey : "533278554636",
    TTL : 60
}
webPush.setVapidDetails('mailto:idho.250197@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey)

let payloads = "selamat,push notification + subscription berhasil di gunakan"

webPush.sendNotification(
    subscription,
    payloads,
    options
)