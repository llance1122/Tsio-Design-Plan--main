# 設醮 Tsio Design Plan

長庚大學工業設計學系「設醮」計畫的形象網站。展覽、工作坊、講座等活動資訊，加上可以在後台即時發布的文章（報導）。

> 「設」是設計，「醮」是面對創作時的虔誠與反省。設醮是一場屬於設計者的精神儀式。

- 私人專案，僅供設醮團隊使用
- 部署在系上 NAS 的 Docker（見 [部署與維護](docs/部署與維護.md)）

---

## 網站有哪些頁面

| 網址 | 頁面 | 內容來源 |
|---|---|---|
| `/` | 首頁：主視覺輪播、公告、關於、照片牆、展覽、工作坊、計畫、最新報導 | 程式內容 ＋ 資料庫（最新報導） |
| `/About` | 關於設醮 | 程式內容 |
| `/Plan` | 計畫總覽（展覽、工作坊入口） | 程式內容 |
| `/Plan/ExhibitionList` | 展覽總覽 | `exhibitions.json` |
| `/Plan/ExhibitionList/2024-E001` | 「對話的對話」展覽內頁 | 程式內容 |
| `/Plan/Workshop` | 工作坊介紹 | 程式內容 |
| `/Plan/Workshop/List`、`/Plan/Workshop/:id` | 工作坊總覽、單一工作坊 | `workshops.json` |
| `/Plan/Market`、`/Plan/Lecture`、`/Plan/Other` | 市集、講座、戶外電影（目前選單中隱藏） | 程式內容 |
| `/Articles`、`/Articles/:slug` | 文章總覽、文章內頁 | 資料庫（後台發布） |
| `/Enroll` | 報名參與 | `enrolls.js` |
| `/Contact` | 聯絡我們 | 程式內容 |
| `/admin` | 文章後台（密碼登入） | 資料庫 |

## 技術

| 層 | 技術 |
|---|---|
| 前端 | React 19、**React Router 7（框架模式）**、Tailwind CSS v4、Vite 7 |
| 後端 | Node.js 24、Express 4、SQLite（Node 內建 `node:sqlite`，免安裝） |
| 部署 | 單一 Docker 容器（Synology NAS） |

## 快速開始

需要 Node.js 24 以上。

```bash
npm install              # 安裝套件
npm run import:articles  # 第一次：把預設文章匯入本機資料庫
npm run dev              # 啟動開發伺服器
```

打開 `http://localhost:3001`，後台在 `http://localhost:3001/admin`（本機預設密碼 `admin1234`，可在 `server/.env` 修改，範本見 `server/.env.example`）。

| 指令 | 用途 |
|---|---|
| `npm run dev` | 開發模式：網站 + API 同一個伺服器，前端存檔即時更新（改後端程式要重啟） |
| `npm run build` | 打包到 `build/` |
| `npm start` | 用正式模式執行打包結果 |
| `npm run lint` | 程式碼檢查 |
| `npm run optimize:images` | 壓縮 `src/assets` 裡新加的照片 |

---

## 網站怎麼運作

```
瀏覽器 ──► Node.js 伺服器（Express，server/index.js）
             ├─ 內容固定的頁面（關於、計畫、展覽…）→ 送出打包時就產生好的 HTML
             ├─ 內容來自資料庫的頁面（首頁、文章）  → 伺服器即時產生 HTML
             ├─ /api/…      → 登入、文章新增／修改／刪除（後台用）
             └─ /uploads/…  → 後台上傳的海報圖
                                 │
                        SQLite 資料庫 ＋ 海報圖資料夾
```

- **每一頁送出去的都是完整 HTML**：搜尋引擎與 LINE / FB 分享預覽都讀得到內容。JavaScript 載入後只負責互動（輪播、選單、捲動動畫）。
- **文章**存在資料庫，在後台發文後，首頁與文章頁**立刻**就是最新內容，不用重新部署。
- **其他內容**（展覽、工作坊、活動頁文案）寫在程式與 JSON 裡，修改後要重新打包部署。

細節（頁面產生方式、資料流、API、寫程式的注意事項）見 [技術說明](docs/技術說明.md)。

---

## 專案結構與每個檔案的作用

### 根目錄

| 檔案 | 作用 |
|---|---|
| `package.json` / `package-lock.json` | 套件清單與指令（`dev`、`build`、`start`…） |
| `react-router.config.js` | 哪些頁面在打包時預先產生 HTML、網站子路徑、輸出位置 |
| `vite.config.js` | 打包設定：React Router、Tailwind、分享預覽圖（圖片加 `?og` 自動裁切） |
| `eslint.config.js` | 程式碼檢查規則 |
| `Dockerfile` | 容器建置：先打包網站，再用 Node 24 執行伺服器 |
| `docker-compose.yml` | NAS 部署設定：對外 8080 埠、`data/` 資料夾、從 `.env` 讀密碼與子路徑 |
| `.env.example` | NAS 用設定範本（後台密碼、登入密鑰、子路徑） |
| `.gitignore` / `.dockerignore` | 不進版控／不進容器的檔案 |
| `.claude/launch.json` | Claude Code 預覽用的啟動設定 |
| `scripts/optimize-images.js` | 圖片壓縮工具：縮圖、jpg／png 轉 webp |
| `docs/` | 其他文件（見最下方「文件」） |

