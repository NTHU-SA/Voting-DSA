# Voting-DSA

清大學生會首個線上投票系統上線啦～

2020 年新型冠狀病毒全球大流行，為了減少人與人之間的接觸、保持社交距離，選委會決定將過往實體投票的選舉改為線上選舉，因此委託學生會資訊部開發，並且順利完成第 29 屆學生會正副會長、學生議會學生議員之選舉。

此專案歡迎各界高手幫忙開發貢獻，也歡迎其他學生自治組織使用這套投票系統，如果有好點子、改善建議也都相當歡迎提出 issue。

## 操作畫面

- [投票教學影片](https://www.youtube.com/watch?v=SN2JP758dFA&feature=youtu.be)

![](README/img/voting.jpg)

![](README/img/activity.png)

![](README/img/verification.jpg)

## 安裝、執行

1. `npm install`
1. `cp .env.dev .env`
1. `npm run dev`

## 匯入測試檔案

- `mongorestore --drop --host localhost --port 27017 -uroot -ppassword --db voting_sa README/dump`

## 開發

- 在 [README/postman](README/postman) 中有 API 測試範本
- 如何從本機產生登入 JWT Token?
  - 先透過 `addUser` API 建立使用者，並取得 `_id` 與 `student_id`
  - 打開 Node.js CLI 輸入以下程式碼產生 Token
  - 將 Token 直接貼到瀏覽器 cookie 中 `service_token` 欄位

```javascript
auth = require('./libs/ccxpAuth.js');
user = {"_id": "5ed699efdc02ue515d79627b","student_id": "108060001"}
auth.obtainServiceToken('108060001', user);
```

## TODO

- [ ] 加入登入跳轉到原先頁面
- [ ] 加入 debug、log
- [ ] 加入後台資料新增、修改、刪除功能
- [ ] 加入後台投票統計圓餅圖
- [ ] 加入自動化測試
- [ ] 修正投票按鈕點選範圍
- [ ] 重構前端程式碼
