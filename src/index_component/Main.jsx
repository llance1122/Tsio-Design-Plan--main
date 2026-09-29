import About from "./About";
import Banner from "./Banner";
import Marquee from "./Marquee";
import ImageGallery from "./ImageGallery";
import Article from "./Article";
import Plan from "./Plan";
import Exhibition from "./Exhibition";
import WorkShop from "./WorkShop";
import { pageMeta } from "../lib/meta";

export const meta = ({ location }) => pageMeta({ location });

// 首頁由伺服器即時產生（不預先產生），「報導」區塊才會永遠是最新的文章。
// context.articles 由 server/index.js 提供，直接讀資料庫
export function loader({ context }) {
	return { latestArticles: context.articles.list().slice(0, 3) };
}

export default function Main({ loaderData }) {
	return (
		<main className="space-y-[80px] lg:space-y-[300px]">
			<Banner />
			{/* 跑馬燈公告：夾在 Banner 與「設醮」之間。
            上下間距刻意比 main 的 space-y 節奏窄（公告貼近 Banner 才像通知，
            拉到 300px 會變成一個獨立區塊）：
            -mt 抵銷 Banner 的 margin-bottom，mb 直接指定與「設醮」的距離。
            想再放寬／收緊就改這兩個數字。 */}
			<Marquee className="-mt-[30px] mb-[50px] lg:-mt-[150px] lg:mb-[150px]" />
			<About />
			<ImageGallery />
			{/* 蓋幕層（仿 MOTOYA）：z-index 高於圖庫的 sticky 標語，
            以負 margin 往上疊過圖庫尾巴的「最後 15vh」，
            白底滑上來時會把釘在中央的標語「蓋掉」。
            calc 裡的 +80px/+300px 是抵銷 space-y 的 margin 合併，
            讓淨疊入量在所有裝置都固定是 15vh；
            pt 補回原本 space-y 的區塊間距 */}
			<div className="relative z-20 bg-white -mt-[calc(15vh+80px)] lg:-mt-[calc(15vh+300px)] pt-[80px] lg:pt-[300px] space-y-[80px] lg:space-y-[300px]">
				<Exhibition />
				<WorkShop />
				<Plan />
				<Article latestArticles={loaderData.latestArticles} />
			</div>
		</main>
	);
}
