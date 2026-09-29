import Breadcrumbs from "../../small_component/Breadcrumbs";
import ExhibitionLayout from "../../assets/imgs/ExhibitionLayout.webp";
import WorkshopBanner from "../../assets/imgs/workshop_banner.webp";
import Workshop_1 from "../../assets/imgs/workshop_1.webp";
import Workshop_2 from "../../assets/photos/workShop_1.webp";
import MoreLink from "../../small_component/MoreLink";
import { pageMeta } from "../../lib/meta";
// 橫幅很寬，自動置中裁切會切到文字，改用另存的裁好版本（src/assets/og/）
import ogImage from "../../assets/og/workshop_banner-og.webp?og";

export const meta = ({ location }) =>
	pageMeta({
		title: "工作坊",
		description:
			"來自不同文化的職人，帶著木作、織品、陶藝與書寫走進現場。親手做一件作品，也為自己設下一場微型儀式。",
		image: ogImage,
		location,
	});

export default function WorkshopPage() {
	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				<div className="w-full mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Plan" word2="Workshop" />
				</div>

				<div className="w-full aspect-[1917/796]">
					<img
						className="w-full h-full object-cover"
						src={WorkshopBanner}
						alt=""
					/>
				</div>

				<div className="">
					<div className="space-y-[35px] w-full mx-auto px-[40px] mt-[60px] lg:mt-[100px] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
						<div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
							<img
								className="w-full h-full object-cover"
								src={Workshop_1}
								alt=""
								loading="lazy"
								decoding="async"
							/>
						</div>

						{/* min-[1180px]：圖 600 + gap 100 + 文字 400 = 1100，加左右 padding 80 → 視窗超過 1180px
						    才會出現剩餘空間。讓文字欄吃掉它，左右緣才會對齊麵包屑，
						    同時把間距固定在 100px（用 justify-between 的話會被撐到 200px）。
						    改動上面圖片或文字的固定寬度時，這個門檻要跟著算。 */}
						<div className="md:w-[400px] min-[1180px]:flex-1 space-y-[20px] lg:space-y-[35px] lg:order-[-1]">
							<h2 className="subtitle-bold lg:subtitle-bold-web">
								寒暑假國際工作坊 | Seasonal International Workshops
							</h2>
							<p className="bodyText lg:bodyText-web">
								為提升學生的國際移動力，並促進與國際校系之間的合作與交流，長庚大學工業設計學系自2022年起參與由台灣、泰國、日本與韓國等國家設計相關校系共同舉辦的
								ASIA-LINK 國際設計工作坊。
								<br />
								<br />
								寒暑期工作坊皆有來自台灣、泰國、日本與韓國的學生與教師參與，合作學校包含日本芝浦工業大學、韓國蔚山國立科學技術院（UNIST）、泰國吞武里國王科技大學（KMUTT）、泰國宋卡王子大學，以及台灣的明志科技大學與長庚大學。
								<br />
								<br />
								透過不同國家學生與教師的共同參與，工作坊提供跨文化的設計交流與合作環境，讓學生在實際設計活動中接觸不同國家的設計思維、文化背景與問題解決方式。除了拓展國際視野，也能在跨國合作過程中培養溝通協調、團隊合作與設計實務能力。
							</p>
						</div>
					</div>

					<div className="space-y-[35px] w-full mx-auto px-[40px] mt-[60px] lg:mt-[100px] lg:max-w-7xl md:flex md:flex-row md:items-center md:justify-center md:gap-[100px]">
						<div className="w-full md:w-[450px] lg:w-[600px] aspect-square">
							<img
								className="w-full h-full object-cover"
								src={Workshop_2}
								alt=""
								loading="lazy"
								decoding="async"
							/>
						</div>

						{/* min-[1180px]：圖 600 + gap 100 + 文字 400 = 1100，加左右 padding 80 → 視窗超過 1180px
						    才會出現剩餘空間。讓文字欄吃掉它，左右緣才會對齊麵包屑，
						    同時把間距固定在 100px（用 justify-between 的話會被撐到 200px）。
						    改動上面圖片或文字的固定寬度時，這個門檻要跟著算。 */}
						<div className="md:w-[400px] min-[1180px]:flex-1 space-y-[20px] lg:space-y-[35px]">
							<h2 className="subtitle-bold lg:subtitle-bold-web">
								職人工作坊 | Artisan Workshops
							</h2>
							<p className="bodyText lg:bodyText-web">
								長庚大學工業設計學系邀請不同領域的工藝職人與專業創作者進行工作坊，開設陶藝、金工、雕塑等多元課程，讓學生有機會接觸不同工藝領域與材料，拓展課堂之外的實作學習經驗。
								<br />
								<br />
								工作坊透過職人現場示範、技法教學與實際操作，讓學生從材料特性、工具使用到製作流程，親身體驗工藝創作的過程。透過直接與職人交流，學生也能了解不同工藝背後的製作方法、經驗與創作思維。
								<br />
								<br />
								除了培養學生的手作與材料應用能力，職人工作坊也讓學生從實際製作中理解材料、工法與造形之間的關係，進一步將工藝技術轉化為設計思考與創作的可能性，累積更扎實的設計實作經驗。
							</p>
						</div>
					</div>
				</div>

				{/* 改用全站共用的 MoreLink（細框 outline + 箭頭），與首頁「了解更多」一致 */}
				<div className="max-w-[82.2vw] mx-auto">
					<MoreLink to="/Plan/Workshop/List" label="了解更多" />
				</div>
			</main>
		</section>
	);
}
