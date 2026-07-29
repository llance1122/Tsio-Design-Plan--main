import Footer from "../index_component/Footer";
import Nav from "../index_component/Nav";
import Breadcrumbs from "../small_component/Breadcrumbs";
import Title from "../small_component/Title";
import Bg_gray from "../assets/bg_gray.jpg";
import ExhibitionCard from "../small_component/ExhibitionCard";

import Exhibition_1 from "../assets/imgs/Exhibition_1.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

export default function PlanPage() {
	useScrollReveal();

	return (
		<section className="space-y-[10vh]">
			<main className="space-y-[10vh] lg:space-y-[20vh] mt-[15vh] lg:mt-[24vh]">
				{/* <div className="w-full  mx-auto px-[40px] lg:max-w-7xl">
					<Breadcrumbs word="Project" />
				</div> */}

				<div className="lg:pb-[10vh] bg-white">
					<Title
						className="headline"
						titleEN="Name Origin"
						title="計劃的由來"
					/>
					<div className="headline mx-auto w-[82.2vw] mt-[var(--title-gap-text)] lg:w-[900px]">
						<p className="headline bodyText lg:bodyText-web">
							「設醮」一詞，融合了
							<strong>設計（Design）與儀式（Ritual）</strong>的雙重意涵。
							<br />
							<br />
							「設」代表設計的行為——涵蓋觀察、詮釋、介入與提案，是一種對當代議題的回應手段與創造工具。
							「醮」源自東亞文化中的宗教儀式，為傳統社會中人與天地、社群與信仰之間的重要媒介，承載著祈福、記憶、轉化與集體行動的意義。
							<br />
							<br />
							我們選擇「設醮」作為命名，意圖將設計視為一種當代儀式的再詮釋。
							<br />
							<br />
							在快速變動與高度資訊化的社會中，「設計」不僅是視覺或產品的產出，更可視為一種具有召喚力的場域建構——如同「醮」的形式，設計同樣可以喚起群體關注、集結能量、傳遞願景。本計畫透過空間設計、展演行動與群體參與，嘗試在當代脈絡下召開一場「設醮」，
							不為神明設壇，而為人群設場；
							不為超自然祈求，而為當代生活、地方連結與文化共感開啟對話。
							<br />
							<br />
							「設醮」，是一場對現實的溫柔干預，一種將創作與共感轉化為行動的當代表述方式。
						</p>
					</div>
				</div>

				<div
					className="w-full py-[140px] space-y-[100px] lg:py-[280px] lg:space-y-[200px]"
					style={{ backgroundImage: `url(${Bg_gray})` }}
				>
					<ExhibitionCard
						link="/Plan/ExhibitionList"
						imageOnRight={true}
						eyebrow="Main Exhibition"
						title="展覽"
						subtitle="主題策展"
						description={
							<>
								「遠方還未說的話」——青年設計師與創作者的年度主題展。
								<br />
								涵蓋平面、空間、影像與裝置，讓未曾說出口的經驗化為作品。
							</>
						}
						imageSrc={Exhibition_1}
					/>
					<ExhibitionCard
						link="/Plan/Workshop"
						eyebrow="Workshop"
						title="工作坊"
						subtitle="動手體驗"
						description={
							<>
								來自不同文化的職人，帶著木作、織品、陶藝與書寫走進現場。
								<br />
								親手做一件作品，也為自己設下一場微型儀式。
							</>
						}
						imageSrc={Exhibition_1}
					/>
					<ExhibitionCard
						link="/Plan/Market"
						imageOnRight={true}
						eyebrow="Market"
						title="市集"
						subtitle="創意市集"
						description={
							<>
								延伸展覽精神的創意市集，集結手作品牌、獨立出版與插畫小物。
								<br />
								逛市集不只是購物，而是與物件、與人、與自己的一場對話。
							</>
						}
						imageSrc={Exhibition_1}
					/>
					<ExhibitionCard
						link="/Plan/Lecture"
						eyebrow="Talks & Sharing"
						title="講座"
						subtitle="講者分享"
						description={
							<>
								邀請走過這條路的前輩，談創作背後那段無聲的過程。
								<br />
								那些掙扎、遲疑與轉彎，說給還在路上的你聽。
							</>
						}
						imageSrc={Exhibition_1}
					/>
					{/* <ExhibitionCard
						link="/Plan/Other"
						imageOnRight={true}
						eyebrow="Outdoor Cinema"
						title="戶外電影"
						subtitle="星空放映"
						description={
							<>
								一塊幕布、一片星空，戶外電影帶你走進被影像喚醒的記憶。
								<br />
								精選與展覽主題呼應的作品——關於遠方、離開與回來。
							</>
						}
						imageSrc={Exhibition_1}
					/> */}
					<div className="max-w-[82.2vw] mx-auto">
						<hr className="border-t border-primary my-8 mb-[70px]" />
						<p className="bodyText lg:bodyText-web text-center">
							跨域共創｜集結設計、藝術、手作、聲音與影像等創作形式，拓展展覽的邊界。
							參與式設計｜讓觀眾不只是觀看，而是成為活動的一部分。
							在地連結｜與地方文化、場域歷史對話，將創意落在生活現場。
							青年平台｜支持新生代設計師、創作者、職人，展現多元聲音與觀點。
							創意儀式感｜讓設計不只是作品，而是一種當代的集體行動與微型儀式。
						</p>
					</div>
				</div>
			</main>
		</section>
	);
}
