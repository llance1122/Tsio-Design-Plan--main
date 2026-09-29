// ============================================================
//  報名活動資料（Enroll 頁）
//
//  用 .js 而不是 .json，是為了能寫註解、也能直接 import 封面圖，
//  不必像 workshops.json 那樣用檔名去對應（見 data/covers.js）。
//
//  ---- 欄位說明 ----
//  id      ：唯一值，React key 用，隨意命名不影響顯示
//  title   ：活動名稱
//  date    ：日期字串（原樣顯示，不做解析，所以格式自由）
//  cover   ：封面圖，import 進來的圖檔。省略時用預設圖
//  formUrl ：點擊卡片要開啟的 Google 表單網址（另開分頁）
//  status  ："open" 報名中 ／ "full" 已額滿 ／ "closed" 已截止
//            省略時視同 "open"。非 open 的卡片會留在頁面上但不可點。
//
//  ---- 沒有活動時 ----
//  把陣列清空成 []，Enroll 頁會自動切換成「目前沒有開放報名」的空狀態版面。
// ============================================================

// 封面圖要先 import 進來，例：
// import lectureCover from "../assets/imgs/lectureImg_1.webp";
// import exhibitionCover from "../assets/imgs/ExhibitionBanner.webp";

// 目前沒有開放報名的活動。下面註解是填寫範例，取消註解並換成真實資料即可
const enrolls = [
	// {
	// 	id: "2026-EN001",
	// 	title: "設醮工作坊：從一張紙開始的敘事練習",
	// 	date: "2026.09.12 (六)",
	// 	cover: lectureCover,
	// 	formUrl: "https://forms.gle/",
	// 	status: "open",
	// },
	// {
	// 	id: "2026-EN002",
	// 	title: "講座｜在地信仰與當代設計的對話",
	// 	date: "2026.09.27 (日)",
	// 	cover: lectureCover,
	// 	formUrl: "https://forms.gle/",
	// 	status: "open",
	// },
	// {
	// 	id: "2026-EN003",
	// 	title: "《表裏》開幕導覽場",
	// 	date: "2026.08.30 (六)",
	// 	cover: exhibitionCover,
	// 	formUrl: "https://forms.gle/",
	// 	status: "full",
	// },
];

export default enrolls;
