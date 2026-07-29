# 設醮 Tsio Design Plan

設計活動形象網站，含**文章後台管理系統**。前端 React 單頁應用，後端 Express + SQLite，可用 Docker 一鍵部署。

> 📄 完整技術與部署細節請見 **[專案說明文件.md](專案說明文件.md)**
> 📘 發文者操作教學請見 **[文章後台操作手冊.md](文章後台操作手冊.md)**

---

## 這是什麼

一個設計系／設計活動的形象網站，內容包含展覽、工作坊、市集、講座、其他活動與**文章（報導）**。文章原本寫死在程式裡，現已改造成**可透過後台即時發布 / 編輯 / 刪除**，不需重新部署。

## 主要功能

- 🎨 **前台**：首頁 Banner 視差輪播、視差圖庫、自適應顏色導覽列、各活動頁面
- 📝 **文章後台 `/admin`**：密碼登入、結構化區塊編輯器（小標／段落自由排列）、海報上傳、新增／編輯／刪除
- 🔌 **後端 API**：Express 提供文章 CRUD 與圖片上傳，JWT 登入驗證
- 🗄️ **資料庫**：Node 24 內建 SQLite（免安裝、免編譯原生模組）
- 🐳 **部署**：單一 Docker 容器同時服務前端 + API + 圖片

## 技術棧

| 層 | 技術 |
|---|---|
| 前端 | Vite 7、React 19、react-router 7、Tailwind CSS v4 |
| 後端 | Node.js 24、Express 4、`node:sqlite` |
| 部署 | Docker、Synology NAS |

---

## 快速開始（本機開發）

需要 Node.js 24 以上。

```bash
# 1. 安裝相依套件
npm install

# 2.（第一次）匯入現有文章到本機資料庫
npm run import:articles

# 3. 開後端（3001 埠）
npm run server:dev

# 4. 另開終端機，開前端（5181 埠）
npm run dev
```

開發網址：`http://localhost:5181/tsio-design/`
後台：`http://localhost:5181/tsio-design/admin`

**打包**：`npm run build`

---

## 部署（Docker）

```bash
# 在 docker-compose.yml 改好 ADMIN_PASSWORD 與 JWT_SECRET 後
docker compose up -d --build
```

容器在 `8080` 埠提供 `http://<host>:8080/tsio-design/`。
資料（SQLite + 上傳圖片）保存在掛載的 `./data` 資料夾。詳見 [專案說明文件.md](專案說明文件.md)。

---

## 檔案結構

```
├─ server/            後端（Express + SQLite + 文章 API）
├─ src/
│  ├─ admin/           後台（登入、發文/編輯、文章管理）
│  ├─ index_component/ 首頁各區塊
│  ├─ routers/         各頁面
│  ├─ small_component/ 共用小元件
│  └─ lib/paths.js     子路徑處理
├─ Dockerfile
├─ docker-compose.yml
└─ 專案說明文件.md / 文章後台操作手冊.md
```

---

## 授權

私人專案，僅供設醮團隊使用。
