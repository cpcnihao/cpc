/*
; Update 2020.03.06 17:00, by Kai
; neukssr登入：https://neukssr.club/user
[rewrite_local]
^https?:\/\/\.neukssr\.club\/user url script-request-header neukssrCookie.js
[mitm]
neukssr.club
*/

let headerCookie = $request.headers["Cookie"];

if (headerCookie) {
  if ($prefs.valueForKey("neukssrCookie") != undefined) {
    if ($prefs.valueForKey("neukssrCookie") != headerCookie) {
      var cookie = $prefs.setValueForKey(headerCookie, "neukssrCookie");
      if (!cookie) {
        $notify("更新neukssr✈️Cookie失败！", "", "");
      } else {
        $notify("更新neukssr✈️Cookie成功！", "", "");
      }
    }
  } else {
    let cookie = $prefs.setValueForKey(headerCookie, "neukssrCookie");
    if (!cookie) {
      $notify("首次写入neukssr✈️Cookie失败！", "", "");
    } else {
      $notify("首次写入neukssr✈️Cookie成功！", "", "");
    }
  }
}
$done({});