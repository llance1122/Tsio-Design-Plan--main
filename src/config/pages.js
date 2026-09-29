// ============================================================
//  頁面資訊：每一頁的標題、描述、分享預覽圖集中在這裡。
//  - 打包時（vite.config.js 的 prerenderPages）為每一頁產生
//    dist/<path>/index.html，寫入 og:* 標籤，
//    貼連結到 LINE / FB / IG 時就會顯示各自的標題和預覽圖。
//  - 瀏覽器分頁標題固定是 SITE.name，不隨頁面變化。
//
//  新增頁面：main.jsx 加路由後，在 PAGES 補一筆即可。
//  image 填專案內的圖片路徑（jpg / png / webp 都可），
//  打包時會自動裁成 1200×630 的 jpg；不填就用 SITE.image。
//  imageFocus（選填）：裁切的水平重心，0 靠左、0.5 置中（預設）、1 靠右。
// ============================================================
import workshops from "../data/workshops.json";

export const SITE = {
	name: "設醮 Tsio Design Plan",
	// 網站正式網址，用來組分享預覽需要的完整網址（有子路徑時要包含，如 http://x.x/tsio-design）。
	// NAS 目前是群暉預設的自簽憑證，LINE / FB 抓不了 https，先用 http；
	// 換上正式憑證（如 Let's Encrypt）後改成 https。
	url: "http://td-plan.id.cgu.edu.tw",
	description:
		"「設醮」— 在建構之中成就一場創造。設計系的展覽、工作坊與活動，以作品為供品、以創作為祈願。",
	image: "src/assets/imgs/about.webp",
};

export const PAGES = [
	{ path: "/" },
	{
		path: "/About",
		title: "關於設醮",
		description:
			"「設」是設計，「醮」是面對創作時的虔誠與反省。設醮是一場屬於設計者的精神儀式。",
	},
	{
		path: "/Enroll",
		title: "報名參與",
		description: "設醮各項活動報名資訊。",
	},
	{
		path: "/Contact",
		title: "聯絡我們",
	},
	{
		path: "/Articles",
		title: "文章總覽",
		description: "設醮的校友特稿與活動報導。",
		image: "src/assets/imgs/default-cover.webp",
	},
	{
		path: "/Plan",
		title: "計劃",
		description: "展覽、工作坊、市集、講座與戶外電影 — 設醮的各項活動。",
	},
	{
		path: "/Plan/ExhibitionList",
		title: "展覽總覽",
		description: "「對話的對話」— 青年設計師與創作者的主題展，涵蓋平面、空間、影像與裝置。",
		image: "src/assets/imgs/ExhibitionBanner.webp",
	},
	{
		path: "/Plan/ExhibitionList/2024-E001",
		title: "對話的對話—在彼此的痕跡中流動",
		description:
			"以「對話」為核心命題，探索存在主義哲學脈絡下的自我建構與創作關係。每一次對話皆會留下痕跡，在人、物、思想之間形成微妙而深層的連結。",
		image: "src/assets/imgs/ExhibitionBanner.webp",
	},
	{
		path: "/Plan/Workshop",
		title: "工作坊",
		description:
			"來自不同文化的職人，帶著木作、織品、陶藝與書寫走進現場。親手做一件作品，也為自己設下一場微型儀式。",
		image: "src/assets/imgs/workshop_banner.webp",
		imageFocus: 0.6, // 橫幅很寬，重心偏右才不會切到右側文字
	},
	{
		path: "/Plan/Workshop/List",
		title: "工作坊總覽",
		image: "src/assets/imgs/workshop_banner.webp",
		imageFocus: 0.6, // 橫幅很寬，重心偏右才不會切到右側文字
	},
	{
		path: "/Plan/Market",
		title: "市集",
		description: "延伸展覽精神的創意市集，集結手作品牌、獨立出版與插畫小物。",
		image: "src/assets/imgs/ExhibitionBanner.webp",
	},
	{
		path: "/Plan/Lecture",
		title: "講座",
		description: "邀請走過這條路的前輩，談創作背後那段無聲的過程。",
		image: "src/assets/imgs/lectureImg_1.webp",
	},
	{
		path: "/Plan/Other",
		title: "戶外電影",
		description: "一塊幕布、一片星空，戶外電影帶你走進被影像喚醒的記憶。",
		image: "src/assets/imgs/movieCover_1.webp",
	},
	// 工作坊內頁：從 workshops.json 自動產生
	...workshops.map((w) => ({
		path: `/Plan/Workshop/${w.id}`,
		title: w.title,
		description: w.description,
		image: "src/assets/imgs/workshop_banner.webp",
		imageFocus: 0.6, // 橫幅很寬，重心偏右才不會切到右側文字
	})),
	{ path: "/admin", title: "後台", noindex: true },
];

// 文章內頁的資料在後端資料庫，這裡只收舊的 article.json（打包時由 vite.config 傳入），
// 不在前端 import，避免把整包文章內容打進網站程式。
export function articlePages(articles) {
	return articles.map((a) => ({
		path: `/Articles/${a.id}`,
		title: a.title,
		description: a.description,
		image: "src/assets/imgs/default-cover.webp",
	}));
}

// 分享預覽標題：「頁名｜網站名」，首頁只顯示網站名
export function pageTitle(title) {
	return title ? `${title}｜${SITE.name}` : SITE.name;
}
