/*
; Update 2020.03.06 17:00, by Kai
[task_local]
6 9 * * * neukssr.js
*/

let Cookie = $prefs.valueForKey("neukssrCookie");

let Req = {
  url: "https://neukssr.club/user/checkin",
  method: "POST",
  headers: {
    Cookie: Cookie,
    Origin: "https://neukssr.club/",
    Referer: "https://neukssr.club/user",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
  }
};

$task.fetch(Req).then(response => {
  try {
    let doc = JSON.parse(response.body);
    if (doc["ret"] == 1) {
      $notify(
        "neukssr✈️",
        "成功",
        `${doc["msg"]}\n已使用流量${doc["trafficInfo"]["lastUsedTraffic"]}\n剩余流量${doc["trafficInfo"]["unUsedTraffic"]}`
      );
    } else {
      $notify("neukssr✈️", "成功", doc["msg"]);
    }
  } catch (error) {
    $notify("neukssr✈️", "失败", error);
  }
});