### `server/` — 後端

| 檔案 | 作用 |
|---|---|
| `index.js` | 伺服器入口：API、上傳圖、網頁（送出預先產生的頁面或即時產生）；開發模式時掛上 Vite |
| `env.js` | 讀取 `server/.env`，整理網站子路徑 `BASE_PATH`（前端打包設定也共用這支） |
| `config.js` | 設定：埠號、後台密碼、登入密鑰、資料庫與上傳資料夾位置 |
| `db.js` | 連接 SQLite 資料庫、建立文章資料表 |
| `articles.js` | 文章查詢（列表、單篇），API 與網頁共用 |
| `auth.js` | 後台密碼驗證、登入憑證（JWT）、登入失敗次數限制 |
| `routes/articles.js` | 文章 API：列表、單篇、新增、修改、刪除，海報上傳 |
| `import-articles.js` | 第一次啟動時把 `src/data/article.json` 匯入資料庫 |
| `.env.example` | 本機設定範本 |
| `uploads/` | 後台上傳的海報圖（實際檔案不進 git） |

### `src/` — 網站外框與設定

| 檔案 | 作用 |
|---|---|
| `root.jsx` | 整份 HTML 的外框：`<head>`、樣式、動畫與間距參數、錯誤畫面 |
| `routes.js` | **路由表**：哪個網址對應哪個頁面檔 |
| `App.jsx` | 主站版面：Nav ＋ 頁面內容 ＋ Footer，並啟用全站捲動進場動畫 |
| `App.css` | 全站樣式：Tailwind、字級、換頁與捲動動畫 |
| `config/site.js` | 網站名稱、正式網域、預設描述 |
| `config/motion.js` | 動畫參數：時長、曲線、輪播間隔、進場效果 |
| `config/spacing.js` | 區塊間距：標題到內文的距離（手機／平板／桌機） |
| `lib/paths.js` | `url()`：把 API、上傳圖網址接上網站子路徑 |
| `lib/articles.js` | 文章連結與封面（沒有海報時用預設圖） |
| `lib/meta.js` | `pageMeta()`：產生每頁的描述與分享預覽資訊 |
| `hooks/useScrollReveal.js` | 捲動進場：帶 `.headline` 的元素捲進畫面時淡入 |

### `src/index_component/` — 首頁與全站共用區塊

| 檔案 | 作用 |
|---|---|
| `Main.jsx` | **首頁**：依序組合下面各區塊，並在伺服器端讀最新 3 篇文章 |
| `Nav.jsx` | 導覽列（全站）：字色依背景自動切換、Plan 下拉選單、手機側邊選單 |
| `Footer.jsx` | 頁尾（全站）：聯絡資訊、網站連結、社群、回到頂部 |
| `Banner.jsx` | 首頁主視覺輪播（桌機左右兩欄擦入，手機／平板單欄） |
| `Marquee.jsx` | 跑馬燈公告（改公告文字就改這支的 `MESSAGE`） |
| `About.jsx` | 首頁「設醮」介紹段落 |
| `ImageGallery.jsx` | 首頁視差照片牆與置中標語 |
| `Exhibition.jsx` | 首頁展覽區塊（主視覺海報） |
| `WorkShop.jsx` | 首頁工作坊區塊 |
| `Plan.jsx` | 首頁計畫區塊 |
| `Article.jsx` | 首頁「報導」區塊（手機輪播、桌機三欄） |

### `src/routers/` — 首頁以外的頁面（一個檔案 = 一個網址）

| 檔案 | 網址 |
|---|---|
| `AboutPage.jsx` | `/About` 關於設醮 |
| `PlanPage.jsx` | `/Plan` 計畫總覽 |
| `EnrollPage.jsx` | `/Enroll` 報名參與 |
| `ContactPage.jsx` | `/Contact` 聯絡我們 |
| `ArticlesPage.jsx` | `/Articles` 文章總覽 |
| `SingleArticlePage.jsx` | `/Articles/:slug` 文章內頁 |
| `NotFoundPage.jsx` | 找不到頁面（404） |
| `PlanFolder/ExhibitionListPage.jsx` | `/Plan/ExhibitionList` 展覽總覽 |
| `PlanFolder/exhibitions/2024-E001.jsx` | `/Plan/ExhibitionList/2024-E001` 「對話的對話」展覽內頁（每檔展覽一個檔，檔名 = 展覽 id） |
| `PlanFolder/WorkshopPage.jsx` | `/Plan/Workshop` 工作坊介紹 |
| `PlanFolder/WorkshopListPage.jsx` | `/Plan/Workshop/List` 工作坊總覽 |
| `PlanFolder/SingleWorkshopPage.jsx` | `/Plan/Workshop/:id` 單一工作坊（內容來自 `workshops.json`） |
| `PlanFolder/MarketPage.jsx` | `/Plan/Market` 市集 |
| `PlanFolder/LecturePage.jsx` | `/Plan/Lecture` 講座 |
| `PlanFolder/OtherActivitiesPage.jsx` | `/Plan/Other` 戶外電影 |

