// ============================================================
//  每頁的 <head> 資訊：描述、分享預覽（og:*）
//  頁面檔這樣用：
//    import ogImage from "../assets/imgs/about.webp?og";
//    export const meta = ({ location }) =>
//      pageMeta({ title: "關於設醮", description: "…", image: ogImage, location });
//
//  圖片網址後面加 ?og，打包時會自動「置中」裁成 1200×630 的 jpg（設定在 vite.config.js）。
//  橫幅很寬、置中裁會切到重點時，另存一張已裁成 1200:630 比例的圖放在 src/assets/og/，
//  再對那張加 ?og（例：工作坊橫幅 og/workshop_banner-og.webp）。
//  瀏覽器分頁標題固定是網站名；分享時顯示的標題是「頁名｜網站名」。
// ============================================================
import { SITE } from "../config/site";
import defaultImage from "../assets/imgs/about.webp?og";

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ""); // "" 或 "/tsio-design"
const absolute = (u) => (/^https?:\/\//.test(u) ? u : SITE.origin + u);

// uncropped：image 不是 ?og 裁切過的圖（例如後台上傳的海報）時設 true，就不宣告 1200×630 尺寸
export function pageMeta({ title, description, image, uncropped = false, location, noindex = false }) {
	const shareTitle = title ? `${title}｜${SITE.name}` : SITE.name;
	const desc = description || SITE.description;
	const pathname = location?.pathname || "/";
	return [
		{ title: SITE.name },
		{ name: "description", content: desc },
		noindex && { name: "robots", content: "noindex" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: SITE.name },
		{ property: "og:title", content: shareTitle },
		{ property: "og:description", content: desc },
		{ property: "og:url", content: SITE.origin + BASE + pathname },
		{ property: "og:image", content: absolute(image || defaultImage) },
		!uncropped && { property: "og:image:width", content: "1200" },
		!uncropped && { property: "og:image:height", content: "630" },
		{ name: "twitter:card", content: "summary_large_image" },
	].filter(Boolean);
}