### `src/small_component/` — 跨頁共用的小元件

| 檔案 | 作用 |
|---|---|
| `CardLayout.jsx` | 列表卡片（文章、展覽、工作坊共用） |
| `Title.jsx` | 區塊標題（直式／橫式） |
| `Breadcrumbs.jsx` | 麵包屑導覽 |
| `MoreLink.jsx` | 「查看更多」按鈕 |
| `PageTransition.jsx` | 換頁時整頁淡入 |
| `CrossfadeImages.jsx` | 多張圖輪流淡入（手機版圖庫） |
| `ProfileCard.jsx` | 講者／電影介紹卡片 |
| `ExhibitionCard.jsx` | 計畫頁的活動大卡片 |
| `EnrollCard.jsx` | 報名活動卡片（報名中／額滿／截止） |
| `ContactInfoItem.jsx` | 頁尾的一行聯絡資訊 |

### `src/admin/` — 文章後台

| 檔案 | 作用 |
|---|---|
| `AdminApp.jsx` | 後台入口：未登入顯示登入頁，登入後顯示管理面板 |
| `LoginForm.jsx` | 密碼登入畫面 |
| `Dashboard.jsx` | 已發布文章列表：編輯、刪除 |
| `ArticleForm.jsx` | 發文／編輯表單：標題、描述、海報、小標與段落區塊 |
| `api.js` | 呼叫後台 API、保存登入狀態 |

### `src/data/` — 網站資料

| 檔案 | 作用 |
|---|---|
| `exhibitions.json` | 展覽資料（`cover` 填 `assets/imgs/` 的檔名） |
| `workshops.json` | 工作坊資料（目前是空的） |
| `enrolls.js` | 報名活動清單（目前是空的，檔內附填寫範例） |
| `covers.js` | 把 JSON 裡的封面檔名對應成圖片網址 |
| `article.json` | 最初的 8 篇文章，只在第一次啟動時匯入資料庫 |

### `src/assets/` — 圖片

| 資料夾 | 內容 |
|---|---|
| `banner/` | 首頁主視覺（`desktop/` 左右兩欄、`mobile/`、`tablet/` 整張圖） |
| `photos/` | 首頁與關於頁的照片 |
| `imgs/` | 各頁內容圖、封面、預設封面 |
| `dialoguesPhotos/` | 「對話的對話」展覽的參展人照片 |
| `og/` | 置中裁切不適用時，另存的分享預覽圖 |
| `icons/` | Logo、社群圖示、箭頭 |
| `bg_gray.webp` | 灰底背景紋理 |

打包與執行時才會出現的資料夾（都不進版控）：`node_modules/`（套件）、`build/`（打包結果）、`.react-router/`（自動產生的型別）、`server/data.db`（本機資料庫）。

---

## 常見維護工作要改哪個檔案

| 要做的事 | 改哪裡 |
|---|---|
| 改某一頁的文字、圖片 | 該頁的頁面檔（對照上面的表或 `src/routes.js` 找） |
| 改 Nav 選單、Footer | `src/index_component/Nav.jsx`、`Footer.jsx` |
| 改某頁的分享標題、描述、預覽圖 | 該頁面檔最上方的 `meta` |
| 新增、修改、刪除文章 | 後台 `/admin`，不用改程式（見 [後台操作手冊](docs/後台操作手冊.md)） |
| 新增一個頁面 | 新增頁面檔 → `src/routes.js` 加一行；內容固定的頁面再加進 `react-router.config.js` 的 `STATIC_PAGES` |
| 新增一檔展覽 | `src/data/exhibitions.json` 加一筆 ＋ 新增 `src/routers/PlanFolder/exhibitions/<展覽id>.jsx` |
| 新增一個工作坊 | `src/data/workshops.json` 加一筆 |
| 開放／關閉報名 | `src/data/enrolls.js` |
| 改跑馬燈公告 | `src/index_component/Marquee.jsx` 的 `MESSAGE` |
| 調整動畫快慢、區塊間距 | `src/config/motion.js`、`spacing.js` |
| 改網站名稱、正式網域 | `src/config/site.js` |
| 新增照片 | 放進 `src/assets` 後執行 `npm run optimize:images` |

---

## 文件

| 文件 | 給誰看 | 內容 |
|---|---|---|
| [後台操作手冊](docs/後台操作手冊.md) | 發文的同學 | 登入、發文、修改、刪除文章（不需要程式知識） |
| [部署與維護](docs/部署與維護.md) | 負責 NAS 的人 | Docker 部署、密碼設定、更新、備份、安全、待辦事項 |
| [技術說明](docs/技術說明.md) | 接手開發的工程師 | 頁面產生方式、資料與 API、子路徑、寫程式的注意事項 |
| [開發紀錄](docs/開發紀錄.md) | 想了解來龍去脈的人 | 改造歷程、技術決策、版本紀錄 |
